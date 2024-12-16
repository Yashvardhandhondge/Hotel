const service = new window.google.maps.places.AutocompleteService();

export const getPredictionsGoogleMap = async (input) => {
  console.log(input);
  service.getPlacePredictions({ input: input }, function (predictions, status) {
    if (
      status !== window.google.maps.places.PlacesServiceStatus.OK ||
      !predictions
    ) {
      console.log("dddddddddddddddddddddd");
      return;
    }
    return predictions;
  });
};
