import { Condition } from '@/stores/voucher-store';

interface VoucherProps {
  id: number;
  detailsTh?: string;
  detailsEng?: string;
  conditionsTh?: Condition[];
  conditionsEng?: Condition[];
}

interface VoucherTermProps {
  voucher: VoucherProps;
}

const VoucherTerm = ({ voucher }: VoucherTermProps) => {
  return (
    <div className="max-h-screen">
      <div className="mt-2">
        <h1 className="text-sm font-semibold">รายละเอียด</h1>
        <p className="text-xs md:text-sm">
          {voucher.detailsTh || 'No details available'}
        </p>
      </div>
      <div>
        <h1 className="text-sm font-semibold">เงื่อนไขและข้อกำหนด</h1>
        <ul className="list-inside list-disc text-xs md:text-sm">
          {voucher.conditionsTh?.map((condition) => (
            <li key={condition.id}>{condition.condition}</li>
          )) || <li>No terms and conditions available</li>}
        </ul>
        <p className="text-sm">
          {voucher.detailsEng || 'No English details available'}
        </p>
      </div>
      <div>
        <h1 className="text-sm font-semibold">Details</h1>
        <ul className="list-inside list-disc text-xs md:text-sm">
          {voucher.conditionsEng?.map((condition) => (
            <li key={condition.id}>{condition.condition}</li>
          )) || <li>No terms and conditions available</li>}
        </ul>
      </div>
    </div>
  );
};

export default VoucherTerm;
