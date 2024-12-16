import pinLocation from "../../assets/images/YieldEstate/Pin, Location.svg";
import map from "../../assets/images/YieldEstate/Frame 1000005469.svg";
import document from "../../assets/images/YieldEstate/Documents, File.svg";
import letters from "../../assets/images/YieldEstate/letters-mail-download.svg";
import NFTIcon from "../../assets/images/YieldEstate/Group 1000004856.svg";
import file from "../../assets/images/YieldEstate/file-02.svg";
import Buy from "../../assets/images/YieldEstate/Buy.svg";
import bin from "../../assets/images/YieldEstate/bin.svg";
import { NumberSpin } from "../../Components/NumberSpin/NumberSpin";
import { PieChartComponent } from "../../Components/PieChart/PieChart";
import bedroomIcon from "../../assets/images/icon (2).svg";
import LandIcon from "../../assets/images/icon.svg";
import bathroomIcon from "../../assets/images/icon (1).svg";
import locationIcon from "../../assets/images/location.svg";
import backArrow from "../../assets/images/Arrow1.svg";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { queryBalance } from "../../Components/functions/Contract";
import { ImageView } from "../../Components/Images/ImageView";
import { Carousel } from "react-responsive-carousel";
// import { setHeaderMode } from "../../Actions/HeaderSlice";
import InputSlider from "react-input-slider";
// import Confetti from "react-confetti";
import { Testate } from "../../Components/Testate/TestateLogo";
import { Fade } from "react-awesome-reveal";
import { Mainnet } from "@nibiruchain/nibijs";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const mainNet = Mainnet();

