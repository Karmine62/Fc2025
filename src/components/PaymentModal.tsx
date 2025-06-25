import { useState } from "react";
import { CreditCard, Lock, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  planPrice: string;
  onConfirmPayment: () => void;
}

const PaymentModal = ({ 
  isOpen, 
  onClose, 
  planName, 
  planPrice, 
  onConfirmPayment 
}: PaymentModalProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirmPayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsConfirmed(true);
      setTimeout(() => {
        onConfirmPayment();
        onClose();
        setIsConfirmed(false);
      }, 2000);
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-0 overflow-hidden max-w-md">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-2xl font-bold text-white text-center">
            Confirm Payment
          </DialogTitle>
          <DialogDescription className="text-white/80 text-center">
            Complete your upgrade to {planName}
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 pb-6">
          {/* Plan Summary */}
          <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-white font-semibold">{planName}</h3>
              </div>
              <div className="text-right">
                <p className="text-white font-bold text-xl">${planPrice}</p>
                <p className="text-white/70 text-sm">one time fee</p>
              </div>
            </div>
          </Card>

          {/* Payment Method */}
          <div className="mb-6">
            <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Payment Method
            </h4>
            <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">VISA</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">•••• •••• •••• 4242</p>
                    <p className="text-white/70 text-sm">Expires 12/25</p>
                  </div>
                </div>
                <Lock className="w-4 h-4 text-white/60" />
              </div>
            </Card>
          </div>

          {/* Security Notice */}
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 mb-6">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-green-400 text-sm font-medium">Secure Payment</p>
                <p className="text-white/70 text-xs">
                  Your payment is encrypted and secure. We use industry-standard SSL encryption.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isProcessing}
              className="flex-1 bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmPayment}
              disabled={isProcessing}
              className="flex-1 bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 hover:opacity-90 text-white font-medium"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </div>
              ) : isConfirmed ? (
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Confirmed!
                </div>
              ) : (
                `Pay $${planPrice}`
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal; 