import useCartStore from '../../../stores/cart-store';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

interface OmiseToken {
  id: string;
  livemode: boolean;
  location: string;
  used: boolean;
  card: {
    id: string;
    object: string;
    brand: string;
    last_digits: string;
    name: string;
    expiration_month: number;
    expiration_year: number;
    fingerprint: string;
  };
}

interface OmiseCardInstance {
  configure: (config: Record<string, unknown>) => void;
  open: (config: {
    amount: number;
    currency: string;
    defaultPaymentMethod: string;
    onCreateTokenSuccess: (token: OmiseToken) => void;
    onFormClosed: () => void;
  }) => void;
}

let OmiseCard: OmiseCardInstance | null = null;

const PayCard = () => {
  const { total } = useCartStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  useEffect(() => {
    const loadOmiseScript = () => {
      if (!document.querySelector('#omise-script')) {
        const script = document.createElement('script');
        script.id = 'omise-script';
        script.src = 'https://cdn.omise.co/omise.js';
        script.async = true;
        script.onload = handleLoadScript;
        script.onerror = () => console.error('Failed to load Omise script');
        document.body.appendChild(script);
      } else {
        handleLoadScript();
      }
    };

    const handleLoadScript = () => {
      OmiseCard = (window as unknown as { OmiseCard: OmiseCardInstance })
        .OmiseCard;
      OmiseCard?.configure({
        publicKey: import.meta.env.VITE_OMISE_PUBLIC_KEY,
        currency: 'THB',
        frameLabel: 'The Emerald Hotel',
        submitLabel: 'Pay Now',
        buttonLabel: 'Pay with Omise',
      });
    };

    loadOmiseScript();
  }, []);

  const handleCardPayment = () => {
    if (!OmiseCard) {
      console.error('OmiseCard is not loaded yet!');
      return;
    }

    setLoading(true);

    OmiseCard.open({
      amount: total * 100,
      currency: 'THB',
      defaultPaymentMethod: 'credit_card',
      onCreateTokenSuccess: (token: OmiseToken) => {
        console.log('Token created successfully:', token);
        hdlPayment(token);
      },
      onFormClosed: () => {
        setLoading(false);
      },
    });
  };

  const hdlPayment = async (omiseToken: OmiseToken) => {
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: omiseToken, amount: total * 100 }),
      });

      if (!response.ok) {
        throw new Error('Payment failed');
      }

      Swal.fire({
        title: 'Payment successful',
        html: ` <strong>${total.toFixed(2)} THB</strong>`,
        icon: 'success',
        confirmButtonText: 'Close',
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        Swal.fire({
          title: 'Something went wrong',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'Try again',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
    if (!loading && !showDropdown) {
      handleCardPayment();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="mt-3 flex w-[23rem] cursor-pointer items-center justify-between px-10"
        onClick={toggleDropdown}
      >
        <div className="flex items-center gap-1">
          {showDropdown ? <ChevronDown /> : <ChevronRight />}
          <span>Credit / Debit Card</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="flex h-7 w-7 items-center">
            <img src="https://i.imgur.com/IPE1r2R.png" alt="Credit Card" />
          </div>
          <div className="flex h-8 w-8 items-center">
            <img src="https://i.imgur.com/aFO9USN.png" alt="Debit Card" />
          </div>
        </div>
      </div>
      {showDropdown && (
        <div>
          <form>
            <button
              type="button"
              id="credit-card"
              onClick={handleCardPayment}
              className={`btn w-full cursor-pointer ${
                loading ? 'pointer-events-none opacity-50' : ''
              }`}
            >
              {loading ? 'Processing...' : 'Pay with Credit Card'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PayCard;
