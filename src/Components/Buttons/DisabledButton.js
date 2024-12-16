export const DisabledButton = ({ text, onClick = () => {} }) => {
  return (
    <div
      onClick={onClick}
      className="text-center px-[14px] py-[8px] rounded-[12px] bg-[#E3E3E3] text-white cursor-not-allowed shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
    >
      {text}
    </div>
  );
};
