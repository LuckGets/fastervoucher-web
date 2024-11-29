interface TotalProps {
  total: number;
}

const Total = (props: TotalProps) => {
  const { total } = props;
  return (
    <div>
      <div className="mt-2 flex justify-end">
        <h1>Total :{total}</h1>
      </div>
      <hr />
    </div>
  );
};

export default Total;
