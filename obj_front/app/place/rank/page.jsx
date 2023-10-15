'use client';
import React, { useEffect, useState } from 'react';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';

import useCurrentUser from '@/hooks/useCurrentUser';

import axios from 'axios';
import Cookies from 'js-cookie';
import Pagination from 'react-js-pagination';

import PlaceList from '@/components/PlaceList';
import { useRouter } from 'next/navigation';

const page = () => {
  const { userData, isLoading } = useCurrentUser();
  const router = useRouter();

  const [hotPlaces, setHotPlaces] = useState([]);
  const [mapCenter, setMapCenter] = useState({
    lat: 37.555677404758484,
    lng: 126.97167262147268,
  });
  const [markerLocation, setMarkerLocation] = useState();
  const [selectedPlace, setSelectedPlace] = useState('');

  const [page, setPage] = useState(1);
  const [items, setItems] = useState(7);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER}/place/rank`, {
        headers: {
          'Content-Type': 'application/json',
          token: `${Cookies.get('token')}`,
        },
        params: {
          userid: userData || Cookies.get('userid'),
        },
        withCredentials: true,
      })
      .then((res) => res.data)
      .then((data) => setHotPlaces(data))
      .catch((err) => {
        console.error(err);
        if (!userData) return router.push('/user/login');

        return router.push('/');
      });
  }, []);

  useEffect(() => {
    if (!isLoading && !userData) return router.push('/user/login');
  });

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <div className="h-[90vh] w-full overflow-x-hidden">
      <div className="flex h-full w-full items-start">
        <div className="mx-auto mt-10 flex w-11/12 flex-col items-center justify-start">
          {hotPlaces
            .slice(items * (page - 1), items * (page - 1) + items)
            .map((place) => (
              <PlaceList
                key={place.place_name}
                name={place.place_name}
                address={place.address}
                roadAddress={place.roadAddress}
                lat={place.lat}
                lng={place.lng}
                cnt={place.cnt}
                onClick={() => {
                  setMapCenter({ lat: place.lat, lng: place.lng });
                  setMarkerLocation({ lat: place.lat, lng: place.lng });
                  setSelectedPlace({
                    name: place.place_name,
                    address: place.roadAddress,
                  });
                }}
              />
            ))}

          {hotPlaces.length > 7 && (
            <Pagination
              activePage={page}
              itemsCountPerPage={items}
              totalItemsCount={hotPlaces.length}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
              innerClass="flex w-full justify-around"
              activeClass="bg-mint/80"
              itemClass="px-2 rounded-md"
            ></Pagination>
          )}
        </div>

        <div className="mt-10 hidden h-[90vh] w-full md:block">
          <Map
            center={mapCenter}
            style={{ width: '100%', height: '100%' }}
            level={5}
          >
            {markerLocation && (
              <>
                <MapMarker
                  position={markerLocation}
                  image={{
                    src: '/img/marker.png',
                    size: {
                      width: 40,
                      height: 40,
                    },
                  }}
                />
                <CustomOverlayMap
                  zIndex={30}
                  position={markerLocation}
                  yAnchor={1.5}
                >
                  <div className="rounded border border-mint-em bg-white px-2 py-2 text-center">
                    <div className="flex flex-col">
                      <h2 className="text-extrabold">{selectedPlace.name}</h2>
                      <p>{selectedPlace.address}</p>
                    </div>
                  </div>
                </CustomOverlayMap>
              </>
            )}
          </Map>
        </div>
      </div>
    </div>
  );
};

export default page;
