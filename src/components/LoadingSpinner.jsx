export function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="w-full flex items-center justify-center py-20">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-lg font-medium text-gray-700">{message}</p>
      </div>
    </div>
  );
}

export function SmallSpinner() {
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-blue-200 border-t-cyan-300 rounded-full animate-spin" />
  </div>;
}
