export const GreenButton = ({ text, onClick = () => {} }) => {
  return (
    <div
      onClick={onClick}
      className="select-none px-[14px] py-[8px] rounded-[12px] bg-gradient-to-b from-[#38A569c0] from-0% to-70% to-[#38A569] text-white text-center cursor-pointer shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)] hover:shadow-[-1px_6px_10px_0_rgba(56,165,105,0.5)] hover:-translate-y-[3px]"
    >
      {text}
    </div>
  );
};
