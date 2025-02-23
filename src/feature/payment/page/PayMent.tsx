import PayCard from '../components/PayCard';
import Promtpay from '../components/Promtpay';

const Payment = () => {
  return (
    <div className="flex w-screen flex-col items-center px-4">
      <h1 className="text-xl">Payment</h1>
      <div className="mt-6">
        <Promtpay />
        <hr className="mx-8 mt-4 border border-dashed border-[#D9D9D9]" />
        <PayCard />
        <hr className="mx-8 mt-4 border border-dashed border-[#D9D9D9]" />
      </div>
    </div>
  );
};

export default Payment;
