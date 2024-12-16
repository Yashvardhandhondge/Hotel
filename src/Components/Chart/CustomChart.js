export const CustomChart = ({ data = [], start, end, min, max }) => {
  const width = Math.round(100 / data.length);

  return (
    <div className="w-full h-[100px] flex items-end gap-[2px]">
      {data.map((item, i) => {
        if (
          min + i * ((max - min) / data.length) > start &&
          min + i * ((max - min) / data.length) < end
        )
          return (
            <div
              key={i}
              className={`w-[${width}%] h-[${
                (60 * item) / 100
              }%] bg-gradient-to-b from-[#5b1deec0] from-0% to-70% to-[#5b1dee] rounded-[4px]`}
            ></div>
          );
        else
          return (
            <div
              key={i}
              className={`w-[${width}%] h-[${
                (60 * item) / 100
              }%] bg-[#E3E3E3] rounded-[4px]`}
            ></div>
          );
      })}
    </div>
  );
};
