import { FiAlertCircle, FiRefreshCw } from "react-icons/fi";

export function FetchError({
  title = "Something went wrong",
  message = "An unexpected error occurred while fetching data.",
  onRetry,
  retryLabel = "Try Again",
}) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className="w-full flex  items-center justify-center  px-4">
      <div
        className="text-center max-w-md w-full p-6 rounded-xl shadow-md border backdrop-blur-lg"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.85)", // semi-transparent white
          borderColor: "#fecaca", // soft red
        }}>
        {/* Error Icon */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse"
          style={{ backgroundColor: "#fee2e2" }}>
          <FiAlertCircle
            className="w-8 h-8"
            style={{ color: "#dc2626" }}
            aria-hidden="true"
          />
        </div>

        {/* Title & Message */}
        <div className="space-y-3 mb-6">
          <h3 className="text-xl font-semibold" style={{ color: "#1f2937" }}>
            {title}
          </h3>
          <p className="text-sm md:text-base" style={{ color: "#4b5563" }}>
            {message}
          </p>
        </div>

        {/* Retry Button */}
        {onRetry && (
          <button
            onClick={onRetry}
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 shadow-md hover:shadow-lg"
            aria-label={retryLabel}
            style={{
              backgroundColor: "#2563eb",
              color: "#ffffff",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#1d4ed8")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#2563eb")
            }>
            <FiRefreshCw className="w-4 h-4 transition-transform group-hover:rotate-90" />
            <span>{retryLabel}</span>
          </button>
        )}
      </div>
    </div>
  );
}

export function InfoMessage({ message = "Note: Info not provided." }) {
  return (
    <div
      role="alert"
      className="flex items-center gap-3 rounded-lg border border-blue-600 bg-blue-100 p-4 text-blue-900">
      <div className="text-left text-md leading-relaxed">{message}</div>
    </div>
  );
}
