import { CreateVoucherData } from '@/stores/voucher-store';

interface VoucherDetailProps {
  voucher: CreateVoucherData;
}

const VoucherDetail: React.FC<VoucherDetailProps> = ({ voucher }) => {
  if (!voucher) {
    return <div>Voucher not found</div>;
  }

  return (
    <div className="max-h-screen">
      <div className="mt-2">
        <h1 className="text-sm font-semibold">รายละเอียด</h1>
        <div
          className="border-0 text-xs md:text-sm"
          dangerouslySetInnerHTML={{
            __html: voucher.description || '<p>No information</p>',
          }}
        />
      </div>
      <div>
        <h1 className="text-sm font-semibold">เงื่อนไขและข้อกำหนด</h1>
        <div
          className="mt-2 border-0 text-xs md:text-sm"
          dangerouslySetInnerHTML={{
            __html: voucher.termAndCondition || '<p>No information</p>',
          }}
        />
      </div>
    </div>
  );
};

export default VoucherDetail;
