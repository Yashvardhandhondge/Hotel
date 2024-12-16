import { useParams } from "react-router-dom";
import { CalenderIcon, HomeIcon, NUSDIcon } from "../../AssetComponents/Images";
import { Toggle } from "../../Components/Toggle/Toggle";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-responsive-modal";
import { useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import addDays from "date-fns/addDays";
import { setReservationPeriod } from "../../ReduxSlices/ReservationSlice";
import { BlackButton } from "../Buttons/BlackButton";
import { PurpleButton } from "../Buttons/PurpleButton";
import { Mainnet } from "@nibiruchain/nibijs";
import { updateToken } from "../functions/Functions";

export const PickDate = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.nft.nfts[params.id]);

  const mainnet = Mainnet();
  const getToken = async () => {
    if (!token)
      await updateToken(
        {
          token_id: params.id,
          contract: process.env.REACT_APP_RENTAL_SMART_CONTRACT,
        },
        mainnet.endptTm,
        dispatch
      );
  };

  useEffect(() => {
    getToken();
  }, []);

  const reservation_period = useSelector((state) => state.reservation.period);
  const [disabledDates, setDisabledDates] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [firstDay, setFirstDay] = useState();
  const diffToUTC = useSelector((state) => state.time.diffToUTC);
  const defaultPeriod = [
    {
      startDate: reservation_period.start
        ? new Date(reservation_period.start * 1000)
        : new Date(),
      endDate: reservation_period.end
        ? new Date(reservation_period.end * 1000)
        : new Date(),
      key: "selection",
      color: "#5b1deeaa",
    },
  ];

  const setFirstAvailableDay = () => {
    const today = new Date();
    if (disabledDates.length === 0) return today;
    for (let i = 0; i < 10000; i++) {
      if (addDays(today, i + 1) < disabledDates[0]) return addDays(today, i);
      for (let j = 0; j < disabledDates.length - 1; j++) {
        if (
          disabledDates[j] < addDays(today, i) &&
          addDays(today, i + 1) < disabledDates[j + 1]
        )
          return addDays(today, i + 1);
      }
      if (addDays(today, i) > disabledDates[disabledDates.length - 1])
        return addDays(today, i);
    }
  };

  const setRangeFromStartToEnd = (start, end) => {
    const range = [];
    range.push(new Date(start));
    let diff = 1;
    while (addDays(new Date(start), diff) <= new Date(end)) {
      range.push(addDays(new Date(start), diff));
      diff++;
    }
    return range;
  };

  const getDisabledDays = async () => {
    let disabledDays = [];
    for (let i = 0; i < token?.rentals.rentals.length; i++) {
      disabledDays = disabledDays.concat(
        setRangeFromStartToEnd(
          (token.rentals.rentals[i].renting_period[0] - diffToUTC) * 1000,
          (token.rentals.rentals[i].renting_period[1] - diffToUTC) * 1000
        )
      );
    }
    setDisabledDates(disabledDays);
  };

  useEffect(() => {
    getDisabledDays();
  }, [token]);

  useEffect(() => {
    setFirstDay(setFirstAvailableDay());
  }, [disabledDates]);

  const [period, setPeriod] = useState(defaultPeriod);

  useEffect(() => {
    dispatch(
      setReservationPeriod({
        start: Math.floor(new Date(period[0].startDate).getTime() / 1000),
        end: Math.floor(new Date(period[0].endDate).getTime() / 1000),
      })
    );
  }, [period]);

  return (
    <>
      <div className="flex items-start justify-between">
        <div>
          <div className="font-semibold">Price</div>
          <div className="flex items-center gap-[8px]">
            <NUSDIcon />
            <div className="text-[#5b1dee] text-[20px]">
              {token?.short?.price_per_day}
            </div>
            <div>USDC</div>
            <div className="text-[#959595]">/night</div>
          </div>
        </div>
        <div className="space-y-[4px]">
          <div className="p-[6px] w-max rounded-full shadow-[-2px_-2px_6px_0px_rgba(253,255,255,0.80),2px_2px_6px_0px_rgba(187,195,206,0.60)]">
            <HomeIcon />
          </div>
          <div className="font-semibold">Available from</div>
          <div className="font-normal">
            {firstDay?.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="space-y-[10px] flex flex-col items-end">
          <div className="flex items-center gap-[10px] cursor-not-allowed">
            <div className="font-semibold">Auto approval</div>
            <Toggle status={token?.short.auto_approve} />
          </div>
          <div className="text-right">
            {token?.short.auto_approve
              ? "Your rental will be activated immediately once you make reservation"
              : "Your rental will be activated once host approve your reservation"}
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-[20px] w-full">
        <div className="w-full space-y-[10px]">
          <div className="font-semibold">Check in</div>
          <div
            onClick={() => setShowModal(true)}
            className="cursor-pointer hover:bg-[#f6f6f6] px-[12px] flex justify-between text-[#5b1dee] w-full py-[14px] rounded-[16px] bg-white shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
          >
            <div>
              {new Date(period[0]?.startDate)?.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
            <CalenderIcon />
          </div>
        </div>
        <div className="w-full space-y-[10px]">
          <div className="font-semibold">Check out</div>
          <div
            onClick={() => setShowModal(true)}
            className="cursor-pointer hover:bg-[#f6f6f6] px-[12px] flex justify-between text-[#5b1dee] w-full py-[14px] rounded-[16px] bg-white shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
          >
            <div>
              {new Date(period[0].endDate)?.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
            <CalenderIcon />
          </div>
        </div>
      </div>

      <Modal
        open={showModal}
        center
        onClose={() => setShowModal(false)}
        classNames={{
          modal:
            "min-w-[300px] min-h-[200px] rounded-[8px] border-[1px] border-[#E3E3E3] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]",
        }}
      >
        <div>
          <DateRangePicker
            onChange={(item) => setPeriod([item.selection])}
            months={2}
            ranges={period}
            disabledDates={disabledDates}
            direction="horizontal"
            minDate={new Date()}
            color="#5b1dee"
            startDatePlaceholder="Check In"
            endDatePlaceholder="Check Out"
            className="mt-[40px]"
          />
          <div className="w-full flex justify-end">
            {/* <BlackButton text="Cancel" /> */}
            <PurpleButton text="Confirm" onClick={() => setShowModal(false)} />
          </div>
        </div>
      </Modal>
    </>
  );
};
