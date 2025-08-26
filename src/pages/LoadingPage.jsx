export default function LoadingPage() {
  return (
    <div className="flex">
      {/* Left content (cards grid) */}
      <div className="flex-1 p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 animate-pulse">
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              className="max-w-[160px] rounded-2xl shadow-lg overflow-hidden bg-white border"
            >
              {/* Image */}
              <div className="w-full h-24 bg-gray-200"></div>

              {/* Text */}
              <div className="p-2 space-y-2">
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-2 bg-gray-200 rounded w-2/3"></div>
              </div>

              {/* Button */}
              <div className="w-full h-6 bg-gray-300 rounded-b-2xl"></div>
            </div>
          ))}
        </div>
      </div>
   
    </div>
  );
}
