import {
  Copy,
  Crosshair,
  Info,
  Link,
  Mail,
  Percent,
  UserRound,
  X,
} from 'lucide-react';
import { useState, useMemo } from 'react';

interface AffiliateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    email: string;
    target: string;
    commission: string;
    url: string;
    status: 'Active' | 'Inactive';
  }) => void;
}

const AffiliateModal = ({ isOpen, onClose, onSubmit }: AffiliateModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    target: '',
    commission: '',
    url: '',
    status: 'Active' as 'Active' | 'Inactive',
  });

  const [errors, setErrors] = useState({
    emailFormat: false,
  });

  const [isGenerated, setIsGenerated] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name !== 'email' && value.trim()) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {
      emailFormat: !validateEmail(formData.email),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const isFormValid = useMemo(() => {
    const newErrors = {
      emailFormat: !validateEmail(formData.email),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  }, [formData]);

  const handleSubmit = () => {
    if (!validateForm() || !formData.url.trim()) return;
    onSubmit(formData);
    onClose();
  };

  const handleGenerate = () => {
    const { name, email } = formData;
    const baseURL = 'https://theEmeraldHotel.voucherfaster.com';
    const affiliateParam = `affiliate=${encodeURIComponent(name)}`;
    const idCodeParam = `idCode=${encodeURIComponent(email)}`;
    const fullURL = `${baseURL}/?${affiliateParam}&${idCodeParam}`;
    setFormData((prev) => ({ ...prev, url: fullURL }));
    setIsGenerated(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-[70%] rounded-xl bg-[#F7F3ED] p-6 py-16 shadow-lg">
        <button
          onClick={onClose}
          className="absolute right-2 top-2 text-gray-600 hover:text-black"
        >
          <X />
        </button>
        <h2 className="mb-4 text-center text-2xl font-bold">
          Create Affiliate
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4 flex flex-col gap-2">
            <label className="ml-5 flex items-center gap-2 text-sm font-medium">
              <UserRound /> ชื่อสมาชิก / Pages
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full rounded-full border bg-[#E1E1E1] p-2 pl-5 focus:outline-none focus:ring-2 focus:ring-[#2BB673]`}
            />
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <label className="ml-5 flex items-center gap-2 text-sm font-medium">
              <Mail /> Email
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full rounded-full border bg-[#E1E1E1] p-2 pl-5 focus:outline-none ${
                errors.emailFormat
                  ? 'border-red-500'
                  : 'focus:ring-2 focus:ring-[#2BB673]'
              }`}
            />
            {errors.emailFormat && (
              <span className="ml-5 flex items-center gap-1 text-xs text-red-500">
                <Info className="w-4" />
                Invalid email format
              </span>
            )}
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <label className="ml-5 flex items-center gap-2 text-sm font-medium">
              <Crosshair /> ขั้นต่ำที่ต้องขายได้
            </label>
            <input
              type="number"
              name="target"
              value={formData.target}
              onChange={handleChange}
              className={`w-full rounded-full border bg-[#E1E1E1] p-2 pl-5 focus:outline-none focus:ring-2 focus:ring-[#2BB673]`}
            />
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <label className="ml-5 flex items-center gap-2 text-sm font-medium">
              <Percent /> Commission
            </label>
            <input
              type="number"
              name="commission"
              value={formData.commission}
              onChange={handleChange}
              className={`w-full rounded-full border bg-[#E1E1E1] p-2 pl-5 focus:outline-none focus:ring-2 focus:ring-[#2BB673]`}
            />
          </div>
          <div className="col-span-2 mb-4 flex flex-col gap-2">
            <label className="ml-5 flex items-center gap-2 text-sm font-medium">
              <Link /> URL Link
            </label>
            {isGenerated ? (
              <div className="relative w-full">
                <input
                  type="text"
                  readOnly
                  value={formData.url}
                  className="w-full rounded-full border bg-[#E1E1E1] p-2 focus:outline-none"
                />
                <button
                  onClick={() => navigator.clipboard.writeText(formData.url)}
                  className="absolute right-4 top-2 text-sm"
                >
                  <Copy className="w-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  if (isFormValid) handleGenerate();
                }}
                disabled={!isFormValid}
                className={`w-[50%] rounded-full px-12 py-2 text-white ${isFormValid ? 'bg-[#2BB673] hover:bg-[#239961]' : 'cursor-not-allowed bg-[#E1E1E1] text-[#989898]'}`}
              >
                Generate
              </button>
            )}
          </div>
        </div>
        <div className="flex justify-center gap-2">
          <button
            onClick={handleSubmit}
            disabled={!formData.url.trim()}
            className={`rounded-full px-12 py-2 text-white ${
              formData.url.trim()
                ? 'bg-[#2BB673] hover:bg-[#239961]'
                : 'cursor-not-allowed bg-[#E1E1E1] text-[#989898]'
            }`}
          >
            Create Affiliate
          </button>
        </div>
      </div>
    </div>
  );
};

export default AffiliateModal;
