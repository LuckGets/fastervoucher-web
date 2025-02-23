import useSettingStore from '../stores/setting-store';
import { Loader2 } from 'lucide-react';

interface SubmitButtonProps {
  className?: string;
  text: string;
  disabled?: boolean;
  isLoading?: boolean;
}

const SubmitButton = ({
  className,
  text,
  disabled,
  isLoading,
}: SubmitButtonProps) => {
  const { color } = useSettingStore();

  const bgColor = disabled
    ? { backgroundColor: '#D9D9D9' }
    : color
      ? { backgroundColor: color }
      : { backgroundColor: '#D1D5DB' };

  return (
    <button
      type="submit"
      style={bgColor}
      className={`${className} ${
        disabled ? 'cursor-not-allowed text-text' : ''
      } flex items-center justify-center gap-2 capitalize`}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default SubmitButton;
