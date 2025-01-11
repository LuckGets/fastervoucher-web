import { useParams } from 'react-router-dom';
import useVoucherStore from '@/stores/voucher-store';

const VoucherDetail = () => {
  const { id } = useParams<{ id: string }>();
  console.log('Voucher ID from URL:', id);

  const vouchers = useVoucherStore((state) => state.vouchers);
  console.log('All vouchers from store:', vouchers);

  const voucher = vouchers.find((v) => v.id === Number(id));
  console.log('Matched voucher:', voucher);

  if (!voucher) {
    console.error(`Voucher with id ${id} not found`);
    return <div>Voucher not found</div>;
  }

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
      </div>
      <div>
        <h1 className="text-sm font-semibold">Details</h1>
        <p className="text-sm">
          {voucher.detailsEng || 'No English details available'}
        </p>
        <div>
          <h1 className="text-sm font-semibold">Terms and conditions</h1>
          <ul className="list-inside list-disc text-xs md:text-sm">
            {voucher.conditionsEng?.map((condition) => (
              <li key={condition.id}>{condition.condition}</li>
            )) || <li>No terms and conditions available</li>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VoucherDetail;
