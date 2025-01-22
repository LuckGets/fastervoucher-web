/* eslint-disable react/prop-types */
import { Condition } from '@/stores/voucher-store';
import TermEng from './TermEng';
import TermTh from './TermTh';

interface VoucherTermProps {
  conditionsTh: Condition[] | undefined;
  conditionsEng: Condition[] | undefined;
  onChange: (
    field: 'conditionsTh' | 'conditionsEng',
    value: Condition[],
  ) => void;
}

const VoucherTerm: React.FC<VoucherTermProps> = ({
  conditionsTh,
  conditionsEng,
  onChange,
}) => {
  const handleChange =
    (field: 'conditionsTh' | 'conditionsEng') => (value: Condition[]) => {
      onChange(field, value);
    };
  return (
    <div className="flex flex-col gap-4">
      <TermTh
        conditionsTh={conditionsTh}
        onChange={handleChange('conditionsTh')}
      />
      <TermEng
        conditionsEng={conditionsEng}
        onChange={handleChange('conditionsEng')}
      />
    </div>
  );
};

export default VoucherTerm;
