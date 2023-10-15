import haversine from 'haversine';

const getNearPlaces = (data, position, radius) => {
  const withDistance = data.map((place) => {
    const start = {
      latitude: position.lat,
      longitude: position.lng,
    };
    const end = {
      latitude: place.lat,
      longitude: place.lng,
    };

    const distance = haversine(start, end, { unit: 'meter' });

    return { ...place, distance };
  });

  return withDistance.filter((place) => place.distance <= radius);
};

export default getNearPlaces;
