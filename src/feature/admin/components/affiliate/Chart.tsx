import { useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

const chartData = [
  { month: 'Jan', sales: 200, clicks: 1200 },
  { month: 'Feb', sales: 900, clicks: 1800 },
  { month: 'Mar', sales: 254, clicks: 5203 },
  { month: 'Apr', sales: 1023, clicks: 6422 },
  { month: 'May', sales: 200, clicks: 5421 },
  { month: 'Jun', sales: 351, clicks: 4352 },
  { month: 'Jul', sales: 854, clicks: 2122 },
  { month: 'Aug', sales: 2122, clicks: 6542 },
  { month: 'Sep', sales: 0, clicks: 0 },
  { month: 'Oct', sales: 0, clicks: 0 },
  { month: 'Nov', sales: 0, clicks: 0 },
  { month: 'Dec', sales: 0, clicks: 0 },
];

const Chart = () => {
  const [view, setView] = useState<'sales' | 'clicks'>('sales');

  return (
    <div className="p-4">
      <div className="mb-6 flex items-center gap-4">
        <div>
          <label htmlFor="year" className="mr-2">
            Year
          </label>
          <select
            id="year"
            className="rounded-full border border-[#888888] bg-[#F7F3ED] px-3"
          >
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
        </div>
        <div>
          <label htmlFor="month" className="mr-2">
            Month
          </label>
          <select
            id="month"
            className="rounded-full border border-[#888888] bg-[#F7F3ED] px-3"
          >
            <option value="all">All</option>
            <option value="Jan">January</option>
            <option value="Feb">February</option>
          </select>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-4 gap-4">
        <div className="rounded-xl bg-[#E1E1E1] p-4 text-center">
          <h3 className="text-2xl font-medium text-[#2BB673]">1,000</h3>
          <p>จำนวน voucher ที่ขายทั้งหมด</p>
        </div>
        <div className="rounded-xl bg-[#E1E1E1] p-4 text-center">
          <h3 className="text-2xl font-medium text-[#2BB673]">1,445,665.00</h3>
          <p>ยอดขายรวมทั้งหมด</p>
        </div>
        <div className="rounded-xl bg-[#E1E1E1] p-4 text-center">
          <h3 className="text-2xl font-medium text-[#2BB673]">144,566.00</h3>
          <p>commission ทั้งหมด</p>
        </div>
        <div className="rounded-xl bg-[#E1E1E1] p-4 text-center">
          <h3 className="text-2xl font-medium text-[#2BB673]">10%</h3>
          <p>% commission เฉลี่ย</p>
        </div>
      </div>

      <div className="rounded-xl bg-[#E1E1E1] p-2">
        <div className="mb-4 flex justify-center gap-4">
          <button
            className={`rounded-full px-4 py-2 ${view === 'sales' ? 'bg-[#2BB673] text-white' : 'border border-[#3F3F3F]'}`}
            onClick={() => setView('sales')}
          >
            ยอดขาย
          </button>
          <button
            className={`rounded-full px-4 py-2 ${view === 'clicks' ? 'bg-[#2BB673] text-white' : 'border border-[#3F3F3F]'}`}
            onClick={() => setView('clicks')}
          >
            ยอดคลิก
          </button>
        </div>

        <LineChart
          width={1100}
          height={400}
          data={chartData}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey={view}
            stroke="#3F3F3F"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </div>
    </div>
  );
};

export default Chart;
