"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Zap,
    Star,
    Crown,
    Check,
    ArrowRight,
    Mail,
    Shield,
    Clock,
    Headphones
} from 'lucide-react';

const BuyCredits = () => {
    const creditPacks = [
        {
            id: 'starter',
            name: 'Starter Pack',
            credits: 50,
            bonusCredits: 0,
            price: 249,
            costPerAction: 4.98,
            ideal: 'Students or developers who need occasional AI assistance',
            icon: Zap,
            popular: false,
            bestValue: false,
            features: [
                'Perfect for learning and experimentation',
                'Access to all AI tools',
                'Valid for 6 months',
                'Email support'
            ]
        },
        {
            id: 'developer',
            name: 'Developer Pack',
            credits: 100,
            bonusCredits: 20,
            price: 499,
            costPerAction: 4.16,
            ideal: 'Freelancers and regular developers who use AI tools consistently',
            icon: Star,
            popular: true,
            bestValue: false,
            features: [
                'Includes 20 bonus credits',
                'Priority AI processing',
                'Valid for 12 months',
                'Priority email support',
                'Advanced AI features'
            ]
        },
        {
            id: 'power',
            name: 'Power Pack',
            credits: 250,
            bonusCredits: 50,
            price: 999,
            costPerAction: 3.33,
            ideal: 'Power users, small teams, or developers working on large projects',
            icon: Crown,
            popular: false,
            bestValue: true,
            features: [
                'Includes 50 bonus credits',
                'Fastest AI processing',
                'Valid for 18 months',
                'Priority phone & email support',
                'Early access to new features',
                // 'Team collaboration tools'
            ]
        }
    ];

    const handlePurchase = (packId: string) => {

    };

    return (
        <>
            <div className="space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold text-slate-900">Buy Credits</h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Choose the perfect credit pack for your needs. Get more done with our AI-powered tools
                        and unlock your coding potential.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
                    {creditPacks.map((pack) => {
                        const Icon = pack.icon;
                        return (
                            <Card key={pack.id} className={`relative ${pack.popular ? 'ring-2 ring-blue-500 shadow-lg' : ''} ${pack.bestValue ? 'ring-2 ring-green-500 shadow-lg' : ''}`}>
                                {pack.popular && (
                                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white">
                                        ⭐ Most Popular
                                    </Badge>
                                )}
                                {pack.bestValue && (
                                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white">
                                        💎 Best Value
                                    </Badge>
                                )}

                                <CardHeader className="text-center">
                                    <div className="mx-auto w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                                        <Icon className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <CardTitle className="text-xl font-semibold">{pack.name}</CardTitle>
                                    <CardDescription className="text-sm">{pack.ideal}</CardDescription>
                                </CardHeader>

                                <CardContent className="space-y-6">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-slate-900">₹{pack.price}</div>
                                        <div className="font-medium text-[#6C63FF] mt-1">
                                            {pack.credits + pack.bonusCredits} Credits Total
                                        </div>
                                        {pack.bonusCredits > 0 && (
                                            <div className="text-xs text-green-600 font-medium">
                                                Includes {pack.bonusCredits} bonus credits!
                                            </div>
                                        )}
                                        <div className="text-xs text-slate-500 mt-2">
                                            ~₹{pack.costPerAction} per action
                                        </div>
                                        {pack.costPerAction < 4.5 && (
                                            <div className="text-xs text-green-600 font-medium">
                                                {Math.round(((4.98 - pack.costPerAction) / 4.98) * 100)}% cheaper than Starter Pack
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        {pack.features.map((feature, index) => (
                                            <div key={index} className="flex items-center text-sm">
                                                <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                                <span className="text-slate-700">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <Button
                                        className="w-full"
                                        variant={pack.popular || pack.bestValue ? "default" : "outline"}
                                        onClick={() => handlePurchase(pack.id)}
                                    >
                                        Buy {pack.name}
                                        <ArrowRight className="h-4 w-4 ml-2" />
                                    </Button>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>



            </div>
        </>
    );
};

export default BuyCredits;
