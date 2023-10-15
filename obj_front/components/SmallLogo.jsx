import React from 'react';
import Image from 'next/image';

const SmallLogo = () => {
  return (
    <div className="flex items-center justify-start font-bold">
      <span className="pl-3 text-mint">Mark</span>er
      <Image src="/img/marker.png" alt="marker" width={15} height={15} />
    </div>
  );
};

export default SmallLogo;
