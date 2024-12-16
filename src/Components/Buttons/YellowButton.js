export const YellowButton = ({ text, onClick = () => {} }) => {
  return (
    <div
      onClick={onClick}
      className="select-none px-[14px] py-[8px] rounded-[12px] bg-gradient-to-b from-[#FBE202C0] from-0% to-70% to-[#FBE202] text-white text-center cursor-pointer shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
    >
      {text}
    </div>
  );
};
