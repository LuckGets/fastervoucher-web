import TermEng from './TermEng';
import TermTh from './TermTh';

const VoucherTerm = () => {
  return (
    <div className="flex flex-col gap-4">
      <TermTh />
      <TermEng />
    </div>
  );
};

export default VoucherTerm;
