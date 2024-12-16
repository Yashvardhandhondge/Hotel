// import { PieChartComponent } from "../Global/PieChart";
import { PieChartComponent } from "../../Components/PieChart/PieChart";
import { Suspense } from "react";
import { NumericFormat } from "react-number-format";
import { Testate } from "../../Components/Testate/TestateLogo";
import Lottie from "lottie-react";
import openingSoon from "../../assets/animations/openingSoon.json";
import { Fade } from "react-awesome-reveal";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

export const YieldEstateProperty = ({
  value,
  nft_price,
  percentage,
  images,
  title,
  available,
  action = () => {},
}) => {
  return (
    <>
      <div
        className={`w-[330px] p-[10px] bg-white rounded-[8px] shadow-md h-max group cursor-pointer relative flex flex-col`}
        onClick={available ? action : () => {}}
      >
        {!available ? (
          <div className="absolute bg-[#f8f8f8d0] group-hover:flex hidden top-0 left-0 w-full h-full z-[100] rounded-[8px] flex-col items-center">
            <Fade>
              <Lottie animationData={openingSoon} />

              <div className="text-[24px] text-[#aaaaaa] font-semibold flex gap-[10px]">
                <Fade cascade>
                  {"Purchase terminated..".split(" ").map((item) => {
                    return <div>{item}</div>;
                  })}
                </Fade>
              </div>
            </Fade>
          </div>
        ) : (
          <></>
        )}

        <div
          className="relative cursor-default"
          onClick={(e) => e.stopPropagation()}
        >
          <Carousel
            showStatus={false}
            // showArrows={showArrow}
            showThumbs={false}
          >
            {images?.map((image) => (
              <img
                alt=""
                src={image}
                className={`rounded-[10px] w-full h-[180px] group-hover:scale-125 transition duration-500`}
              ></img>
            ))}
          </Carousel>
        </div>

        <div className="flex items-center justify-between mt-[10px]">
          <div className="space-y-[10px]">
            <div className="text-[16px]">{title}</div>
            <div className="flex items-center text-[12px] gap-[10px]">
              <div>
                <div className="flex items-center gap-[4px]">
                  <div className="text-[#959595]">Property Value</div>
                </div>
                <div className="flex items-center gap-[2px]">
                  <Testate size={20} />
                  <div className="text-[#5B1DEE] rounded-[8px] p-[4px] shadow-md text-[12px]">
                    <NumericFormat
                      value={value}
                      thousandSeparator={true}
                      displayType="text"
                    />
                  </div>
                  <div className="">TESTATE</div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-[4px]">
                  <div className="text-[#959595]">Min. Allocation</div>
                </div>
                <div className="flex items-center gap-[2px]">
                  <Testate size={20} />

                  <div className="text-[#5B1DEE] rounded-[8px] p-[4px] shadow-md text-[12px]">
                    {nft_price}
                  </div>
                  <div className="">TESTATE</div>
                </div>
              </div>
            </div>
          </div>
          <PieChartComponent size={70} percentage={percentage} radius={50.3} />
        </div>
        <div className="text-center mt-[10px] text-white bg-[#5B1DEE] py-[8px] rounded-[16px] group-hover:shadow-[-1px_6px_10px_0_rgba(93,0,207,0.5)] group-hover:-translate-y-[3px] cursor-pointer">
          View Details
        </div>
      </div>
    </>
  );
};
