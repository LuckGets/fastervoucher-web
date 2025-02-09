import { VoucherDataSchema } from '@/data-schema/voucher.type';
import { useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface VoucherTermProps {
  details: VoucherDataSchema['description'];
  conditions: VoucherDataSchema['termAndCondition'];
}

const VoucherTerm = ({ details, conditions }: VoucherTermProps) => {
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

  return (
    <div className="max-h-screen">
      <div className="mt-2">
        <h1 className="text-sm font-semibold">รายละเอียด</h1>
        <ReactQuill
          value={details || '<p>No information</p>'}
          readOnly={true}
          modules={modules}
          className="border-0 text-xs md:text-sm"
        />
      </div>
      <div>
        <h1 className="text-sm font-semibold">เงื่อนไขและข้อกำหนด</h1>
        <div className="mt-2">
          <ReactQuill
            value={conditions || '<p>No information</p>'}
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
