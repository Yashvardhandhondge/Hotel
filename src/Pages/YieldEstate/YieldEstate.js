import { useDispatch } from "react-redux";
import { queryContract } from "../../Components/functions/Contract";
import { Mainnet } from "@nibiruchain/nibijs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { YieldEstateProperty } from "./YieldEstateProperty";
import { useLocation, useNavigate } from "react-router-dom";
import { Fade } from "react-awesome-reveal";

export const YieldEstate = () => {
  const dispatch = useDispatch();
  const [flag, setFlag] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const [percentages, setPercentages] = useState([]);
  const properties = useSelector((state) => state.yield.yields);
  let tempMetadataArray = [];

  //   useEffect(() => {
  //     const array = [];
  //     tempMetadataArray = [];
  //     for (let i = 0; i < properties.length; i++) {
  //       let totalCounts = 0;
  //       for (let j = 0; j < properties[i].investors.length; j++) {
  //         totalCounts += properties[i].investors[j].allocations;
  //       }

  //       const percentage = (
  //         ((properties[i].min_allocation * totalCounts) / properties[i].value) *
  //         100
  //       ).toFixed(2);
  //       array.push(Math.min(percentage, 100));
  //     }
  //     setPercentages(array);
  //   }, [properties]);

  return (
    <div className="w-full max-h-[calc(100vh-80px)] overflow-auto">
      <div className="w-full p-[8px]">
        <div className="w-full rounded-[8px] bg-gradient-to-b from-[#6B349A] to-[#4C37C3] py-[50px] flex flex-col items-center space-y-[20px]">
          <div className="text-white text-[28px]">Properties</div>
          <div className="text-white w-[1200px] text-center">
            Find your perfect home in Dubai. Explore our curated selection of
            for-sale properties, blending style and comfort.
          </div>
        </div>
      </div>

      <div className="w-full flex mt-[20px] max-h-[calc(100vh-320px)] overflow-auto">
        <div className="mx-auto gap-[20px] flex max-w-[1030px] flex-wrap">
          <Fade cascade damping={0.2}>
            {Object.values(properties).map((property, i) => {
              // if (
              //   (percentages[i] < 100 && flag === 0) ||
              //   (percentages[i] >= 100 && flag === 1)
              // )
              return (
                <YieldEstateProperty
                  //   flag={flag}
                  value={property.value / 1000000}
                  nft_price={property.min_allocation / 1000000}
                  percentage={100}
                  images={property.metaData?.Images}
                  title={
                    property.metaData ? property.metaData["Tower Name"] : ""
                  }
                  available={
                    // i === 0
                    //   ? true
                    //   : i > 0 && percentages[i - 1] >= 100
                    //   ? true
                    //   : false
                    // i > 2 && i < 7 ? false : true
                    true
                  }
                  action={() => {
                    navigate(location.pathname + "/" + property.token_id);
                  }}
                />
              );
            })}
          </Fade>
        </div>
      </div>
    </div>
  );
};
