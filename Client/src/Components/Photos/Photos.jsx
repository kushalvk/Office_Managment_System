import React from "react";

function OfficeGallery() {
    const images = [
        "https://via.placeholder.com/400x300",
        "https://via.placeholder.com/400x300",
        "https://via.placeholder.com/400x300",
        "https://via.placeholder.com/400x300",
        "https://via.placeholder.com/400x300",
        "https://via.placeholder.com/400x300",
    ];

    return (
        <div className="relative isolate h-full pt-12 p-6 lg:px-8 bg-gradient-to-r from-blue-800 to-blue-400 min-h-screen">
            {/* Decorative Background */}
            <div
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                aria-hidden="true"
            >
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                ></div>
            </div>

            {/* Header */}
            <h1 className="text-white text-4xl font-bold text-center mb-6 mt-10">Office Gallery</h1>

            {/* Image Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-md transform transition-transform duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl overflow-hidden"
                    >
                        <img
                            src={image}
                            alt={`Office ${index + 1}`}
                            className="object-cover w-full h-48"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OfficeGallery;
