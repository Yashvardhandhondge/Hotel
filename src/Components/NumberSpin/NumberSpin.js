import { useEffect, useState } from "react";
import plusIcon from "../../assets/images/plusCircle.svg";
import minusIcon from "../../assets/images/minusCircle.svg";

export const NumberSpin = ({
  value = 0,
  min = 0,
  max = 10,
  onChange = () => {},
  shape,
}) => {
  return (
    <div className="flex items-center w-[130px] justify-between">
      <img
        alt=""
        src={minusIcon}
        onClick={() => {
          if (value - 1 >= min) onChange(value - 1);
        }}
        className={value - 1 < min ? "cursor-not-allowed" : "cursor-pointer"}
      ></img>
      {!shape ? (
        <div>{value}</div>
      ) : (
        <div className="globalInputForm rounded-full border-[1px] border-[#E3E3E3] px-[24px] py-[10px] ">
          {value}
        </div>
      )}

      <img
        alt=""
        src={plusIcon}
        onClick={() => {
          if (value + 1 <= max) onChange(value + 1);
        }}
        className={value + 1 > max ? "cursor-not-allowed" : "cursor-pointer"}
      ></img>
    </div>
  );
};
