import React from 'react';

const FiverrWidget = () => {
  return (
    <div className="z-10 fixed bottom-4 right-4 pr-4 bg-white rounded-full border-2 border-green-500 shadow-lg animate-pulse">
      <div className="flex items-center space-x-2">
        <div className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xmlnsSvgjs="http://svgjs.com/svgjs"
            width="34"
            height="34"
            viewBox="0 0 512 512"
            style={{ enableBackground: 'new 0 0 512 512' }}
            xmlSpace="preserve"
            className="w-6 h-6 text-white fill-current"
          >
            <g>
              <path
                d="M432 416V160H176v-16c0-26.464 21.536-48 48-48h48V0h-48C144.608 0 80 64.608 80 144v16H16v96h64v160H16v96h224v-96h-64V256h160.896v160H272v96h224v-96h-64z"
                fill="currentColor"
                data-original="#000000"
                className=""
              ></path>
              <circle
                cx="384"
                cy="48"
                r="48"
                fill="currentColor"
                data-original="#000000"
                className=""
              ></circle>
            </g>
          </svg>
        </div>
        <div className="leading-tight">
          <p className="text-lg font-heading text-green-500 m-0 font-semibold">Top Rated Seller</p>
          <p className="text-xs text-gray-500 m-0">530+ Votes <span className="text-yellow-400">&#9733;&#9733;&#9733;&#9733;&#9733;</span></p>
        </div>
      </div>
    </div>
  );
};

export default FiverrWidget;
