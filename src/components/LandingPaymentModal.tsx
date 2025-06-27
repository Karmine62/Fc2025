import { useState } from "react";
import { CreditCard, Lock, Check, Mail, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LandingPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  planPrice: string;
  onConfirmPayment: (email: string) => void;
}

const LandingPaymentModal = ({ 
  isOpen, 
  onClose, 
  planName, 
  planPrice, 
  onConfirmPayment 
}: LandingPaymentModalProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');

  const handleConfirmPayment = async () => {
    if (!email || !cardNumber || !expiryDate || !cvv || !cardholderName) {
      return; // Add validation here
    }
    
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsConfirmed(true);
      setTimeout(() => {
        onConfirmPayment(email);
        onClose();
        setIsConfirmed(false);
        // Reset form
        setEmail('');
        setCardNumber('');
        setExpiryDate('');
        setCvv('');
        setCardholderName('');
      }, 2000);
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-0 overflow-hidden max-w-md">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-2xl font-bold text-white text-center">
            Complete Your Signup
          </DialogTitle>
          <DialogDescription className="text-white/80 text-center">
            Create your account and start your {planName} subscription
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 pb-6">
          {/* Plan Summary */}
          <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-white font-semibold">{planName}</h3>
                <p className="text-white/70 text-sm">Subscription Plan</p>
              </div>
              <div className="text-right">
                <p className="text-white font-bold text-xl">${planPrice}</p>
                <p className="text-white/70 text-sm">monthly fee</p>
              </div>
            </div>
          </Card>

          {/* Email Field */}
          <div className="mb-4">
            <Label htmlFor="email" className="text-white font-semibold mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-white/40"
            />
          </div>

          {/* Cardholder Name */}
          <div className="mb-4">
            <Label htmlFor="cardholder" className="text-white font-semibold mb-2 flex items-center gap-2">
              <User className="w-4 h-4" />
              Cardholder Name
            </Label>
            <Input
              id="cardholder"
              type="text"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              placeholder="Name on card"
              className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-white/40"
            />
          </div>

          {/* Card Number */}
          <div className="mb-4">
            <Label htmlFor="cardNumber" className="text-white font-semibold mb-2 flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Card Number
            </Label>
            <Input
              id="cardNumber"
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-white/40"
            />
          </div>

          {/* Expiry and CVV */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <Label htmlFor="expiry" className="text-white font-semibold mb-2 block">
                Expiry Date
              </Label>
              <Input
                id="expiry"
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                placeholder="MM/YY"
                maxLength={5}
                className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-white/40"
              />
            </div>
            <div>
              <Label htmlFor="cvv" className="text-white font-semibold mb-2 block">
                CVV
              </Label>
              <Input
                id="cvv"
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="123"
                maxLength={4}
                className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-white/40"
              />
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 mb-6">
            <div className="flex items-start gap-2">
              <Lock className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
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
              disabled={isProcessing || !email || !cardNumber || !expiryDate || !cvv || !cardholderName}
              className="flex-1 bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 hover:opacity-90 text-white font-medium disabled:opacity-50"
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
                `Start ${planName}`
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LandingPaymentModal; 