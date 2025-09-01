import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendMail } from "@/utils/mail";

export async function POST(req: NextRequest) {
    try {
        const authHeader = req.headers.get('authorization');
        if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const oneMonthAgo = new Date();
        // fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);

        const inactiveUsers = await prisma.user.findMany({
            where: {
                lastLogin: {
                    lt: oneMonthAgo
                },
            },
            select: {
                id: true,
                email: true,
                name: true,
                lastLogin: true
            }
        });

        const results = await Promise.allSettled(
            inactiveUsers.map(async (user) => {
                const mailOptions = {
                    to: user.email,
                    subject: `We Miss You at ${process.env.APP_NAME || 'Devy'}`,
                    htmlContent: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>We Miss You</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f9fafb;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
        }
        .header {
            background: linear-gradient(135deg, #6C63FF 0%, #8A63FF 100%);
            padding: 40px 20px;
            text-align: center;
            border-radius: 0 0 20px 20px;
        }
        .logo {
            color: white;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .content {
            padding: 40px 30px;
        }
        .footer {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #6b7280;
            border-top: 1px solid #e5e7eb;
        }
        .button {
            display: inline-block;
            padding: 12px 30px;
            background: linear-gradient(135deg, #6C63FF 0%, #8A63FF 100%);
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            margin: 20px 0;
        }
        .warning {
            background-color: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 8px;
            padding: 16px;
            margin: 20px 0;
            color: #92400e;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">${process.env.APP_NAME || 'Devy'}</div>
            <h1 style="color: white; margin: 0; font-size: 28px;">We Miss You!</h1>
        </div>
        
        <div class="content">
            <h2>Hello ${user.name || 'there'},</h2>
            
            <p>We noticed you haven't logged into your ${process.env.APP_NAME || 'Devy'} account for a while. Your last login was on <strong>${user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'an unknown date'}</strong>.</p>
            
            <p>You're missing out on:</p>
            <ul>
                <li>✨ AI-powered code refactoring and optimization</li>
                <li>🚀 Instant code generation and translation</li>
                <li>🔐 Secure snippet management and sharing</li>
                <li>👥 Team collaboration features</li>
            </ul>
            
            <div class="warning">
                <strong>Important:</strong> To keep your account active, please log in within the next 45 days. 
                Accounts inactive for 60 days will be permanently deleted along with all associated data.
            </div>
            
            <div style="text-align: center;">
                <a href="${process.env.APP_URL}/login" class="button">Sign In Now</a>
            </div>
            
            <p>If you have any questions or need assistance, our support team is here to help.</p>
            
            <p>Best regards,<br>The ${process.env.APP_NAME || 'Devy'} Team</p>
        </div>
        
        <div class="footer">
            <p>© ${new Date().getFullYear()} ${process.env.APP_NAME || 'Devy'}. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
                    `
                };

                await sendMail(mailOptions);


                return { userId: user.id, email: user.email, status: 'success' };
            })
        );

        const successful = results.filter(result => result.status === 'fulfilled').length;
        const failed = results.filter(result => result.status === 'rejected').length;

        return NextResponse.json({
            message: `Sent ${successful} reminder emails successfully, ${failed} failed`,
            totalUsers: inactiveUsers.length,
            successful,
            failed,
            details: results
        });

    } catch (error) {
        console.error('Cron job error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}