import "./toggle.css";

export const Toggle = ({ status, onChange }) => {
  const toggle = !status ? "toggleLeft" : "toggleRight";
  return (
    <div
      className={`toggle  ${toggle} cursor-pointer hover:shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]`}
      onClick={onChange}
    >
      <div className="toggleContent shadow-md"></div>
    </div>
  );
};
