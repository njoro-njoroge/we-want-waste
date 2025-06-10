import { useState } from "react";
import { FiAlertTriangle, FiCheckCircle, FiSlash } from "react-icons/fi";
import { formatPrice } from "../utils/formatPrice";
export default function SkipCard({ skip, isSelected, onSelect }) {
  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <div
      onClick={() => onSelect(skip.id)}
      onKeyDown={(e) => e.key === "Enter" && onSelect(skip.id)}
      className={`
        relative rounded-2xl p-1 transition-all duration-300 
        cursor-pointer transform hover:scale-[1.02] focus:scale-[1.02]
        ${isSelected ? "ring-4 ring-blue-500 shadow-xl" : "shadow-md"}
        bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600
        focus:outline-none focus:ring-4 focus:ring-yellow-400
        group overflow-hidden
        w-full h-full
      `}
      role="button"
      aria-pressed={isSelected}
      tabIndex={0}>
      {/* Image Container with Loading State */}
      <div className="relative w-full aspect-video rounded-lg mb-3 overflow-hidden bg-gray-200">
        {isImageLoading && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            aria-hidden="true">
            <div
              className="w-8 h-8 border-4 border-white/80 border-t-transparent rounded-full animate-spin"
              role="status"
            />
          </div>
        )}

        {/* Road Placement Banner (Top of Image) */}
        {!skip.allowed_on_road && (
          <div
            className="absolute top-0 left-0 right-0 bg-red-500/90 text-white text-center py-1 px-2 text-xs font-bold flex items-center justify-center gap-1"
            aria-label="This skip cannot be placed on the road">
            <FiAlertTriangle className="inline" size={14} />
            <span>NOT ALLOWED ON ROAD</span>
          </div>
        )}

        <img
          src={`https://placehold.co/600x400/4F46E5/FFFFFF?text=${skip.size}Yard`}
          alt={`${skip.size} yard skip container`}
          loading="lazy"
          onLoad={() => setIsImageLoading(false)}
          className={`w-[450] h-[50] object-cover transition-opacity duration-300 ${
            isImageLoading ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Heavy Waste Indicator (Bottom of Image) */}
        {!skip.allows_heavy_waste && (
          <div
            className="absolute bottom-2 right-2 bg-red-500/40 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1"
            aria-label="Allows heavy waste">
            <FiSlash className="inline" size={12} />
            <span>HEAVY WASTE NOT OK</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="px-3 pb-4 text-white">
        <h2 className="text-xl font-bold mb-1">{skip.size} Yard Skip</h2>
        <p className="text-sm opacity-90 mb-2">
          <span className="sr-only">Hire period:</span>
          {skip.hire_period_days} day hire
        </p>

        <div className="flex justify-between items-center">
          <p className="w-full text-xl font-bold text-center">
            <span className="sr-only">Price:</span>{" "}
            {formatPrice(skip.price_before_vat)}
            {/* <span className="text-sm font-normal ml-1 opacity-80">
              +VAT({skip.vat}%)(incl. VAT)
            </span> */}
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
              bg-white text-indigo-700 py-2 px-4 rounded-lg font-medium
              transition-all duration-200
              opacity-0 group-hover:opacity-100 group-focus:opacity-100
              hover:bg-gray-100 focus:opacity-100 focus:ring-2 focus:ring-yellow-400
              focus:outline-none
            `}
            aria-label={`Select ${skip.size} yard skip for £${skip.price_before_vat}`}>
            Select
          </button>
        </div>
      </div>

      {/* Selected Indicator (Accessible) */}
      {isSelected && (
        <div
          className="absolute top-7 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1"
          aria-hidden="true">
          <FiCheckCircle size={12} />
          <span>SELECTED</span>
        </div>
      )}
    </div>
  );
}
