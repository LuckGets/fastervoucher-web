import { useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface VoucherProps {
  id: string;
  details?: string;
  termAndCondition?: string;
}

interface VoucherTermProps {
  voucher: VoucherProps;
}

const VoucherTerm = ({ voucher }: VoucherTermProps) => {
  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'list',
    'bullet',
    'indent',
  ];

  const modules = useMemo(() => ({ toolbar: false }), []);

  if (!voucher) {
    return <div>Voucher not found</div>;
  }

  return (
    <div className="max-h-screen">
      <div className="mt-2">
        <h1 className="text-sm font-semibold">รายละเอียด</h1>
        <ReactQuill
          value={voucher.details || '<p>No information</p>'}
          readOnly={true}
          modules={modules}
          className="border-0 text-xs md:text-sm"
        />
      </div>
      <div>
        <h1 className="text-sm font-semibold">เงื่อนไขและข้อกำหนด</h1>
        <div className="mt-2">
          <ReactQuill
            value={voucher.termAndCondition || '<p>No information</p>'}
            readOnly={true}
            modules={modules}
            formats={formats}
            className="border-0 text-xs md:text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default VoucherTerm;
