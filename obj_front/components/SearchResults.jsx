'use client';

import React, { useState } from 'react';
import SearchedList from './SearchedList';

const SearchResults = ({ markers, setInfo, setIsListOpen }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [markersPerPage, setMarkersPerPage] = useState(5);

  const indexOfLastMarker = currentPage * markersPerPage;
  const indexOfFirstMarker = indexOfLastMarker - markersPerPage;
  const currentMarkers = markers.slice(indexOfFirstMarker, indexOfLastMarker);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="divide w-full divide-y divide-mint">
      {currentMarkers.map((marker) => (
        <SearchedList
          key={`marker-${marker.place_name}-${marker.position.lat},${marker.position.lng}`}
          code={marker.category_group_code}
          roadAddress={marker.road_address_name}
          address={marker.address_name}
          name={marker.place_name}
          lat={marker.y}
          lng={marker.x}
          onMouseOver={() => setInfo(marker)}
          onMouseOut={() => setInfo()}
        />
      ))}

      <div className="flex w-full items-center justify-between">
        {Array(Math.ceil(markers.length / markersPerPage))
          .fill('')
          .map((_, index) => {
            const pageNumber = index + 1;

            return (
              <button
                key={`page-${pageNumber}-${index}`}
                onClick={() => handlePaginationClick(pageNumber)}
                className={`basis-1/4 rounded text-gray hover:bg-mint ${
                  currentPage === pageNumber ? 'bg-mint-em text-white' : ''
                }`}
              >
                {pageNumber}
              </button>
            );
          })}
        {!!markers.length && (
          <button
            onClick={() => setIsListOpen(false)}
            className="basis-1/4 rounded border border-gray text-gray hover:border-mint/80 "
          >
            X
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
