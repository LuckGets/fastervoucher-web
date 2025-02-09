import useCartStore from '@/stores/cart-store';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';

interface OmiseToken {
  id: string;
  livemode: boolean;
  location: string;
  used: boolean;
  charge: {
    qr_code_url: string;
  };
}

interface OmiseCardConfig {
  frameDescription: string;
  amount: number;
  currency: string;
  defaultPaymentMethod: string;
  onCreateTokenSuccess: (token: OmiseToken) => void;
  onFormClosed: () => void;
}

interface OmiseCardInstance {
  configure: (config: {
    publicKey: string;
    currency: string;
    frameLabel: string;
    submitLabel: string;
    buttonLabel: string;
  }) => void;
  open: (config: OmiseCardConfig) => void;
}

let OmiseCard: OmiseCardInstance | null = null;

const Promtpay = () => {
  const { total } = useCartStore();
  const [qrImageUrl, setQrImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  useEffect(() => {
    const loadOmiseScript = () => {
      const script = document.createElement('script');
      script.src = 'https://cdn.omise.co/omise.js';
      script.async = true;
      script.onload = handleLoadScript;
      script.onerror = () => console.error('Failed to load Omise script');
      document.body.appendChild(script);
    };

    const handleLoadScript = () => {
      OmiseCard = (window as typeof window & { OmiseCard: OmiseCardInstance })
        .OmiseCard;
      OmiseCard?.configure({
        publicKey: import.meta.env.VITE_OMISE_PUBLIC_KEY,
        currency: 'THB',
        frameLabel: 'The emerald hotel',
        submitLabel: 'Pay Now',
        buttonLabel: 'Pay with Omise',
      });
    };

    loadOmiseScript();
  }, []);

  const handleGenerateQrCode = useCallback(() => {
    if (!OmiseCard) {
      console.error('OmiseCard is not loaded yet!');
      return;
    }

    setLoading(true);

    OmiseCard.open({
      frameDescription: 'QR Payment',
      amount: total * 100, // Omise (THB -> สตางค์)
      currency: 'THB',
      defaultPaymentMethod: 'promptpay',
      onCreateTokenSuccess: (token: OmiseToken) => {
        console.log('Token created successfully:', token);
        const qrUrl = token.charge.qr_code_url;
        setQrImageUrl(qrUrl);
        setLoading(false);
      },
      onFormClosed: () => {
        setLoading(false);
      },
    });
  }, [total]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    if (showDropdown && !qrImageUrl) {
      handleGenerateQrCode();
    }
  }, [showDropdown, qrImageUrl, handleGenerateQrCode]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="flex w-[23rem] cursor-pointer items-center justify-between px-10"
        onClick={toggleDropdown}
      >
        <div className="flex items-center gap-1">
          {showDropdown ? <ChevronDown /> : <ChevronRight />}
          <span>QR Code</span>
        </div>
        <div className="flex gap-2">
          <div className="h-7 w-7">
            <img src="https://i.imgur.com/MUznd9Y.png" alt="" />
          </div>
          <div className="h-8 w-8">
            <img src="https://i.imgur.com/i5ciiov.png" alt="" />
          </div>
        </div>
      </div>

      {showDropdown && (
        <div className="mt-4">
          {loading && <p>Loading QR Code...</p>}

          {qrImageUrl && (
            <div className="mt-6 flex flex-col items-center">
              <h1>Please scan QR code</h1>
              <h1> within 10 minutes</h1>
              <img
                src={qrImageUrl}
                alt="PromptPay QR Code"
                className="h-64 w-64"
              />
              <p className="mt-4 text-gray-700">
                Scan this QR Code to pay {total.toFixed(2)} THB
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Promtpay;
