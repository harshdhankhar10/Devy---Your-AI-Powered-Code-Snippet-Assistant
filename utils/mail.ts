import nodemailer from 'nodemailer';

export const sendMail = async (mailOptions: any) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.zoho.in',
            port: 587,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const finalMailOptions = {
            from: process.env.EMAIL_USER,
            to: mailOptions.to,
            subject: mailOptions.subject,
            html: mailOptions.htmlContent,
        };

        let info = await transporter.sendMail(finalMailOptions);
        return info;
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
    }
};