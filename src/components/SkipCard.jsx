import { useState } from "react";
import { FiAlertTriangle, FiCheckCircle, FiSlash } from "react-icons/fi";
import { formatPrice } from "../utils/formatPrice";
import { getSkipImage } from "../utils/getSkipImage";
import { SmallSpinner } from "./LoadingSpinner";

export default function SkipCard({ skip, isSelected, onSelect }) {
  const [imgSrc, setImgSrc] = useState(getSkipImage(skip.size));
  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <div
      onClick={() => onSelect(skip.id)}
      onKeyDown={(e) => e.key === "Enter" && onSelect(skip.id)}
      className={`
      skip-card        
        bg-gradient-to-br from-blue-50 to-cyan-50 border border-gray-100
        focus:outline-none focus:ring-2 focus:ring-cyan-400
        group overflow-hidden
        w-full h-full
        flex flex-col
        shadow-md hover:shadow-xl
        transform hover:-translate-y-1 hover:scale-[1.02]
        ${isSelected ? "ring-2 ring-green-500" : ""}
      `}
      role="button"
      aria-pressed={isSelected}
      tabIndex={0}>
      {/* img Container */}
      <div className="relative w-full aspect-[5/3] overflow-hidden bg-gradient-to-br from-blue-100 to-cyan-100">
        {isImageLoading && <SmallSpinner />}

        {/* Road Placement Banner */}
        {!skip.allowed_on_road && (
          <div
            className="absolute top-2 left-2 bg-amber-600 text-white py-1 px-3 rounded-md text-xs font-bold flex items-center gap-1 shadow-sm"
            aria-label="This skip cannot be placed on the road">
            <FiAlertTriangle size={12} />
            <span>ROAD USE PROHIBITED</span>
          </div>
        )}

        <img
          src={imgSrc}
          alt={`${skip.size} yard skip container`}
          loading="lazy"
          onLoad={() => setIsImageLoading(false)}
          onError={() =>
            setImgSrc(
              new URL(`../assets/images/skips/default.jpg`, import.meta.url)
                .href
            )
          }
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isImageLoading ? "opacity-0" : "opacity-100"
          }`}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="bg-black/10 text-white text-lg font-bold px-4 py-1 rounded">
            {skip.size} yd<sup>3</sup>
          </span>
        </div>

        {/* Heavy Waste Indicator */}
        {!skip.allows_heavy_waste && (
          <div
            className="absolute bottom-2 right-2 bg-amber-600/90 text-white px-3 py-1 rounded-md text-xs font-bold flex items-center gap-1 shadow-sm"
            aria-label="Allows heavy waste">
            <FiSlash size={12} />
            <span>NO HEAVY WASTE</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-grow bg-white/80 backdrop-blur-sm">
        <div className="mb-3">
          <h2 className="text-lg font-bold text-yellow-800">
            {skip.size} YARD Skip
          </h2>
        </div>

        <div className="mt-auto flex justify-between items-center">
          <p className="text-xl  font-bold text-gray-900">
            {formatPrice(skip.price_before_vat)}
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(skip.id);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.stopPropagation();
                onSelect(skip.id);
              }
            }}
            className={`
              bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2 px-4 rounded-md font-medium text-sm
              transition-all duration-200 shadow-sm
              ${
                isSelected
                  ? "opacity-100 ring-2 ring-blue-400"
                  : "opacity-0 group-hover:opacity-100"
              }
              hover:shadow-md focus:shadow-md
              focus:outline-none focus:ring-2 focus:ring-blue-400
              transform group-hover:translate-y-0 translate-y-1
            `}
            aria-label={`Select ${skip.size} yard skip for £${skip.price_before_vat}`}>
            {isSelected ? "Selected" : "Select"}
          </button>
        </div>
        <p className="text-sm text-gray-600">
          <span className="sr-only">Hire period:</span>
          {skip.hire_period_days} day hire period
        </p>
      </div>

      {/* Selected Indicator */}
      {isSelected && (
        <div
          className="absolute top-2 right-2 bg-gradient-to-r from-green-500 to-cyan-500 text-white px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1 shadow-sm"
          aria-hidden="true">
          <FiCheckCircle size={12} />
          <span>SELECTED</span>
        </div>
      )}
    </div>
  );
}
