import { CreateVoucherData } from '@/stores/voucher-store';
import Input from './Input';

interface VoucherNameProps {
  name: CreateVoucherData['title'];
  onChange: (value: string) => void;
}

const VoucherName: React.FC<VoucherNameProps> = ({ name, onChange }) => {
  // const [hasPasscode, setHasPasscode] = useState(!!passcode);

  return (
    <div className="flex w-[90%] flex-col gap-6 rounded-2xl border border-[#888888] p-6 px-8">
      <Input
        inputInfo={{
          info: name,
          label: 'Voucher Name',
        }}
        onSave={(value) => onChange(value)}
      />

      {/* <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={hasPasscode}
          onChange={(e) => {
            setHasPasscode(e.target.checked);
            if (!e.target.checked) {
              onChange('passcode', '');
            }
          }}
          className="flex h-5 w-5 appearance-none items-center justify-center rounded-md border-2 border-gray-400 text-center before:text-sm before:text-white before:opacity-0 before:content-['✔'] checked:border-[#006838] checked:bg-[#006838] checked:before:opacity-100"
        />

        <label className="text-sm">Enable Voucher Passcode</label>
      </div>

      {hasPasscode && (
        <Input
          inputInfo={{
            info: passcode || '',
            label: 'Voucher Passcode',
          }}
          onSave={(value) => onChange('passcode', value)}
        />
      )} */}
    </div>
  );
};

export default VoucherName;
