import StarRatings from "react-star-ratings";

export const StarRatingCompo = ({
  numberOfStars = 5,
  rating = 0,
  onChange = () => {},
  fixed,
}) => {
  return fixed ? (
    <StarRatings
      rating={rating}
      starRatedColor="#F8BC30"
      starDimension="30px"
      svgIconViewBox="0 0 30 30"
      starSpacing="0px"
      svgIconPath="M15.9925 23.6903L21.3405 26.501C22.3818 27.0477 23.5978 26.1637 23.3991 25.005L22.3778 19.0503L26.7058 14.8357C27.5485 14.0143 27.0845 12.5837 25.9191 12.4143L19.9405 11.545L17.2671 6.12498C16.7471 5.07032 15.2418 5.07032 14.7218 6.12498L12.0471 11.545L6.06847 12.4143C4.90447 12.5837 4.43913 14.0143 5.2818 14.8357L9.6098 19.0503L8.58847 25.005C8.3898 26.1637 9.6058 27.049 10.6471 26.501L15.9951 23.6903H15.9925Z"
    />
  ) : (
    <StarRatings
      numberOfStars={numberOfStars}
      rating={rating}
      changeRating={(value) => onChange(value)}
      name="Cleanness"
      starRatedColor="#F8BC30"
      starHoverColor="#F8BC30"
      starDimension="30px"
      starSpacing="0px"
      svgIconViewBox="0 0 30 30"
      svgIconPath="M15.9925 23.6903L21.3405 26.501C22.3818 27.0477 23.5978 26.1637 23.3991 25.005L22.3778 19.0503L26.7058 14.8357C27.5485 14.0143 27.0845 12.5837 25.9191 12.4143L19.9405 11.545L17.2671 6.12498C16.7471 5.07032 15.2418 5.07032 14.7218 6.12498L12.0471 11.545L6.06847 12.4143C4.90447 12.5837 4.43913 14.0143 5.2818 14.8357L9.6098 19.0503L8.58847 25.005C8.3898 26.1637 9.6058 27.049 10.6471 26.501L15.9951 23.6903H15.9925Z"
    />
  );
};
