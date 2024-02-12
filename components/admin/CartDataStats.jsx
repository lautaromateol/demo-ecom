const CardDataStats = ({
  title,
  total,
  money = false,
  children
}) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-7 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
     <div className="flex items-center justify-center w-1/6 bg-gray-300 rounded-full px-2 py-3">
      {children}
     </div>
      <div className="mt-2 flex items-end justify-between">
        <div>
          <h4 className="text-2xl font-semibold">
            {money ? "$" : null}{total > 1000 ? `${(total / 1000).toFixed(2)}K` : total}
          </h4>
          <span className="text-sm text-gray-400">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default CardDataStats;
