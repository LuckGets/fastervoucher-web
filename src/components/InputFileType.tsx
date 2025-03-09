import React from 'react';

interface FileInputProps {
  onChange: (file: File) => void;
  value?: string;
  className?: string;
}

const InputFileType: React.FC<FileInputProps> = ({
  onChange,
  className = '',
  value,
}) => {
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];

    if (!file || !(file instanceof File)) return;

    onChange(file);
    return;
  };

  const inputVal = value ?? '';

  return (
    <input
      className={className}
      value={inputVal}
      type="file"
      onChange={onChangeInput}
    />
  );
};

export default InputFileType;
