export const PurpleButton = ({ text, onClick = () => {}, disabled }) => {
  return (
    <div
      onClick={onClick}
      className={
        disabled
          ? "select-none px-[14px] py-[8px] rounded-[12px] bg-[#d0d0d0] text-white text-center cursor-not-allowed shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
          : "select-none px-[14px] py-[8px] rounded-[12px] bg-gradient-to-b from-[#5b1deec0] from-0% to-70% to-[#5b1dee] text-white text-center cursor-pointer shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)] hover:shadow-[-1px_6px_10px_0_rgba(93,0,207,0.5)] hover:translate-y-[-3px]"
      }
    >
      {text}
    </div>
  );
};