export const YieldEstateDetails = ({
  action1 = () => {},
  action2 = () => {},
  images,
}) => {
  const params = useParams();
  const currentProperty = useSelector((state) => state.yield.yields[params.id]);

  const [percentage, setPercentage] = useState(0);
  const navigate = useNavigate();
  const [nftsAvailable, setNftsAvailable] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [nftPrice, setNftPrice] = useState(0);
  const dispatch = useDispatch();
  const account = useSelector((state) => state.auth.account);
  const walletEx = useSelector((state) => state.auth.wallet);
  const [myPercentage, setMyPercentage] = useState(0);
  const [cartOwnership, setCartOwnership] = useState(0);
  const [myNFTs, setMyNFTs] = useState(0);
  const [mode, setMode] = useState(0);

  const [tokenBalance, setTokenBalance] = useState(0);
  const [nftsToBuy, setNftsToBuy] = useState(1);
  const location = useLocation();
  const [sliderValue, setSliderValue] = useState({
    allocation: 500,
    years: 5,
    growth: 30,
    rental: 10,
  });

  useEffect(() => {
    console.log(currentProperty);
    let totalCounts = 0;
    for (let i = 0; i < currentProperty?.investors.length; i++) {
      totalCounts += currentProperty?.investors[i].allocations;
      if (currentProperty?.investors[i].address === account) {
        setMyPercentage(
          (
            ((currentProperty?.investors[i].allocations *
              currentProperty?.min_allocation) /
              currentProperty?.value) *
            100
          ).toFixed(2)
        );
        setMyNFTs(currentProperty?.investors[i].allocations);
      }
    }

    setNftsAvailable(
      currentProperty?.value / currentProperty?.min_allocation - totalCounts
    );
    const totalDeposit = currentProperty?.min_allocation * totalCounts;
    setNftPrice(currentProperty?.min_allocation);
    setTotalAmount(totalDeposit / 1000000);
    setPercentage(
      Math.min(((totalDeposit / currentProperty?.value) * 100).toFixed(2), 100)
    );
    getBalance();
  }, [currentProperty]);

  useEffect(() => {
    setCartOwnership(
      (
        ((nftsToBuy * currentProperty?.min_allocation) /
          currentProperty?.value) *
        100
      ).toFixed(2)
    );
  }, [nftsToBuy]);

  const getBalance = async () => {
    if (!account) return;
    const res = await queryBalance(
      account,
      process.env.REACT_APP_TESTATE_DENOM,
      mainNet.endptTm
    );
    setTokenBalance((res.amount / 1000000).toFixed(2));
  };

  const buyNFTs = async () => {
    const tokenToSend = [
      {
        amount: (nftPrice * nftsToBuy).toString(),
        denom: process.env.REACT_APP_TESTATE_DENOM,
      },
    ];

    // let token = "";
    // if (currentProperty?.token_id === "3") {
    //   token = "6";
    // } else {
    //   token = currentProperty?.token_id;
    // }
    const Message = {
      buy_nfts: {
        token_id: currentProperty?.token_id,
        counts: nftsToBuy,
      },
    };

    // const result = await executeContract(
    //   mainNet.chainId,
    //   mainNet.endptTm,
    //   process.env.REACT_APP_FRACTIONALIZED_SMART_CONTRACT,
    //   dispatch,
    //   currentProperty?.token_id,
    //   "",
    //   Message,
    //   account,
    //   walletEx,
    //   tokenToSend
    // );
    // setUpdateFlag(!updateFlag);
    // if (result) setMode(2);
    // getBalance();
    // updateTime();
  };

  const [time, setTime] = useState(null);

  const updateTime = () => {
    const now = new Date();

    const formattedTime = `${now.getDate()}th ${now.toLocaleString("default", {
      month: "short",
    })} ${now.getFullYear().toString().slice(-2)} - ${now.toLocaleString(
      "en-US",
      { hour: "numeric", minute: "2-digit", hour12: true }
    )}`;

    setTime(formattedTime);
  };

  const review = useRef();

  useLayoutEffect(() => {
    const divTop = review.current?.getBoundingClientRect().top;
    const divRight = review.current?.getBoundingClientRect().left;
    const width = review.current?.getBoundingClientRect().width;
    const onScroll = () => {
      if (review.current)
        if (divTop < window.scrollY + 80) {
          review.current.style.position = "fixed";
          review.current.style.top = "80px";
          review.current.style.left = divRight + "px";
          review.current.style.width = width + "px";
        } else {
          review.current.style.position = "relative";
          review.current.style.top = "0px";
          review.current.style.left = "0px";
        }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {!mode ? (
        <div className="flex flex-col items-center py-[30px] space-y-[20px] max-h-[calc(100vh-90px)] overflow-auto">
          <Fade cascade>
            <div
              className="p-[16px] rounded-[16px] shadow-md bg-white flex gap-[10px] items-center w-[1200px] cursor-pointer hover:shadow-[-1px_6px_10px_0_rgba(50,50,50,0.5)] hover:-translate-y-[3px]"
              onClick={() =>
                navigate(location.pathname.replace("/" + params.id, ""))
              }
            >
              <img alt="" src={backArrow} />
              <div className="text-[18px]">Back to listings</div>
            </div>
            <div className="w-[1200px]">
              <ImageView images={currentProperty?.metaData?.Images} />
            </div>

            <div className="grid grid-cols-2 gap-[20px] w-[1200px]">
              <div className="space-y-[20px] p-[20px] bg-white rounded-[16px] shadow-md">
                <div className="space-y-[10px]">
                  <div className="text-[24px]">
                    {currentProperty?.metaData["Tower Name"]}
                  </div>
                  <div className="flex gap-[20px] text-[18px] ">
                    {currentProperty?.metaData["Number of Bedrooms"] ? (
                      <div>
                        <div>Bedroom</div>
                        <div className="flex items-center">
                          <img
                            alt=""
                            src={bedroomIcon}
                            className="w-[40px] h-[40px]"
                          ></img>
                          <div>
                            {
                              currentProperty?.metaData["Number of Bedrooms"]
                                .toString()
                                .split(" ")[0]
                            }
                          </div>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                    {currentProperty?.metaData["Number of Bathrooms"] ? (
                      <div>
                        <div>Bathroom</div>
                        <div className="flex items-center">
                          <img
                            alt=""
                            src={bathroomIcon}
                            className="w-[40px] h-[40px]"
                          ></img>
                          <div>
                            {
                              currentProperty?.metaData["Number of Bathrooms"]
                                .toString()
                                .split(" ")[0]
                            }
                          </div>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}

                    <div>
                      <div>Land area</div>
                      <div className="flex items-center">
                        <img
                          alt=""
                          src={LandIcon}
                          className="w-[40px] h-[40px]"
                        ></img>
                        <div>{currentProperty?.metaData["Size"]}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />

                <div className="space-y-[10px]">
                  <div className="text-[24px]">Location</div>
                  <div className="flex items-center text-[18px]  gap-[10px]">
                    <img alt="" src={locationIcon}></img>
                    <div>Dubai, UAE</div>
                  </div>
                  <div className="text-[#959595]">
                    {currentProperty?.metaData["Address"]}
                  </div>
                </div>
                <hr />

                <div>
                  <div className="font-semibold">Investment calculator</div>
                  <div className="flex flex-col items-center">
                    <div className="text-[#5A5A5A]">
                      Projected investment return of
                    </div>
                    <div className="flex items-center">
                      <div className="text-[28px] gap-[10px] flex">
                        <div>TESTATE</div>
                        <div>
                          {Math.floor(
                            // sliderValue.allocation /
                            //   (((currentProperty?.value / 1000000) *
                            //     sliderValue.growth) /
                            //     100 +
                            //     (((currentProperty?.value / 1000000) *
                            //       sliderValue.rental) /
                            //       100) *
                            //       sliderValue.years)
                            (sliderValue.allocation * sliderValue.rental) /
                              100 +
                              (sliderValue.allocation *
                                sliderValue.growth *
                                sliderValue.years) /
                                100
                          )}
                        </div>
                        <span className="text-[#959595]">in</span>
                        {sliderValue.years} years
                      </div>
                      {/* <img alt=""  src={question} /> */}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between">
                    <div className="text-[#5A5A5A]">Allocation Amount</div>
                    <div className="font-semibold">
                      TESTATE {sliderValue.allocation}
                    </div>
                  </div>
                  <InputSlider
                    axis="x"
                    x={sliderValue.allocation}
                    onChange={({ x }) =>
                      setSliderValue({ ...sliderValue, allocation: x })
                    }
                    styles={{
                      track: {
                        height: "5px",
                        width: "100%",
                        background: "#e9ecef",
                      },
                      active: {
                        background: "#5b1dee",
                      },
                    }}
                    xmax={currentProperty?.value / 10000000}
                    xstep={100}
                  />
                </div>

                <div>
                  <div className="flex justify-between">
                    <div className="text-[#5A5A5A]">Investment Years</div>
                    <div className="font-semibold">{sliderValue.years}</div>
                  </div>
                  <InputSlider
                    axis="x"
                    x={sliderValue.years}
                    xmin={1}
                    xmax={10}
                    onChange={({ x }) =>
                      setSliderValue({ ...sliderValue, years: x })
                    }
                    styles={{
                      track: {
                        height: "5px",
                        width: "100%",
                        background: "#e9ecef",
                      },
                      active: {
                        background: "#5b1dee",
                      },
                    }}
                  />
                </div>

                <div>
                  <div className="flex justify-between">
                    <div className="text-[#5A5A5A]">Growth rate</div>
                    <div className="font-semibold">{sliderValue.growth}%</div>
                  </div>
                  <InputSlider
                    axis="x"
                    x={sliderValue.growth}
                    onChange={({ x }) =>
                      setSliderValue({ ...sliderValue, growth: x })
                    }
                    styles={{
                      track: {
                        height: "5px",
                        width: "100%",
                        background: "#e9ecef",
                      },
                      active: {
                        background: "#5b1dee",
                      },
                    }}
                    xmax={50}
                  />
                </div>

                <div>
                  <div className="flex justify-between">
                    <div className="text-[#5A5A5A]">Rental yield</div>
                    <div className="font-semibold">{sliderValue.rental}%</div>
                  </div>
                  <InputSlider
                    axis="x"
                    x={sliderValue.rental}
                    onChange={({ x }) =>
                      setSliderValue({ ...sliderValue, rental: x })
                    }
                    styles={{
                      track: {
                        height: "5px",
                        width: "100%",
                        background: "#e9ecef",
                      },
                      active: {
                        background: "#5b1dee",
                      },
                    }}
                    xmax={30}
                  />
                </div>

                <div className="text-[#5A5A5A] text-center text-[14px]">
                  (the returns are simulated and cannot predict future market
                  events that may result in a change of forecast)
                </div>

                {/* <div className="bg-[#959595] flex justify-center rounded-[16px] py-[8px] items-center gap-[10px] cursor-pointer">
                <div className="text-white">Calculate</div>
                <img alt=""  src={questionwhite} />
              </div> */}

                <hr />

                <div>
                  <div className="text-[20px] font-semibold mb-[10px]">
                    Property Overview
                  </div>
                  <div>
                    Welcome to Fairways West Towers, The Views – where luxury
                    living meets breathtaking vistas! Nestled in the heart of an
                    idyllic landscape, this exclusive property promises an
                    unparalleled living experience for those who appreciate the
                    finer things in life.
                  </div>
                  <div className="space-y-[10px] my-[20px]">
                    <div>🌟 Location: Fairways West Towers, The Views </div>
                    <div>🏰 Property Type: Luxury Residential Towers </div>
                    <div>
                      🏞️ Surroundings: Surrounded by lush greenery and
                      picturesque landscapes
                    </div>
                    <div>
                      🌅 Views: Panoramic views of rolling hills, serene lakes,
                      and stunning sunsets
                    </div>
                    <div>
                      🏢 Architecture: Elegant and modern design with
                      state-of-the-art facilities
                    </div>
                    <div>
                      🌳 Green Spaces: Expansive gardens and walking trails for
                      a tranquil lifestyle
                    </div>
                    <div>
                      🏊‍♂️ Amenities: Private pools, spa, fitness center, and
                      exclusive clubhouse
                    </div>
                    <div>
                      🛍️ Shopping: Proximity to upscale shopping districts and
                      boutiques
                    </div>
                    <div>
                      🍽️ Dining: Gourmet restaurants and cafes within walking
                      distance
                    </div>
                    <div>
                      🚗 Accessibility: Convenient access to major highways and
                      public transportation
                    </div>
                    <div>
                      🌐 Connectivity: High-speed internet and smart home
                      features for modern living
                    </div>
                    <div>
                      🛫 Airport Access: Close to international airports for
                      global connectivity
                    </div>
                    <div>
                      👩‍👩‍👧‍👦 Community: Close-knit and friendly neighborhood with a
                      sense of community
                    </div>
                  </div>
                  <div>
                    Immerse yourself in the epitome of luxury at Fairways West
                    Towers, The Views. Indulge in a lifestyle where every detail
                    is carefully curated to enhance your living experience.
                    Discover the perfect blend of sophistication and
                    tranquility, as you savor the spectacular views that make
                    this property truly one-of-a-kind. Welcome home to a life of
                    opulence at Fairways West Towers, The Views!
                  </div>
                </div>

                <hr />

                <div className="space-y-[20px]">
                  <div className="text-[20px] font-semibold">Financials</div>
                  {/* <div className="grid grid-cols-2 gap-[20px]"> */}
                  <div className="space-y-[20px]">
                    <div className="flex justify-between">
                      <div className="text-[#5A5A5A]">Property price</div>
                      <div className="flex items-center gap-[4px]">
                        <div className="font-semibold">TESTATE</div>
                        <NumericFormat
                          value={currentProperty?.value / 1000000}
                          displayType="text"
                          thousandSeparator
                        />
                      </div>
                    </div>
                    {/* <div className="flex justify-between">
                        <div className="text-[#5A5A5A]">Transaction cost</div>
                        <div className="flex items-center gap-[4px]">
                          <div className="font-semibold">TESTATE</div>
                          <NumericFormat
                            value={
                              ((currentProperty?.value / 1000000) * 0.5) / 100
                            }
                            displayType="text"
                            thousandSeparator
                          />
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="text-[#5A5A5A]">Fee</div>
                        <div className="flex items-center gap-[4px]">
                          <div className="font-semibold">TESTATE</div>
                          <NumericFormat
                            value={currentProperty?.value / 1000000 / 100}
                            displayType="text"
                            thousandSeparator
                          />
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="text-[#5A5A5A]">Investment cost</div>
                        <div className="flex items-center gap-[4px]">
                          <div className="font-semibold">TESTATE</div>
                          <NumericFormat
                            value={
                              currentProperty?.value / 1000000 / 100 +
                              ((currentProperty?.value / 1000000) * 0.5) / 100 +
                              currentProperty?.value / 1000000
                            }
                            displayType="text"
                            thousandSeparator
                          />
                        </div>
                      </div> */}
                  </div>
                  {/* <div className="space-y-[20px]">
                    <div className="font-semibold">Property Cost</div>
                    <div className="flex justify-between">
                      <div className="text-[#5A5A5A]">Grossrent</div>
                      <div className="font-semibold">TESTATE 1,467,113</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-[#5A5A5A]">Service changes</div>
                      <div className="font-semibold">TESTATE 1,467,113</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-[#5A5A5A]">Maintenance</div>
                      <div className="font-semibold">1.5%</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-[#5A5A5A]">Investment cost</div>
                      <div className="font-semibold text-[#5B1DEE]">
                        TESTATE 80.710
                      </div>
                    </div>
                  </div> */}
                  {/* </div> */}
                  {/* <div className="flex justify-end">
                  <div className="bg-[#959595] flex justify-center rounded-[16px] py-[8px] items-center gap-[10px] px-[18px]">
                    <div className="text-white">Lorem ipsum dolor sit amet</div>
                    <img alt=""  src={questionwhite} />
                  </div>
                </div> */}
                </div>
                <hr />

                <div className="space-y-[20px]">
                  <div className="text-[20px] font-semibold">
                    Funding timeline
                  </div>

                  {/* <div className="bg-[#959595] flex justify-center rounded-[16px] py-[8px] items-center gap-[10px] px-[18px] w-max">
                  <div className="text-white">Lorem ipsum dolor sit amet</div>
                </div> */}

                  <div className="flex gap-[16px]">
                    <div className="flex flex-col items-center">
                      <div className="bg-[#5B1DEE] rounded-full w-[16px] h-[16px] mt-[4px]"></div>
                      <div className="bg-[#5B1DEE] w-[2px] h-[96px]"></div>
                      <div className="bg-[#5B1DEE] rounded-full w-[24px] h-[24px] flex">
                        <div className="bg-[#ffffff] rounded-full w-[16px] h-[16px] m-auto"></div>
                      </div>
                      {/* <div className="bg-[#B6B6B6] w-[2px] h-[80px]"></div> */}
                      {/* <div className="bg-[#B6B6B6] rounded-full w-[16px] h-[16px]"></div> */}
                    </div>
                    <div className="space-y-[20px]">
                      <div>
                        <div className="text-[#959595]">October 2023</div>
                        <div className="font-semibold">Closing date</div>
                        <div>
                          Finalize raise within two weeks or less. Close pools
                          once fully subscribed
                        </div>
                      </div>
                      <div>
                        <div className="text-[#959595]">October 2023</div>
                        {/* <div className="font-semibold">
                        SPV formation and title deed distribution
                      </div> */}
                        <div>
                          Finalize all pool contributions and begin opening
                          claims for NFTs as proof of fractional ownership
                        </div>
                      </div>
                      {/* <div>
                      <div className="text-[#959595]">October 2023</div>
                      <div className="font-semibold">
                        SPV formation and title deed distribution
                      </div>
                      <div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Proin posuere nisi magna,
                      </div>
                    </div> */}
                    </div>
                  </div>
                </div>

                <hr />

                <div className="space-y-[10px]">
                  <div className="text-[20px] font-semibold">Location</div>
                  <div className="flex items-center">
                    <img alt="" src={pinLocation} />
                    <div>113 Fairways West Towers, Jumeriah Village Circle</div>
                  </div>
                  <img alt="" src={map} />
                  <div>
                    Fairways West Towers, The Views, stands as a pinnacle of
                    refined living within a captivating landscape. Nestled amid
                    lush greenery and gardens, this property offers a retreat
                    from city life while ensuring convenient access to essential
                    amenities. The architectural design seamlessly merges modern
                    luxury with the natural surroundings, creating an elegant
                    ambiance. With panoramic views of rolling hills and serene
                    lakes, Fairways West Towers provides residents with a
                    tranquil haven. The location's accessibility, upscale
                    shopping, and diverse dining options enrich the overall
                    experience of luxury living.
                  </div>
                  <hr />
                  <div>
                    <div className="text-[20px] font-semibold mb-[10px]">
                      Amenities
                    </div>
                    {/* <div className="grid grid-cols-2">
                    <div className="flex items-center">
                      <img alt=""  src={gardenView}></img>
                      <div>Garden View</div>
                    </div>
                    <div className="flex items-center">
                      <img alt=""  src={Cityskylineview}></img>
                      <div>City skyline view</div>
                    </div>
                    <div className="flex items-center">
                      <img alt=""  src={kitchen}></img>
                      <div>Kitchen</div>
                    </div>
                    <div className="flex items-center">
                      <img alt=""  src={wifi}></img>
                      <div>Wifi</div>
                    </div>
                    <div className="flex items-center">
                      <img alt=""  src={dework}></img>
                      <div>Dedicated Workspace</div>
                    </div>
                    <div className="flex items-center">
                      <img alt=""  src={fpp}></img>
                      <div>Free Parking on premiese</div>
                    </div>
                    <div className="flex items-center">
                      <img alt=""  src={pool}></img>
                      <div>Pool</div>
                    </div>
                    <div className="flex items-center">
                      <img alt=""  src={cma}></img>
                      <div>Carbon monoxide alarm</div>
                    </div>
                    <div className="flex items-center">
                      <img alt=""  src={sa}></img>
                      <div>Smoking alarm</div>
                    </div>
                    <div className="flex items-center">
                      <img alt=""  src={tv}></img>
                      <div>TV</div>
                    </div>
                  </div> */}
                    <div className="space-y-[10px]">
                      {currentProperty?.metaData["Additional Features"].map(
                        (item) => {
                          return <div> * {item}</div>;
                        }
                      )}
                    </div>
                  </div>

                  <hr />

                  <div className="space-y-[20px]">
                    <div className="text-[20px] font-semibold">
                      Documents (4)
                    </div>
                    <div className="rounded-[16px] shadow-md p-[16px] flex items-center justify-between">
                      <div className="flex items-center">
                        <img alt="" src={document} />
                        <div>Property price</div>
                      </div>
                      <img alt="" src={letters} />
                    </div>
                    <div className="rounded-[16px] shadow-md p-[16px] flex items-center justify-between">
                      <div className="flex items-center">
                        <img alt="" src={document} />
                        <div>Property price</div>
                      </div>
                      <img alt="" src={letters} />
                    </div>
                    <div className="rounded-[16px] shadow-md p-[16px] flex items-center justify-between">
                      <div className="flex items-center">
                        <img alt="" src={document} />
                        <div>Property price</div>
                      </div>
                      <img alt="" src={letters} />
                    </div>
                  </div>
                  {/* <hr />
                    <div className="space-y-[20px]">
                      <div className="text-[20px] font-semibold">
                        Have more questions about this property?
                      </div>
                      <div className="flex items-center">
                        <img alt=""  src={Profile} />
                        <div>
                          <div className="font-semibold mb-[10px]">
                            Contact us for support
                          </div>
                          <div className="from-[#6B349A] to-[#4C37C3] bg-gradient-to-b text-white flex items-center gap-[10px] rounded-full w-max py-[8px] px-[14px] cursor-pointer">
                            <img alt=""  src={message} />
                            <div>Message us</div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                </div>
              </div>
              <div
                className="space-y-[20px] p-[20px] bg-white rounded-[16px] shadow-md h-max except"
                ref={review}
              >
                <div className="flex items-center justify-center gap-[40px]">
                  <PieChartComponent
                    size={160}
                    percentage={percentage}
                    radius={50}
                  />
                  <div className="text-[18px]">
                    <div>Property price</div>
                    <div className="flex items-center gap-[10px] ">
                      <Testate size={24} />
                      <div className="text-[#5B1DEE] p-[4px] rounded-[4px] shadow-md">
                        <NumericFormat
                          value={currentProperty?.value / 1000000}
                          thousandSeparator={true}
                          displayType="text"
                        />
                      </div>
                      <div className="text-[#959595]">TESTATE</div>
                    </div>
                  </div>
                </div>
                <div className="p-[16px] rounded-[8px] shadow-md space-y-[10px]">
                  {/* <div className="flex justify-between items-center">
                  <div className="flex gap-[10px]">
                    <div className="text-[#5B1DEE]">
                      {currentProperty?.investors.length}
                    </div>
                    <div>investors</div>
                  </div>
                  <div className="flex items-center gap-[10px]">
                    <img alt=""  src={clock} />
                    <div className="text-[#DB1F22]">Closed on 07 Oct 2023</div>
                  </div>
                </div> */}
                  <div className="flex justify-between">
                    <div>Annualised return</div>
                    <div className="font-semibold">9.41%</div>
                  </div>
                  <div className="flex justify-between">
                    <div>Funded date</div>
                    <div className="font-semibold">7 Oct 2023</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>Property value</div>
                    <div className="flex items-center gap-[10px]">
                      {/* <img alt=""  src={smallerNUSD} /> */}
                      <Testate size={24} />

                      <div className="text-[#5B1DEE]">
                        <NumericFormat
                          value={currentProperty?.value / 1000000}
                          thousandSeparator={true}
                          displayType="text"
                        />
                      </div>
                      <div className="font-semibold">TESTATE</div>
                    </div>
                  </div>
                  <hr />
                  <div className="font-semibold">Testate balance</div>

                  <div className="globalInputForm rounded-full w-full py-[8px] px-[20px] flex items-center gap-[10px]">
                    <div className="text-[#B6B6B6]">Wallet</div>
                    <div className="flex items-center gap-[10px] text-[20px] ">
                      <Testate size={28} />

                      <div className="text-[#5B1DEE] font-semibold">
                        <NumericFormat
                          value={tokenBalance}
                          thousandSeparator={true}
                          displayType="text"
                        />
                      </div>
                      <div className="text-[#959595]">TESTATE</div>
                    </div>
                  </div>
                  <hr />
                  <div className="flex justify-between">
                    <div className="flex items-center gap-[10px]">
                      <img alt="" src={NFTIcon} />
                      <div>Allocation Quantity</div>
                    </div>
                    <NumberSpin
                      shape={1}
                      value={nftsToBuy}
                      onChange={setNftsToBuy}
                      min={1}
                      max={Math.floor(
                        tokenBalance /
                          (currentProperty?.min_allocation / 1000000)
                      )}
                    />
                  </div>
                  <div className="flex justify-between">
                    <div>Allocations Available</div>
                    <div className="font-semibold">
                      <NumericFormat
                        value={nftsAvailable}
                        thousandSeparator={true}
                        displayType="text"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>Price per Allocation</div>
                    <div className="flex items-center gap-[10px]">
                      <Testate size={24} />
                      <div className="text-[#5B1DEE]">
                        {currentProperty?.min_allocation / 1000000}
                      </div>
                      <div className="font-semibold">TESTATE</div>
                    </div>
                  </div>
                  <hr />
                  <div className="flex justify-between items-center">
                    <div className="font-semibold">Total Amount</div>
                    <div className="flex items-center gap-[10px] ">
                      {/* <img alt=""  src={TESTATE} /> */}
                      <Testate size={24} />

                      <div className="text-[#5B1DEE] p-[4px] rounded-[4px] shadow-md">
                        {(nftsToBuy * currentProperty?.min_allocation) /
                          1000000}
                      </div>
                      <div className="text-[#959595]">TESTATE</div>
                    </div>
                  </div>
                  <hr />

                  <>
                    {nftsAvailable > 0 ? (
                      <div
                        className="text-white text-center bg-[#5B1DEE] rounded-[16px] py-[12px] hover:shadow-[-1px_6px_10px_0_rgba(91,29,238,0.5)] hover:-translate-y-[3px] cursor-pointer"
                        onClick={() => {
                          setMode(1);
                        }}
                      >
                        Purchase Allocation
                      </div>
                    ) : (
                      <>
                        <div className="text-white text-center bg-[#dfdfdf] rounded-[16px] py-[12px] hover:-translate-y-[3px] cursor-not-allowed">
                          Funded
                        </div>
                      </>
                    )}
                  </>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      ) : (
        <></>
      )}
      {mode === 1 ? (
        <>
          <div className="flex flex-col items-center pt-[30px] h-[calc(100vh-60px)] space-y-[20px]">
            <div
              className="p-[16px] rounded-[16px] shadow-md bg-white flex gap-[10px] items-center w-[1200px] cursor-pointer hover:shadow-[-1px_6px_10px_0_rgba(50,50,50,0.5)] hover:-translate-y-[3px]"
              onClick={() => setMode(0)}
            >
              <img alt="" src={backArrow} />
              <div className="text-[18px]">Confirmation and pay</div>
            </div>
            <div className="grid grid-cols-2 gap-[20px] w-[1200px]">
              <div className="shadow-md rounded-[16px] p-[16px] bg-white h-max space-y-[20px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[20px]">
                    <img
                      alt=""
                      src={currentProperty?.metaData?.Images[0]}
                      className="w-[80px] h-[80px] rounded-[4px]"
                    />
                    <div className="space-y-[20px]">
                      <div className="text-[20px]">
                        {currentProperty?.metaData["Tower Name"]}
                      </div>
                      <div className="flex items-center gap-[20px] text-[14px]">
                        <div>
                          <div className="flex items-center gap-[10px]">
                            <div className="text-[#959595]">NFTs</div>
                            {/* <img alt=""  src={Icon} /> */}
                          </div>
                          <div className="flex items-center gap-[10px]">
                            <img alt="" src={NFTIcon} />
                            <div className="">{myNFTs + nftsToBuy}</div>
                            <div className="text-[#959595]">
                              {(
                                Number(myPercentage) + Number(cartOwnership)
                              ).toFixed(2)}
                              % ownership
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-[10px]">
                            <div className="text-[#959595]">
                              Total Pool Investment
                            </div>
                            {/* <img alt=""  src={Icon} /> */}
                          </div>
                          <div className="flex items-center gap-[10px]">
                            <img alt="" src={Buy} />
                            <div className="flex gap-[4px]">
                              <NumericFormat
                                value={
                                  totalAmount + (nftPrice * nftsToBuy) / 1000000
                                }
                                thousandSeparator={true}
                                displayType="text"
                              />
                              <div>TESTATE</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <PieChartComponent
                    size={100}
                    percentage={Number(percentage) + Number(cartOwnership)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div
                    className="text-[#5D00CF] border-[#5D00CF] border-[1px] rounded-[16px] py-[8px] px-[14px] flex items-center gap-[10px] cursor-pointer w-[60%] justify-center hover:shadow-[-1px_6px_10px_0_rgba(91,29,238,0.5)] hover:-translate-y-[3px]"
                    onClick={() => setMode(0)}
                  >
                    <img alt="" src={bin} />
                    <div>Remove</div>
                  </div>
                  <NumberSpin
                    shape={1}
                    value={nftsToBuy}
                    onChange={setNftsToBuy}
                    min={1}
                    max={Math.floor(
                      tokenBalance / (currentProperty?.min_allocation / 1000000)
                    )}
                  />
                </div>
              </div>

              <div className="space-y-[20px] p-[20px] bg-white rounded-[16px] w-full shadow-md h-max">
                <div className="p-[16px] rounded-[8px] shadow-md space-y-[10px]">
                  <div className="flex items-center gap-[10px]">
                    <img alt="" src={file} />
                    <div className="font-semibold text-[24px]">Review</div>
                  </div>
                  <div className="text-[20px] font-semibold">
                    {currentProperty?.metaData["Tower Name"]}
                  </div>
                  <hr />
                  <div className="flex justify-between items-center">
                    <div className="text-[#959595]">Total Pool Investment</div>
                    <div className="flex items-center gap-[10px]">
                      <Testate size={20} />

                      <div className="text-[#5B1DEE]">
                        <NumericFormat
                          value={totalAmount + (nftPrice * nftsToBuy) / 1000000}
                          thousandSeparator={true}
                          displayType="text"
                        />
                      </div>
                      <div className="">TESTATE</div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-[#959595]">Available Allocations</div>
                    <div className="">
                      <NumericFormat
                        value={nftsAvailable - nftsToBuy}
                        thousandSeparator
                        displayType="text"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-[#959595]">Minimum Allocation</div>
                    <div className="flex items-center gap-[10px]">
                      <Testate size={20} />
                      {/* <img alt=""  src={smallerNUSD} /> */}
                      <div className="text-[#5B1DEE]">{nftPrice / 1000000}</div>
                      <div className="">TESTATE</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-[#959595]">Allocation Price</div>
                    <div className="flex items-center gap-[10px]">
                      <Testate size={20} />

                      <div className="text-[#5B1DEE]">{nftPrice / 1000000}</div>
                      <div className="">TESTATE</div>
                    </div>
                  </div>

                  {/* <div className="flex justify-between">
                        <div className="text-[#38A569]">5% discount</div>
                        <div className="flex items-center gap-[10px] text-[20px] ">
                          <img alt=""  src={smallerNUSD} />
                          <div className="text-[#5B1DEE] p-[4px] rounded-[4px] shadow-md font-semibold">
                            1,470,000
                          </div>
                          <div className="text-[#959595]">TESTATE</div>
                        </div>
                      </div> */}

                  <hr />
                  <div className="font-semibold">Payment Method</div>

                  <div className="globalInputForm rounded-full w-full py-[8px] px-[20px] flex items-center gap-[10px]">
                    <div className="text-[#B6B6B6]">Wallet</div>
                    <div className="flex items-center gap-[10px] text-[20px] ">
                      <Testate size={28} />

                      <div className="text-[#5B1DEE] font-semibold">
                        <NumericFormat
                          value={tokenBalance}
                          thousandSeparator={true}
                          displayType="text"
                        />
                      </div>
                      <div className="text-[#959595]">TESTATE</div>
                    </div>
                  </div>
                  <hr />

                  <div className="flex justify-between items-center">
                    <div className="font-semibold">Total (TESTATE)</div>
                    <div className="flex items-center gap-[10px] text-[20px] ">
                      {/* <img alt=""  src={smallerNUSD} /> */}
                      <Testate size={20} />

                      <div className="text-[#5B1DEE] p-[4px] rounded-[4px] shadow-md font-semibold">
                        {(nftPrice * nftsToBuy) / 1000000}
                      </div>
                      <div className="text-[#959595]">TESTATE</div>
                    </div>
                  </div>
                </div>
                <div
                  className="text-white text-center bg-[#5B1DEE] rounded-[16px] py-[12px] hover:shadow-[-1px_6px_10px_0_rgba(91,29,238,0.5)] hover:-translate-y-[3px] cursor-pointer"
                  onClick={() => {
                    buyNFTs();
                    // setMode(2);
                    //
                    // toast.error(`Not available for purchase yet`, {
                    //   autoClose: 1000,
                    // });
                  }}
                >
                  Place Order
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      {mode === 2 ? (
        <>
          <div className="w-full relative">
            {/* <Confetti className="mx-auto w-full h-[calc(100vh-60px)]" /> */}
            <div className="w-full flex flex-col items-center space-y-[20px] z-[50] absolute top-0">
              <div className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#6B349A] to-[#4C37C3]">
                Investment Confirmed!
              </div>
              <div>
                Proceed to portfolio to enjoy your new real estate purchase.
              </div>
              <div className="w-[360px] p-[10px] bg-white rounded-[8px] space-y-[10px] shadow-md h-max">
                <div className="relative">
                  <Carousel controls={false} interval={null}>
                    {currentProperty?.metaData?.Images.map((image) => (
                      <img
                        alt=""
                        src={image}
                        className={`rounded-[10px] w-full h-[180px] hover:scale-125 transition duration-500`}
                      ></img>
                    ))}
                  </Carousel>
                </div>

                <div className="flex items-center gap-3">
                  <div className="space-y-[10px]">
                    <div className="text-[18px]">
                      {currentProperty?.metaData["Tower Name"]}
                    </div>
                    <div className="flex items-center text-[12px] gap-[10px]">
                      <div>
                        <div className="flex items-center gap-[4px]">
                          <div className="text-[#959595]">Allocation Size</div>
                        </div>
                        <div className="flex items-center gap-[4px]">
                          <img alt="" src={NFTIcon} />
                          <div className="">{myNFTs}</div>
                          <div className="text-[#959595]">
                            {myPercentage}% ownership
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-[4px]">
                          <div className="text-[#959595]">
                            Investment Amount
                          </div>
                        </div>
                        <div className="flex items-center gap-[4px]">
                          <img alt="" src={Buy} />
                          <div className="flex gap-[4px]">
                            <NumericFormat
                              value={totalAmount}
                              thousandSeparator
                              displayType="text"
                            />
                            <div>TESTATE</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <PieChartComponent
                    size={70}
                    percentage={percentage}
                    radius={50.7}
                  />
                </div>
                <div
                  className="text-center text-white bg-[#5B1DEE] py-[10px] rounded-[16px] hover:shadow-[-1px_6px_10px_0_rgba(93,0,207,0.5)] hover:-translate-y-[3px] cursor-pointer"
                  onClick={() => setMode(0)}
                >
                  View Details
                </div>
              </div>
              <div
                className="text-center text-white bg-[#5B1DEE] py-[10px] rounded-[16px] px-[20px] hover:shadow-[-1px_6px_10px_0_rgba(93,0,207,0.5)] hover:-translate-y-[3px] cursor-pointer"
                onClick={() => {
                  // dispatch(setDashboardMode(2));
                  // dispatch(
                  //   setHeaderMode({
                  //     mode: 4,
                  //     submode: 0,
                  //   })
                  // );
                }}
              >
                View Portfolio
              </div>

              <div className="rounded-[8px] p-[16px] shadow-md flex flex-col items-center w-[500px] space-y-[10px] bg-white">
                <div className="text-[#959595] text-[20px]">
                  Transaction value
                </div>
                <div className="flex items-center gap-[10px] text-[32px]">
                  {/* <img alt=""  src={TESTATE} /> */}
                  <Testate size={30} />

                  <div className="text-[#5B1DEE] p-[4px] rounded-[4px] shadow-md  font-semibold">
                    <NumericFormat
                      value={(nftPrice * nftsToBuy) / 1000000}
                      thousandSeparator
                      displayType="text"
                    />
                  </div>
                  <div className="font-normal">TESTATE</div>
                </div>
                <hr />
                <div className="flex items-center justify-between w-full">
                  <div className="text-[#959595]">Payment date</div>
                  <div>{time}</div>
                </div>
                <div className="flex items-center justify-between w-full">
                  <div className="text-[#959595]">Payment method</div>
                  <div>Wallet</div>
                </div>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-[10px]">
                    <div className="text-[#959595]">My investment Amount</div>
                    {/* <img alt=""  src={Icon} /> */}
                  </div>
                  <div className="flex items-center gap-[10px]">
                    <div>
                      <NumericFormat
                        value={(myNFTs * nftPrice) / 1000000}
                        thousandSeparator
                        displayType="text"
                      />
                    </div>

                    <div className="text-[#959595]">
                      {myPercentage}% ownership
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-[10px]">
                    <div className="text-[#959595]">
                      Total investment amount
                    </div>
                    {/* <img alt=""  src={Icon} /> */}
                  </div>
                  <div className="flex items-center gap-[10px]">
                    <Testate size={20} />

                    <div className="text-[#5B1DEE] font-semibold">
                      <NumericFormat
                        value={totalAmount}
                        thousandSeparator
                        displayType="text"
                      />
                    </div>
                    <div className="font-normal">TESTATE</div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="flex w-full absolute top-0">
              <img alt=""  src={back} className="mx-auto h-[calc(100vh-60px)]" />
            </div> */}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
