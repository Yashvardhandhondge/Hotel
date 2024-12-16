import {
  AccuracyIconReview,
  CommunicationIconReview,
  FavoriteIconRent,
  KeyIconReview,
  LocationIconReview,
  StarIconReview,
  ValueIconReview,
} from "../../AssetComponents/Images";
import ProgressBar from "@ramonak/react-progress-bar";
import { ReviewItem } from "./ReviewItem";
import { BlackButton } from "../Buttons/BlackButton";
import { useState, useEffect } from "react";
import { api } from "../functions/Api";

export const Review = ({ tokenId, reviewData }) => {
  const [countReviews, setCountReviews] = useState(0);
  const [avgRate, setAvgReviews] = useState(0);
  const [avgRates, setAvgRates] = useState({
    cleanliness: 0,
    accuracy: 0,
    checkIn: 0,
    checkOut: 0,
    communication: 0,
    location: 0,
  });
  const [reviews, setReviews] = useState([]);
  const [overallRating, setOverallRating] = useState([]);
  const [showAllFlag, setShowAllFlag] = useState(false);

  const getProfile = async (address) => {
    const res = await api("profile/getProfile", {
      walletAddress: address,
    });
    return res;
  };

  const getReview = async () => {
    const res = await api("review/get", {
      token_id: tokenId,
    });
    // console.log(res);
    if (!res) return;
    setCountReviews(res.length);
    let avgRate = 0;
    let cleanliness = 0,
      accuracy = 0,
      checkIn = 0,
      communication = 0,
      location = 0;
    let reviews = [];
    let overallRating = [0, 0, 0, 0, 0];
    for (let i = 0; i < res.length; i++) {
      avgRate += res[i].rate;
      overallRating[Math.floor(res[i].rate) - 1]++;
      cleanliness += res[i].rates.cleanness;
      accuracy += res[i].rates.accuracy;
      checkIn += res[i].rates.checkIn;
      communication += res[i].rates.communication;
      location += res[i].rates.location;
      reviews.push({
        profile: await getProfile(res[i].renter),
        rate: res[i].rate,
        period: res[i].period,
        review: res[i].publicReview,
        note: res[i].privateNote,
      });
    }
    setOverallRating(overallRating);
    setReviews(reviews);
    setAvgReviews(avgRate / res.length);
    setAvgRates({
      cleanliness: (cleanliness / res.length).toFixed(2),
      accuracy: (accuracy / res.length).toFixed(2),
      checkIn: (checkIn / res.length).toFixed(2),
      communication: (communication / res.length).toFixed(2),
      location: (location / res.length).toFixed(2),
    });
  };

  const setReview = async (res) => {
    // console.log(res);
    if (!res?.length) return;
    setCountReviews(res.length);
    let avgRate = 0;
    let cleanliness = 0,
      accuracy = 0,
      checkIn = 0,
      communication = 0,
      checkOut = 0;
    let reviews = [];
    let overallRating = [0, 0, 0, 0, 0];
    for (let i = 0; i < res.length; i++) {
      avgRate += res[i].rate;
      overallRating[Math.floor(res[i].rate / 1.0)]++;
      cleanliness += res[i].rates.cleanness;
      accuracy += res[i].rates.accuracy;
      checkIn += res[i].rates.checkIn;
      communication += res[i].rates.communication;
      checkOut += res[i].rates.checkOut;
      reviews.push({
        profile: await getProfile(res[i].owner),
        rate: res[i].rate,
        period: res[i].period,
        review: res[i].publicReview,
        note: res[i].privateNote,
      });
    }
    setOverallRating(overallRating);
    setReviews(reviews);
    setAvgReviews(avgRate / res.length);
    setAvgRates({
      cleanliness: cleanliness / res.length,
      accuracy: accuracy / res.length,
      checkIn: checkIn / res.length,
      communication: communication / res.length,
      checkOut: checkOut / res.length,
    });
  };

  useEffect(() => {
    if (tokenId) getReview();
    else {
      setReview(reviewData);
    }
  }, [tokenId, reviewData]);

  return (
    <>
      <div className="p-[16px] rounded-[16px] bg-white space-y-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
        <div className="flex items-center gap-[10px]">
          <FavoriteIconRent />
          <div className="font-semibold">
            {avgRate.toFixed(1)} ({countReviews ? countReviews : "No "} reviews)
          </div>
        </div>
        <div className="grid grid-cols-7 gap-[10px]">
          <div className="px-[4px]">
            <div>Overall rating</div>

            {overallRating
              .slice()
              .reverse()
              .map((item, i) => {
                return (
                  <div
                    className="flex items-center gap-[5px] text-[12px]"
                    key={i}
                  >
                    <div>{5 - i}</div>
                    <ProgressBar
                      isLabelVisible={false}
                      animateOnRender
                      bgColor="#5B1DEE"
                      height="6px"
                      className="w-full"
                      completed={(item / countReviews) * 100}
                    ></ProgressBar>
                  </div>
                );
              })}
          </div>
          <div className="px-[10px] border-l-[1px] border-[#d5d5d5] flex flex-col justify-between">
            <div>
              <div className="w-full truncate">Cleanliness</div>
              <div>{avgRates.cleanliness}</div>
            </div>

            <StarIconReview className="w-[30px]" />
          </div>
          <div className="px-[10px] border-l-[1px] border-[#d5d5d5] flex flex-col justify-between">
            <div>
              <div className="w-full truncate">Accuracy</div>
              <div>{avgRates.accuracy}</div>
            </div>

            <AccuracyIconReview className="w-[30px]" />
          </div>
          <div className="px-[10px] border-l-[1px] border-[#d5d5d5] flex flex-col justify-between">
            <div>
              <div className="w-full truncate">Check-in</div>
              <div>{avgRates.checkIn}</div>
            </div>

            <KeyIconReview className="w-[30px]" />
          </div>
          <div className="px-[10px] border-l-[1px] border-[#d5d5d5] flex flex-col justify-between">
            <div>
              <div className="w-full truncate">Communication</div>
              <div>{avgRates.communication}</div>
            </div>

            <CommunicationIconReview className="w-[30px]" />
          </div>
          <div className="px-[10px] border-l-[1px] border-[#d5d5d5] flex flex-col justify-between">
            <div>
              <div className="w-full truncate">Location</div>
              <div>{avgRates.location}</div>
            </div>

            <LocationIconReview className="w-[30px]" />
          </div>
          <div className="px-[10px] border-l-[1px] border-[#d5d5d5] flex flex-col justify-between">
            <div>
              <div className="w-full truncate">Value</div>
              <div>{avgRate}</div>
            </div>

            <ValueIconReview className="w-[30px]" />
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-2 gap-[20px] mt-3">
        {showAllFlag
          ? reviews.map((item, i) => (
              <div key={i}>
                {" "}
                <ReviewItem review={item} />
              </div>
            ))
          : reviews.slice(-2).map((item, i) => (
              <div key={i}>
                <ReviewItem review={item} />
              </div>
            ))}
      </div>
      {countReviews > 2 && (
        <>
          {showAllFlag ? (
            <div className="w-max mt-3">
              <BlackButton
                text={`Show less`}
                onClick={() => setShowAllFlag(!showAllFlag)}
              />
            </div>
          ) : (
            <div className="w-max mt-3">
              <BlackButton
                text={`Show all ${countReviews} reviews`}
                onClick={() => setShowAllFlag(!showAllFlag)}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};
