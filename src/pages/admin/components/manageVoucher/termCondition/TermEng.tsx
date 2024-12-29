import useVoucherStore, { Condition } from '@/stores/voucher-store';
import { PencilLine, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const TermEng = () => {
  const { id } = useParams<{ id: string }>();
  const voucherId = parseInt(id || '0');
  const { vouchers, updateVoucher } = useVoucherStore();
  const voucher = vouchers.find((v) => v.id === voucherId);

  const [newCondition, setNewCondition] = useState('');
  const [showAddInput, setShowAddInput] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');

  if (!voucher) {
    return <p>Voucher not found!</p>;
  }

  const handleAddCondition = () => {
    if (newCondition.trim() === '') return;
    const updatedConditions: Condition[] = [
      ...(voucher.conditionsEng || []),
      { id: Date.now(), condition: newCondition },
    ];
    updateVoucher(voucherId, { conditionsEng: updatedConditions });
    setNewCondition('');
    setShowAddInput(false);
  };

  const handleCancelAddCondition = () => {
    setNewCondition('');
    setShowAddInput(false);
  };

  const handleEditCondition = (id: number) => {
    const updatedConditions = (voucher.conditionsEng || []).map((cond) =>
      cond.id === id ? { ...cond, condition: editingText } : cond,
    );
    updateVoucher(voucherId, { conditionsEng: updatedConditions });
    setEditingId(null);
    setEditingText('');
  };

  const handleDeleteCondition = (id: number) => {
    const updatedConditions = (voucher.conditionsEng || []).filter(
      (cond) => cond.id !== id,
    );
    updateVoucher(voucherId, { conditionsEng: updatedConditions });
  };

  const handleStartEditing = (id: number, conditionText: string) => {
    setEditingId(id);
    setEditingText(conditionText);
  };

  return (
    <div className="flex w-[90%] flex-col gap-6 rounded-2xl border border-[#888888] p-6 px-8">
      <h1>Terms and conditions (English)</h1>

      {voucher.conditionsEng && voucher.conditionsEng.length > 0 && (
        <ul className="flex list-inside list-disc flex-col gap-4 rounded-xl bg-[#E1E1E1] p-5">
          {voucher.conditionsEng.map((condition) => (
            <li key={condition.id} className="flex items-center gap-2">
              {editingId === condition.id ? (
                <textarea
                  className="flex-grow resize-none rounded-xl border bg-[#E1E1E1] p-2"
                  value={editingText}
                  rows={6}
                  onChange={(e) => setEditingText(e.target.value)}
                />
              ) : (
                <span className="flex-grow">{condition.condition}</span>
              )}
              {editingId === condition.id ? (
                <>
                  <button
                    className="rounded px-2 py-1 text-green-500"
                    onClick={() => handleEditCondition(condition.id)}
                  >
                    Save
                  </button>
                  |
                  <button
                    className="rounded px-2 py-1 text-red-500"
                    onClick={() => {
                      setEditingId(null);
                      setEditingText('');
                    }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="rounded px-3 py-1 text-[#888888]"
                    onClick={() =>
                      handleStartEditing(condition.id, condition.condition)
                    }
                  >
                    <PencilLine className="h-5 w-5" />
                  </button>
                  <button
                    className="rounded px-3 py-1 text-[#888888]"
                    onClick={() => handleDeleteCondition(condition.id)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      {showAddInput && (
        <div className="flex items-start gap-2">
          <textarea
            className="flex-grow resize-none rounded-xl border bg-[#E1E1E1] p-2"
            placeholder="Add a new condition"
            value={newCondition}
            rows={newCondition.split('\n').length}
            onChange={(e) => setNewCondition(e.target.value)}
          />
          <button
            className="rounded-xl px-4 py-2 text-green-500"
            onClick={handleAddCondition}
          >
            Add
          </button>
          <button
            className="rounded-xl px-4 py-2 text-red-500"
            onClick={handleCancelAddCondition}
          >
            Cancel
          </button>
        </div>
      )}

      {!showAddInput && (
        <button
          className="flex items-center justify-center gap-2 rounded-full bg-[#E1E1E1] p-3 text-[#888888]"
          onClick={() => setShowAddInput(true)}
        >
          <Plus />
          <h1>Add condition</h1>
        </button>
      )}
    </div>
  );
};

export default TermEng;
