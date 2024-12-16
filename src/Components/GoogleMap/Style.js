export const mapStyles = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [
      {
        visibility: "off", // Hide the Points of Interest (POI) labels
      },
    ],
  },

  {
    featureType: "landscape.natural",
    stylers: [{ color: "#AFF0C0" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#B3BAC7" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [{ color: "#CED1DB" }],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off", // Hide the Points of Interest (POI) labels
      },
    ],
  },
  {
    featureType: "landscape.man_made",
    elementType: "labels.text.fill",
    stylers: [{ color: "#A4A4A4" }],
  },
  {
    featureType: "water",
    stylers: [{ color: "#84E9FF" }],
  },
];
