export const WhiteButton = ({ text, onClick = () => {} }) => {
  return (
    <div
      onClick={onClick}
      className="px-[14px] py-[8px] rounded-[12px] hover:translate-y-[-4px] bg-white text-black cursor-pointer shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)] hover:shadow-[-1px_6px_10px_0_rgba(90,90,90,0.5)]"
    >
      {text}
    </div>
  );
};
