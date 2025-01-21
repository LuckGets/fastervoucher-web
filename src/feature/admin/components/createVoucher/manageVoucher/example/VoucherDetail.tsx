/* eslint-disable react/prop-types */
import { Voucher } from '@/stores/voucher-store';

interface VoucherDetailProps {
  voucher: Voucher | undefined;
}

const VoucherDetail: React.FC<VoucherDetailProps> = ({ voucher }) => {
  if (!voucher) {
    return <div>Voucher not found</div>;
  }

  return (
    <div className="max-h-screen">
      <div className="mt-2">
        <h1 className="text-sm font-semibold">รายละเอียด</h1>
        <p className="text-xs md:text-sm">
          {voucher.detailsTh || 'ยังไม่มีข้อมูล'}
        </p>
      </div>
      <div>
        <h1 className="text-sm font-semibold">เงื่อนไขและข้อกำหนด</h1>
        <ul className="list-inside list-disc text-xs md:text-sm">
          {voucher.conditionsTh && voucher.conditionsTh.length > 0 ? (
            voucher.conditionsTh.map((condition, index) => (
              <li key={index}>{condition.condition}</li>
            ))
          ) : (
            <li>ยังไม่มีข้อมูล</li>
          )}
        </ul>
      </div>
      <div>
        <h1 className="text-sm font-semibold">Details</h1>
        <p className="text-sm">{voucher.detailsEng || 'No Information'}</p>
        <div>
          <h1 className="text-sm font-semibold">Terms and conditions</h1>
          <ul className="list-inside list-disc text-xs md:text-sm">
            {voucher.conditionsEng && voucher.conditionsEng.length > 0 ? (
              voucher.conditionsEng.map((condition, index) => (
                <li key={index}>{condition.condition}</li>
              ))
            ) : (
              <li>No Information</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VoucherDetail;
