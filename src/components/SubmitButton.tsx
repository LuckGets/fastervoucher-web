import useSettingStore from '../stores/setting-store';

interface SubmitButtonProps {
  className?: string;
  text: string;
  disabled?: boolean;
}

const SubmitButton = ({ className, text, disabled }: SubmitButtonProps) => {
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
      } capitalize`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default SubmitButton;
