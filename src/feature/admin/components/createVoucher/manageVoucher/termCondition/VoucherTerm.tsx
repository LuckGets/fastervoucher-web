import { CreateVoucherDataSchema } from '@/data-schema/voucher.type';
import { useCallback, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface VoucherTermProps {
  conditions: string | undefined;
  onChange: (value: CreateVoucherDataSchema['termAndCond']) => void;
}

const VoucherTerm: React.FC<VoucherTermProps> = ({ conditions, onChange }) => {
  const [isTyping, setIsTyping] = useState(false);
  const [value, setValue] = useState(conditions || '');

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
      <h1>Voucher terms and conditions</h1>
      <div>
        <ReactQuill
          value={value}
          onChange={handleChange}
          className="rounded-xl bg-[#E1E1E1]"
        />
      </div>
    </div>
  );
};

export default VoucherTerm;
