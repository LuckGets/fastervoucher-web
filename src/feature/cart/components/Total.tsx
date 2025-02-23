interface TotalProps {
  total: number;
}

const Total = ({ total }: TotalProps) =>
  total !== 0 ? (
    <div className="mb-20">
      <div className="mt-2 flex justify-end p-2">
        <h1>Total: {total.toLocaleString()}</h1>
      </div>
      <hr />
    </div>
  ) : null;

export default Total;
