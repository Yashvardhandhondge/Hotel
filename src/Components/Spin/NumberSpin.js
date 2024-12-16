export const NumberSpin = ({
  value = 0,
  min = 0,
  max = 10,
  onChange = () => {},
  shape,
}) => {
  return (
    <div className="flex items-center w-[100px] justify-between select-none">
      <div
        onClick={() => {
          if (value - 1 >= min) onChange(value - 1);
        }}
        className={value - 1 < min ? "cursor-not-allowed" : "cursor-pointer"}
      >
        <div className="w-[30px] h-[30px] hover:bg-[#f6f6f6] pt-[2px] text-center rounded-full shadow-[-2px_-2px_6px_0px_rgba(253,255,255,0.80),2px_2px_6px_0px_rgba(187,195,206,0.60)]">
          -
        </div>
      </div>
      {!shape ? (
        <div>{value}</div>
      ) : (
        <div className="globalInputForm rounded-full border-[1px] border-[#E3E3E3] px-[24px] py-[10px] ">
          {value}
        </div>
      )}

      <div
        onClick={() => {
          if (value + 1 <= max) onChange(value + 1);
        }}
        className={value + 1 > max ? "cursor-not-allowed" : "cursor-pointer"}
      >
        <div className="w-[30px] h-[30px] hover:bg-[#f6f6f6] pt-[2px] text-center rounded-full shadow-[-2px_-2px_6px_0px_rgba(253,255,255,0.80),2px_2px_6px_0px_rgba(187,195,206,0.60)]">
          +
        </div>
      </div>
    </div>
  );
};
