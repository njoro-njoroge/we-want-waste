import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useSkipsByLocation } from "../api/hooks/customHooks";
import SkipListCard from "../components/SkipListCard";
import SelectedSkipDrawer from "../components/layouts/SelectedSkipDrawer";
import { FiChevronDown, FiFilter, FiInbox } from "react-icons/fi";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { FetchError, InfoMessage } from "../components/alerts/AlertMessages";

export function SkipList() {
  const [selected, setSelected] = useState(null);
  const [searchParams] = useSearchParams();
  const postcode = searchParams.get("postcode") || "NR3";
  const area = searchParams.get("area") || "Lowestoft";
  const [sortOption, setSortOption] = useState("default");
  const [selectedSkipId, setSelectedSkipId] = useState(null);

  const {
    fetchSkipsByLocation,
    data = [],
    isLoading,
    errorMsg,
  } = useSkipsByLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchSkipsByLocation(postcode, area);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchData();
  }, [postcode, area, fetchSkipsByLocation]);

  const handleSortChange = (e) => setSortOption(e.target.value);

  // Sort  option s
  const sortedSkips = useMemo(() => {
    return [...data].sort((a, b) => {
      switch (sortOption) {
        case "price-high-low":
          return b.price_before_vat - a.price_before_vat;
        case "price-low-high":
          return a.price_before_vat - b.price_before_vat;
        case "heavy-waste-allowed":
          return b.allows_heavy_waste - a.allows_heavy_waste;
        case "no-heavy-waste":
          return a.allows_heavy_waste - b.allows_heavy_waste;
        case "size-large-small":
          return b.size - a.size;
        case "size-small-large":
          return a.size - b.size;
        case "road-allowed":
          return b.allowed_on_road - a.allowed_on_road;
        case "road-not-allowed":
          return a.allowed_on_road - b.allowed_on_road;
        default:
          return 0;
      }
    });
  }, [data, sortOption]);

  const selectedSkip = useMemo(
    () => sortedSkips.find((skip) => skip.id === selectedSkipId) || null,
    [sortedSkips, selectedSkipId]
  );

  if (isLoading) {
    return <LoadingSpinner message="Loading skips..." />;
  }

  if (errorMsg) {
    return (
      <FetchError
        title="Unable to load skips"
        message={errorMsg.message}
        onRetry={() => fetchSkipsByLocation(postcode, area)}
      />
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-center">
        <div className="select-skip-div">
          <h1 className="text-2xl font-bold">Choose Your Skip Size</h1>
          <p>Select the skip size that best suits your needs</p>
        </div>
      </div>

      {/* Sorting Dropdown */}
      <div className="p-4 flex justify-end z-5">
        <div className="relative w-full sm:w-64">
          <label htmlFor="sort-dropdown" className="sr-only">
            Sort skips
          </label>
          <div className="flex items-center gap-2">
            <FiFilter className="text-blue-500 rounded-full" />
            <select
              aria-live="polite"
              id="sort-dropdown"
              value={sortOption}
              onChange={handleSortChange}
              className="sort-input">
              <option value="default">Default Sorting</option>
              <optgroup label="By Price">
                <option value="price-high-low">Price: High to Low</option>
                <option value="price-low-high">Price: Low to High</option>
              </optgroup>
              <optgroup label="By Heavy Waste">
                <option value="heavy-waste-allowed">Heavy Waste Allowed</option>
                <option value="no-heavy-waste">No Heavy Waste</option>
              </optgroup>
              <optgroup label="By Skip Size">
                <option value="size-large-small">Size: Large to Small</option>
                <option value="size-small-large">Size: Small to Large</option>
              </optgroup>
              <optgroup label="By Road Placement">
                <option value="road-allowed">Allowed on Road</option>
                <option value="road-not-allowed">Not Allowed on Road</option>
              </optgroup>
            </select>
            <div className="sort-chevron">
              <FiChevronDown />
            </div>
          </div>
        </div>
      </div>

      {/* Skip Cards */}
      {/* <div className="space-y-4 grid-view">
        <div
          role="list"
          aria-label="Available skip sizes"
          className="skip-grid">
          {sortedSkips.map((skip) => (
            <SkipCard
              key={skip.id}
              skip={skip}
              isSelected={selected === skip.id}
              onSelect={() => {
                setSelected(skip.id);
                setSelectedSkipId(skip.id);
              }}
            />
          ))}
        </div>
      </div> */}

      <div className="space-y-4 list-view">
        <div
          role="list"
          aria-label="Available skip sizes"
          className="grid grid-cols-1 gap-1 md:gap-2  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 p-4 w-full space-y-4 mx-auto">
          {sortedSkips.map((skip) => (
            <SkipListCard
              key={skip.id}
              skip={skip}
              isSelected={selected === skip.id}
              onSelect={() => {
                setSelected(skip.id);
                setSelectedSkipId(skip.id);
              }}
            />
          ))}
        </div>
      </div>

      {/* Skip Details Drawer */}
      <SelectedSkipDrawer
        skip={selectedSkip}
        onClose={() => setSelectedSkipId(null)}
      />

      {/* No Skips Message */}
      {sortedSkips.length === 0 && (
        <div className="no-skip">
          <FiInbox />
          <h3 className="text-lg font-medium">No skips available</h3>

          <InfoMessage message="We couldn't find any skips for your location" />
        </div>
      )}
    </div>
  );
}
