import { useEffect, useRef } from "react";
import { PieChart } from "react-minimal-pie-chart";
import Lottie from "lottie-react";
import CountUp from "react-countup";
import pieLottie from "../../assets/animations/pie.json";
import { Fade } from "react-awesome-reveal";

export const PieChartComponent = ({ size, percentage, radius = 50.3 }) => {
  const ref = useRef();

  return (
    <Fade>
      <div className={`relative w-[${size}] h-[${size}]`}>
        <Lottie
          className={`w-[${size}px] h-[${size}px] absolute top-0`}
          animationData={pieLottie}
          loop={false}
          lottieRef={ref}
        />

        <PieChart
          className={`w-[${size}px] h-[${size}px] absolute top-0`}
          startAngle={-90}
          radius={47}
          data={[
            {
              title: "Funded",
              value: Math.round(percentage),
              color: percentage < 100 ? "#5B1DEE00" : "#5B1DEE",
            },
            {
              title: "Remaining",
              value: 100 - Math.round(percentage),
              color: "#E3E3E3",
            },
          ]}
        />

        <div className={`w-[${size}px] h-[${size}px] flex`}>
          <div
            className={`w-[${size * 0.94}px] h-[${
              size * 0.94
            }px] rounded-full bg-[#E3E3E3] flex m-auto`}
          >
            <div
              className={`w-[${size * 0.65}px] h-[${
                size * 0.65
              }px] rounded-full bg-white m-auto flex flex-col items-center justify-center z-[100] shadow-[inset_-3px_-3px_6px_rgba(0,0,0,0.2)]`}
            >
              <div
                className={`text-[#5B1DEE] text-[${size * 0.14}px] font-sans`}
              >
                <CountUp start={0} decimals={2} end={percentage} suffix="%" />
              </div>
              <div className={`text-[${size * 0.12}px]`}>Funded</div>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
};
