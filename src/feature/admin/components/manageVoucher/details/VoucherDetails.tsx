import useVoucherStore from '@/stores/voucher-store';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const VoucherDetails = () => {
  const { id } = useParams<{ id: string }>();
  const voucherId = parseInt(id || '0');
  const { vouchers, updateVoucher } = useVoucherStore();
  const voucher = vouchers.find((v) => v.id === voucherId);

  const [detailsTh, setDetailsTh] = useState(voucher?.detailsTh || '');
  const [detailsEng, setDetailsEng] = useState(voucher?.detailsEng || '');

  if (!voucher) {
    return <p>Voucher not found!</p>;
  }

  const handleSave = () => {
    updateVoucher(voucherId, { detailsTh, detailsEng });
  };

  const handleClear = () => {
    setDetailsTh('');
    setDetailsEng('');
  };

  return (
    <div className="flex w-[90%] flex-col gap-6 rounded-2xl border border-[#888888] p-6 px-8">
      <h1>Voucher details</h1>

      <div>
        <h2 className="mb-2 font-medium">รายละเอียด (ภาษาไทย)</h2>
        <textarea
          className="w-full rounded-xl border bg-[#E1E1E1] p-2"
          rows={4}
          value={detailsTh}
          onChange={(e) => setDetailsTh(e.target.value)}
        />
      </div>

      <div>
        <h2 className="mb-2 font-medium">Details (English)</h2>
        <textarea
          className="w-full rounded-xl border bg-[#E1E1E1] p-2"
          rows={4}
          value={detailsEng}
          onChange={(e) => setDetailsEng(e.target.value)}
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          className="rounded-xl bg-[#2BB673] px-4 py-2 text-white hover:bg-[#26a065]"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="rounded-xl px-4 py-2 text-[#888888] hover:bg-[#E1E1E1]"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default VoucherDetails;
