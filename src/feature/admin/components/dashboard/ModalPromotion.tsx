/* eslint-disable react/prop-types */

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { PromotionType } from '@/utils/dashboard/promotion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface ModalPromotionProps {
  isModalOpen: boolean;
  closeModal: () => void;
  selectedItem: PromotionType | null;
}

const chartData = [
  { month: 'Jan', purchased: 0, redeemed: 0 },
  { month: 'Feb', purchased: 200, redeemed: 100 },
  { month: 'Mar', purchased: 150, redeemed: 120 },
  { month: 'Apr', purchased: 300, redeemed: 200 },
  { month: 'May', purchased: 0, redeemed: 0 },
  { month: 'Jun', purchased: 0, redeemed: 0 },
  { month: 'Jul', purchased: 0, redeemed: 0 },
  { month: 'Aug', purchased: 0, redeemed: 0 },
  { month: 'Sep', purchased: 0, redeemed: 0 },
  { month: 'Oct', purchased: 0, redeemed: 0 },
  { month: 'Nov', purchased: 0, redeemed: 0 },
  { month: 'Dec', purchased: 0, redeemed: 0 },
];
const ModalPromotion: React.FC<ModalPromotionProps> = ({
  isModalOpen,
  closeModal,
  selectedItem,
}) => {
  return (
    <div>
      <Dialog open={isModalOpen} onOpenChange={closeModal}>
        <DialogContent className="max-w-[85rem] rounded-xl bg-[#F7F3ED] px-14 pb-4 pt-10 text-[#3F3F3F]">
          <DialogHeader>
            <div className="flex justify-between">
              <div className="flex gap-6">
                <div className="h-40 w-40 flex-shrink-0 overflow-hidden rounded-xl">
                  <img
                    src="https://i.imgur.com/41ygasy.png"
                    alt="pic"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-6">
                  <div>
                    <DialogTitle className="text-2xl">
                      {selectedItem?.name}
                    </DialogTitle>
                    <h1 className="text-[#888888]">
                      {selectedItem?.restaurant}
                    </h1>
                  </div>
                  <div className="flex gap-8">
                    <div>
                      <h1 className="font-semibold">Sale date</h1>
                      <h2>Start sale date: 12/02/2025 Time 00.00</h2>
                      <h2>Last sale date: 12/03/2025 Time 23.59</h2>
                    </div>
                    <div>
                      <h1 className="font-semibold">Use date</h1>
                      <h2>Start use date: 01/04/2025 Time 00.00</h2>
                      <h2>Last use date: 30/06/2025 Time 23.59</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <button className="rounded-full bg-[#2BB673] px-4 py-2 text-white">
                  Export Excel
                </button>
              </div>
            </div>
          </DialogHeader>
          <div className="grid grid-cols-4 gap-4">
            <div className="rounded-xl bg-[#E1E1E1] p-4 text-center">
              <h3 className="text-2xl font-medium text-[#2BB673]">
                {selectedItem?.sales.toLocaleString()}
              </h3>
              <p>Overall sales</p>
            </div>
            <div className="rounded-xl bg-[#E1E1E1] p-4 text-center">
              <h3 className="text-2xl font-medium text-[#2BB673]">
                {selectedItem?.amount.toLocaleString()}
              </h3>
              <p>Voucher ที่ขายได้ (ใบ)</p>
            </div>
            <div className="rounded-xl bg-[#E1E1E1] p-4 text-center">
              <h3 className="text-2xl font-medium text-[#2BB673]">
                {selectedItem?.redeemed.toLocaleString()}
              </h3>
              <p>Redeemed</p>
            </div>
            <div className="rounded-xl bg-[#E1E1E1] p-4 text-center">
              <h3 className="text-2xl font-medium text-[#2BB673]">
                {selectedItem?.expired.toLocaleString()}
              </h3>
              <p>Expired</p>
            </div>
          </div>
          <div className="mb-6 flex flex-col items-center justify-center gap-6 rounded-xl bg-[#E1E1E1] pt-8">
            <div className="flex gap-8">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-[#2BB673]"></div>
                <h1>voucher purchased</h1>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-[#F87171]"></div>
                <h1>redeemed</h1>
              </div>
            </div>
            <BarChart width={1000} height={250} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="purchased"
                fill="#2BB673"
                name="voucher purchased"
              />
              <Bar dataKey="redeemed" fill="#F27474" name="redeemed" />
            </BarChart>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModalPromotion;
