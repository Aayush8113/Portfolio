import React from "react";

const ProjectCardSkeleton = () => {
  return (
    <div
      className="bg-gray-900/80 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden 
                 h-full flex flex-col animate-pulse"
    >
      {/* Image placeholder */}
      <div className="w-full h-48 bg-gray-800" />

      <div className="p-5 flex flex-col flex-grow">
        {/* Title placeholder */}
        <div className="h-5 bg-gray-800 rounded w-3/4 mb-4" />

        {/* Description lines */}
        <div className="h-4 bg-gray-800 rounded w-full mb-2" />
        <div className="h-4 bg-gray-800 rounded w-5/6 mb-4" />

        {/* Tags placeholder */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="h-5 w-16 bg-gray-800 rounded-full" />
          <div className="h-5 w-20 bg-gray-800 rounded-full" />
          <div className="h-5 w-24 bg-gray-800 rounded-full" />
        </div>

        {/* Footer placeholder */}
        <div className="mt-auto pt-4 border-t border-gray-800">
          <div className="flex justify-between items-center">
            <div className="h-4 w-28 bg-gray-800 rounded" />
            <div className="flex gap-3">
              <div className="h-5 w-5 bg-gray-800 rounded-full" />
              <div className="h-5 w-5 bg-gray-800 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCardSkeleton;
