import { useState } from 'react';

const Verify = () => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));

  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value.replace(/[^0-9]/g, '');
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && element.nextElementSibling) {
      (element.nextElementSibling as HTMLInputElement).focus();
    }
  };

  const handleBackspace = (element: HTMLInputElement, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = '';
    setOtp(newOtp);

    if (!element.value && element.previousElementSibling) {
      (element.previousElementSibling as HTMLInputElement).focus();
    }
  };

  const handleSubmit = () => {
    const otpValue = otp.join('');
    console.log('OTP Submitted:', otpValue);
  };
  return (
    <>
      <div className="mb-6 flex gap-4">
        {otp.map((value, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={value}
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => {
              if (e.key === 'Backspace') {
                handleBackspace(e.target as HTMLInputElement, index);
              }
            }}
            className="h-10 w-10 rounded-md border text-center text-xl font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary md:h-14 md:w-14"
          />
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="rounded-full bg-primary px-6 py-2 text-lg text-white hover:bg-opacity-90 focus:outline-none"
      >
        Confirm
      </button>
    </>
  );
};

export default Verify;
