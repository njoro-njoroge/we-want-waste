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
      <div className="image-container">
        {isImageLoading && <SmallSpinner />}

        {/* Road Placement Banner */}
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
          className={`skip-card-image ${
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
          <div className="heavy-waste-banner" aria-label="Allows heavy waste">
            <FiSlash size={12} />
            <span>NO HEAVY WASTE</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="skip-card-content">
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
              select-skip-btn
              ${
                isSelected
                  ? "opacity-100 ring-2 ring-blue-400"
                  : "opacity-0 group-hover:opacity-100"
              }
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
          className="selected-banner "
          aria-hidden="true">
          <FiCheckCircle size={12} />
          <span>SELECTED</span>
        </div>
      )}
    </div>
  );
}
