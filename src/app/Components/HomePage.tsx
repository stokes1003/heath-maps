'use client';

import GoogleMaps from './GoogleMaps';
import Header from './Header';

const HomePage = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col p-4">
        <div className="text-center">
          <h1 className="text-orange-500 font-bold text-4xl">Heath Maps</h1>
          <p>Find your favorite toffee at stores near you.</p>
        </div>

        <div className="flex flex-col gap-2 p-4">
          <GoogleMaps />
        </div>
      </div>
    </>
  );
};

export default HomePage;
