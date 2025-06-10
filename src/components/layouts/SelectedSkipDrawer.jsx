import { InfoMessage } from "../alerts/AlertMessages";
import { formatPrice } from "../../utils/formatPrice";
export default function SelectedSkipDrawer({ skip, onClose }) {
  if (!skip) return null;

  return (
    <div className="skip-drawer-container ">
      {/* Overlay */}
      <div className="inset-0 bg-opacity-50" onClick={onClose} />

      {/* Drawer Panel in top-right corner */}
      <div className="top-drawer-panel">
        <h2 className="text-xl font-bold mb-4">Skip Details</h2>
        <div className="space-y-2">
          <p>
            <strong>Size:</strong> {skip.size} yd³
          </p>
          <p>
            <strong>Price:</strong> {formatPrice(skip.price_before_vat)}
          </p>
          <p>
            <strong>Heavy Waste:</strong>
            {skip.allows_heavy_waste ? "Yes" : "No"}
          </p>
          <p>
            <strong>Allowed on Road:</strong>
            {skip.allowed_on_road ? "Yes" : "No"}
          </p>
          <InfoMessage
            message="Imagery and information shown throughout this website may not
                reflect the exact shape or size specification. Colours may vary,
                and options/accessories may be featured at additional cost."
          />
        </div>

        <div className="mt-8 flex justify-between">
          <button onClick={onClose} className="drawer-back-btn">
            Back
          </button>
          <button className="drawer-continue-btn">Continue</button>
        </div>
      </div>
    </div>
  );
}
