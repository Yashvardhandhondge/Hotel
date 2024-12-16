export const GamePad = () => {
  return (
    <div className="flex items-center gap-[10px]">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          stroke="#323232"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9.07155 8.48692C10.9698 7.83771 13.03 7.83769 14.9282 8.48686C15.794 8.79965 16.4679 9.49309 16.7559 10.3674L17.916 13.8479C18.1118 14.4354 17.9589 15.0832 17.521 15.5211H17.5209C17.2143 15.8277 16.7984 15.9999 16.3648 15.9999C15.9312 15.9999 15.5153 15.8277 15.2087 15.5211L14.0171 14.3294C13.9233 14.2357 13.7962 14.183 13.6635 14.183H10.3364C10.2038 14.183 10.0766 14.2357 9.98284 14.3294L8.79117 15.5211C8.48455 15.8277 8.06868 16 7.63505 16C7.20141 16 6.78554 15.8277 6.47892 15.5211V15.5211C6.04103 15.0832 5.88811 14.4355 6.08392 13.848L7.24392 10.3676C7.53185 9.49322 8.20576 8.79974 9.07155 8.48692Z"
          stroke="#323232"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <div>Game Pad</div>
    </div>
  );
};
