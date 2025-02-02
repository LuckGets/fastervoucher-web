/* eslint-disable react/prop-types */
import { useState, useCallback, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface VoucherDetailsProps {
  details: string | undefined;
  onChange: (value: string) => void;
}

const VoucherDetails: React.FC<VoucherDetailsProps> = ({
  details,
  onChange,
}) => {
  const [isTyping, setIsTyping] = useState(false);
  const [value, setValue] = useState(details || '');

  const handleChange = useCallback((newValue: string) => {
    setValue(newValue);
    setIsTyping(true);
  }, []);

  useEffect(() => {
    if (!isTyping) return;

    const timeoutId = requestAnimationFrame(() => {
      onChange(value);
      setIsTyping(false);
    });

    return () => {
      cancelAnimationFrame(timeoutId);
    };
  }, [value, isTyping, onChange]);

  return (
    <div className="flex w-[90%] flex-col gap-6 rounded-2xl border border-[#888888] p-6 px-8">
      <h1>Voucher details</h1>
      <div>
        <ReactQuill
          value={value}
          onChange={handleChange}
          className="rounded-xl bg-[#E1E1E1]"
          theme="snow"
        />
      </div>
    </div>
  );
};

export default VoucherDetails;
