import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ExclamationTriangleIcon, HomeIcon } from '@heroicons/react/24/solid'; // Assumes you have installed Heroicons

const NotFoundPage = () => {
    // Hook to allow programmatic navigation
    const navigate = useNavigate();

    return (
        // Use min-h-screen to ensure it covers the whole viewport height when rendered alone
        // flex-grow is used in App.jsx, but min-h-screen is safer for standalone view
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100 p-6">
            
            {/* Icon */}
            <ExclamationTriangleIcon className="h-20 w-20 text-red-500 mb-6 animate-pulse" />
            
            {/* Large Error Code */}
            <h1 className="text-8xl md:text-9xl font-extrabold text-red-600 tracking-widest">
                404
            </h1>
            
            {/* Background Text Overlay */}
            <div className="bg-gray-800 px-4 py-2 text-sm text-gray-300 rounded rotate-12 absolute mt-4">
                ERROR
            </div>

            {/* Main Message */}
            <p className="text-2xl md:text-3xl text-gray-200 mt-10 text-center max-w-lg">
                <span className="font-semibold text-red-400">Oops!</span> The page you were looking for doesn't exist or has been moved.
            </p>
            
            {/* Navigation Options */}
            <div className="flex gap-4 mt-10">
                
                {/* Go Back Button */}
                <button 
                    onClick={() => navigate(-1)} // Navigate back one step in history
                    className="flex items-center px-6 py-3 bg-gray-700 text-gray-100 rounded-lg shadow-md hover:bg-gray-600 transition duration-300 font-medium"
                >
                    <span className="mr-2">Go Back</span>
                </button>

                {/* Go Home Link */}
                <Link 
                    to="/" 
                    className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300 font-medium"
                >
                    <HomeIcon className="h-5 w-5 mr-2" />
                    <span>Go Home</span>
                </Link>
            </div>
            
        </div>
    );
};

export default NotFoundPage;