import TESTATE from "../../assets/images/testateLogo.svg";

export const Testate = ({ size, border = 1 }) => {
  return (
    <div
      className={`flex w-[${size}px] h-[${size}px] rounded-full bg-[#ffffff] border-${border} border-sky-500 shadow-md`}
    >
      <img alt="" src={TESTATE} className="m-auto w-[80%]" />
    </div>
  );
};
