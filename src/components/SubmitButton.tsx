interface SubmitButtonProps {
  className?: string;
  text: string;
}

const SubmitButton = ({ className, text }: SubmitButtonProps) => {
  return (
    <button type="submit" className={`${className} capitalize`}>
      {text}
    </button>
  );
};

export default SubmitButton;
