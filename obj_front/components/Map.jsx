'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import SearchIcon from '@/components/svg/SearchIcon';
import SearchResults from './SearchResults';
import useInput from '@/hooks/useInput';
import addBookmarkPlace from '@/utils/addBookmarkPlace';
import SmallLogo from './SmallLogo';
import Overlay from '@/components/Overlay';
import useCurrentUser from '@/hooks/useCurrentUser';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import getNearPlaces from '@/utils/getNearPlaces';

import Stations from '@/utils/Stations';
import { hangulIncludes } from '@toss/hangul';
import PlaceModal from './modal/placeModal';

const KakaoMap = () => {
  const router = useRouter();
  const { userData, isLoading } = useCurrentUser();
  const mapRef = useRef();

  const [mapCenter, setMapCenter] = useState({
    // 지도의 초기 위치
    center: { lat: 37.555677404758484, lng: 126.97167262147268 },
    // 지도 위치 변경시 panto를 이용할지에 대해서 정의
    isPanto: false,
  });

  const [Maplevel, setMapLevel] = useState(5);
  const [markers, setMarkers] = useState([]);
  const [isMyBookmark, setIsMyBookmark] = useState(false);
  const [nearPlaces, setNearPlaces] = useState([]);

  const getMyBookmark = async () =>
    await axios
      .get(`${process.env.NEXT_PUBLIC_SERVER}/place`, {
        headers: {
          'Content-Type': 'application/json',
          token: `${Cookies.get('token')}`,
        },
        params: {
          userid: userData || Cookies.get('userid'),
        },
        withCredentials: true,
      })
      .then((res) => res?.data?.Places || [])
      .then((places) => {
        console.log(places);
        setMydata([...places]);
      })
      .catch((err) => {
        console.log(err.statusText);
      });

  const myBookmarkMode = async () => {
    if (isMyBookmark) return;
    await getMyBookmark()
      .then(() => {
        return myData.map((bookmark) => {
          return {
            position: {
              lat: bookmark.lat,
              lng: bookmark.lng,
            },
            content: bookmark.place_name,
            ...bookmark,
          };
        });
      })
      .then((bookmarks) => {
        console.log(bookmarks);
        setMarkers(bookmarks);
        setIsMyBookmark(true);
      });
  };

  const bookmarkMode = () => {
    if (!isMyBookmark) return;
    setIsMyBookmark(false);
    setChosenStation();
    setMapCenter({
      // 지도의 초기 위치
      center: { lat: 37.555677404758484, lng: 126.97167262147268 },
      // 지도 위치 변경시 panto를 이용할지에 대해서 정의
      isPanto: false,
    });
    setMarkers([]);
  };

  const [chosenStation, setChosenStation] = useState();
  const [stationInput, setStationInput] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [hasPlace, setHasPlace] = useState('등록하기!');

  const showModal = () => {
    setHasPlace('등록하기!');

    setModalVisible(true);
  };

  const closeModal = () => {
    setHasPlace('등록하기!');
    setModalVisible(false);
  };

  const handleInput = (event) => {
    setStationInput(event.target.value);

    const filteredStations = Stations.filter((station) => {
      return hangulIncludes(station.name, stationInput);
    });

    const recommendationList = filteredStations.map((station) => station);
    setRecommendations(recommendationList);
  };

  const [info, setInfo] = useState();
  const [keyword, onChangeKeyword] = useInput('');
  const [isListOpen, setIsListOpen] = useState(true);

  const [myData, setMydata] = useState([]);

  useEffect(() => {
    if (!userData) return;
    getMyBookmark();
  }, [userData]);

  const searchPlace = (e) => {
    e.preventDefault();
    setIsListOpen(true);

    const { kakao } = window;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(keyword, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();

        const searched = data.map((place) => {
          bounds.extend(new kakao.maps.LatLng(place.y, place.x));
          return {
            position: {
              lat: place.y,
              lng: place.x,
            },
            content: place.place_name,
            ...place,
          };
        });

        setMarkers(searched);
        mapRef.current.setBounds(bounds);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      }
    });
  };

  useEffect(() => {
    if (!isLoading && !userData) return router.push('/user/login');
  }, []);

  return (
    <>
      <div className="flex h-[10vh] w-screen items-center">
        <div className="ml-2 rounded border border-mint bg-white">
          <div className="grid grid-cols-4 divide-x divide-dashed divide-mint text-center">
            <button
              className={`px-1 ${isMyBookmark ? 'bg-mint/80' : ''}`}
              onClick={myBookmarkMode}
            >
              <p>나의 북마크</p>
            </button>
            <button
              className={`px-1 ${isMyBookmark ? '' : 'bg-mint/80'}`}
              onClick={bookmarkMode}
            >
              <p>북마크하기</p>
            </button>
            <Link href="/place/rank">
              <button className="px-1">핫플레이스</button>
            </Link>
            <Link
              href={`/user/${!!userData ? userData : ''}`}
              className={`${!!userData ? '' : 'hidden'}`}
            >
              <button className={`px-1 ${!!userData ? '' : 'hidden'}`}>
                마이페이지
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex h-[80vh] w-screen">
        <div className="relative h-full w-full">
          <Map
            ref={mapRef}
            center={mapCenter.center}
            isPanto={mapCenter.isPanto}
            style={{ width: '100%', height: '100%' }}
            level={Maplevel}
            draggable={true}
          >
            <div className="absolute left-2 top-2 z-10 h-1/2 w-2/5 md:w-1/2">
              <div className="w-full rounded-lg border border-mint/60 bg-white/90 lg:w-1/2">
                <SmallLogo />
                {isMyBookmark ? (
                  <div className="mx-auto flex flex-col">
                    <input
                      placeholder="지하철 역 입력!"
                      spellCheck={false}
                      type="text"
                      value={stationInput}
                      onChange={(e) => handleInput(e)}
                      className="border-b-1 w-full border-b border-gray/30 bg-white/50 px-3 outline-none"
                    />
                    <div className="devide flex flex-col divide-y">
                      {!!stationInput &&
                        !!recommendations.length &&
                        recommendations
                          .slice(0, 10)
                          .map((recommendation, index) => (
                            <button
                              key={
                                recommendation.name +
                                recommendation.lane +
                                recommendation.lat +
                                recommendation.lng
                              }
                              className="py-2"
                              onClick={() => {
                                setChosenStation(recommendation);

                                setNearPlaces(
                                  getNearPlaces(
                                    markers,
                                    recommendation.position,
                                    1500
                                  )
                                );
                                setStationInput('');
                                setRecommendations([]);

                                const moveLatLon = new kakao.maps.LatLng(
                                  recommendation.position.lat,
                                  recommendation.position.lng
                                );
                                mapRef.current.setLevel(4);
                                mapRef.current.setCenter(moveLatLon);
                              }}
                            >
                              <div className="flex justify-start">
                                <h3 className="ml-3 w-1/3 font-bold">
                                  {recommendation.name}
                                </h3>
                                <p className="text-mint-em">
                                  {recommendation.lane}
                                </p>
                              </div>
                            </button>
                          ))}
                    </div>
                  </div>
                ) : (
                  <form
                    className={`${
                      !!markers.length && 'border-b'
                    } mx-auto flex items-center justify-around py-2`}
                    onSubmit={(e) => searchPlace(e, keyword)}
                  >
                    <input
                      type="text"
                      spellCheck={false}
                      value={keyword}
                      onChange={onChangeKeyword}
                      id="keyword"
                      className="border-b-1 mx-1 w-3/4 border-b border-gray/30 bg-white/50 px-1 outline-none"
                    />
                    <button
                      className="mx-1 flex w-1/5 items-center justify-center rounded border border-mint-em px-1 text-mint-em"
                      type="submit"
                    >
                      <SearchIcon />
                    </button>
                  </form>
                )}

                {isListOpen && !isMyBookmark && (
                  <SearchResults
                    markers={markers}
                    setInfo={setInfo}
                    setIsListOpen={setIsListOpen}
                  />
                )}
              </div>
            </div>
            {chosenStation && (
              <>
                <MapMarker
                  key={`marker-${chosenStation.position.lat},${chosenStation.position.lng}`}
                  position={chosenStation.position}
                  image={{
                    src: '/img/standardmarker.png',
                    size: {
                      width: 40,
                      height: 40,
                    },
                  }}
                />
                <div className="absolute bottom-20 h-1/5 w-full md:bottom-5">
                  <Overlay nearPlaces={nearPlaces} setInfo={setInfo} />
                </div>
              </>
            )}

            {markers.map((marker) => (
              <MapMarker
                key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
                position={marker.position}
                image={{
                  src: '/img/marker.png',
                  size: {
                    width: 40,
                    height: 40,
                  },
                }}
                onClick={() => setInfo(marker)}
                onMouseOver={() => setInfo(marker)}
                onMouseOut={() => setInfo()}
              />
            ))}
            {markers.map(
              (marker) =>
                info &&
                info.address_name === marker.address_name &&
                info.content === marker.content && (
                  <CustomOverlayMap
                    key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
                    zIndex={20}
                    position={marker.position}
                    yAnchor={1.5}
                  >
                    <div className="px-auto my-1 flex flex-col rounded border border-mint-em bg-white py-2 text-center">
                      <h3 className="mx-auto p-2">{marker.content}</h3>
                      {!isMyBookmark && (
                        <div>
                          <button
                            className="mx-auto content-center rounded border border-mint px-2 py-1 text-mint md:hidden"
                            onClick={showModal}
                          >
                            등록하기
                          </button>
                        </div>
                      )}
                    </div>
                  </CustomOverlayMap>
                )
            )}
            {markers.map(
              (marker) =>
                modalVisible && (
                  <PlaceModal
                    hasPlace={hasPlace}
                    roadAddress={marker.roadAddress}
                    closeModal={closeModal}
                    name={marker.content}
                    onClick={() =>
                      addBookmarkPlace(
                        marker.category_group_code,
                        marker.content,
                        marker.road_address_name,
                        marker.address_name,
                        marker.y,
                        marker.x,
                        setHasPlace
                      )
                    }
                  />
                )
            )}
          </Map>
        </div>
      </div>
    </>
  );
};

export default KakaoMap;
