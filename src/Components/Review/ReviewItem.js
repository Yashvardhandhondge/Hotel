import { useState } from "react";
import { StarRatingCompo } from "../../Components/StarRating/StarRatingCompo";
import { truncateWalletAddress } from "../functions/Functions";

export const ReviewItem = ({ review }) => {
  const [expanded, setExpanded] = useState(false);

  const calculateDiffDates = (date) => {
    // const time = await getCurrentUTCTime();
    const diffSec = Math.floor(new Date().getTime() / 1000) - date;
    if (Math.round(diffSec / 86400) > 0)
      return Math.round(diffSec / 86400) + " days ago";
    else return "Today";
  };

  return (
    <div className="space-y-[10px] h-max bg-white rounded-[16px] p-[16px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
      <div className="flex items-center gap-[10px]">
        <img
          alt="avatar"
          src={review.profile.Avatar}
          className="w-[40px] rounded-full shadow-[-2px_-2px_6px_0px_rgba(253,255,255,0.8),2px_2px_6px_0px_rgba(187,195,206,0.6)]"
        />
        <div>
          <div>{review.profile.Name?.replace("/", " ")}</div>
          <div className="font-normal">
            {truncateWalletAddress(review.profile.walletAddress)}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-[10px]">
        <StarRatingCompo rating={review.rate} fixed />
        <div className="text-[#959595]">
          {calculateDiffDates(review.period[0])}
        </div>
      </div>
      <div
        className={
          expanded
            ? "text-[#959595] font-normal h-max"
            : "text-[#959595] font-normal h-[30px] overflow-hidden"
        }
      >
        {review.review ? review.review : ""}
      </div>
      <div
        className="underline text-[#5b1dee] cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        Show {expanded ? "less" : "more"}
      </div>
    </div>
  );
};
