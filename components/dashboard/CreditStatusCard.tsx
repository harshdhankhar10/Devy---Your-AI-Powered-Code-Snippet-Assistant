import { CreditCard, AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const CreditStatusCard = () => {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="relative bg-white rounded-xl border border-gray-200 p-6 shadow-lg max-w-xs w-full">
                <div className="text-center">
                    <AlertCircle className="h-12 w-12 text-[#6C63FF] mx-auto mb-3" />

                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        No Credits Left
                    </h4>

                    <p className="text-gray-600 text-sm mb-4 max-w-xs mx-auto">
                        You've used all your available credits. Purchase more to continue using{" "}
                        <span className="text-[#6C63FF] font-semibold">Devy</span> Platform.
                    </p>
                    <Link href="/dashboard/buy-credits">
                        <Button>
                            <CreditCard className="h-4 w-4 mr-2" />
                            Buy Credits
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CreditStatusCard;
