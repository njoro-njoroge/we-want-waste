import { useState } from "react";
import { FiAlertTriangle, FiCheckCircle, FiSlash } from "react-icons/fi";
import { formatPrice } from "../utils/formatPrice";
import { getSkipImage } from "../utils/getSkipImage";
import { SmallSpinner } from "./LoadingSpinner";

export default function SkipListCard({ skip, isSelected, onSelect }) {
  const [imgSrc, setImgSrc] = useState(getSkipImage(skip.size));
  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <div
      onClick={() => onSelect(skip.id)}
      onKeyDown={(e) => e.key === "Enter" && onSelect(skip.id)}
      className={`
  skip-card-list
  bg-white border border-gray-200
  focus:outline-none focus:ring-2 focus:ring-cyan-400
  group overflow-hidden
  w-full flex flex-row
  shadow-sm hover:shadow-md
  hover:-translate-y-0.5 hover:scale-[1.005]
  ${isSelected ? "ring-2 ring-green-500" : ""}
`}
      role="button"
      aria-pressed={isSelected}
      tabIndex={0}>
      {/* Image Left */}
      <div className="image-container-list">
        {isImageLoading && <SmallSpinner />}

        {!skip.allowed_on_road && (
          <div
            className="road-placement-banner"
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
          className={`skip-card-image-list rounded-md mb-2 ${
            isImageLoading ? "opacity-0" : "opacity-100"
          }`}
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="bg-black/10 text-white text-lg font-bold px-4 py-1 rounded">
            {skip.size} yd<sup>3</sup>
          </span>
        </div>

        {!skip.allows_heavy_waste && (
          <div
            className="heavy-waste-banner-list "
            aria-label="Does not allow heavy waste">
            <FiSlash size={12} />
            <span>NO HEAVY WASTE</span>
          </div>
        )}
      </div>

      {/* Content Right */}
      <div className="skip-card-content-list">
        <div className="h-full flex flex-col justify-center items-start ">
          <h2 className=" font-semibold text-yellow-800">
            {skip.size} YARD Skip
          </h2>
          <p className="text-md text-gray-600">
            {skip.hire_period_days} day hire period
          </p>
          <p className="text-base font-bold text-gray-900">
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
    w-full mt-5
    text-white font-semibold
    bg-gradient-to-r bg-blue-500 
    border border-yellow-600
   
    rounded-md
    hover:from-blue-400 hover:to-blue-600
    transition-all duration-200
    shadow-sm
  `}
            aria-label={`Select ${skip.size} yard skip for £${skip.price_before_vat}`}>
            {isSelected ? "Selected" : "Select"}
          </button>
        </div>
      </div>

      {/* Selected Indicator */}
      {isSelected && (
        <div className="selected-banner " aria-hidden="true">
          <FiCheckCircle size={12} />
          <span>SELECTED</span>
        </div>
      )}
    </div>
  );
}
