function AboutUs() {
    return (
        <div className="relative isolate pt-12 p-6 lg:px-8 bg-gradient-to-r from-blue-800 to-blue-400 min-h-screen">
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
            <h1 className="text-white text-4xl font-bold text-center mb-6 mt-10">About Us</h1>

            {/* Content */}
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto transform transition-transform duration-300 hover:shadow-2xl">
                <p className="text-gray-700 text-lg mb-4">
                    Welcome to our Office Management System, where we aim to revolutionize how organizations manage
                    their day-to-day operations efficiently and effectively.
                </p>
                <p className="text-gray-700 text-lg mb-4">
                    Our system provides advanced tools for managing employees, tracking tasks, monitoring progress,
                    and streamlining workflows to ensure productivity and success.
                </p>
                <p className="text-gray-700 text-lg">
                    With a focus on innovation, our team is dedicated to creating a seamless user experience, bringing
                    the latest technology to simplify office management for everyone.
                </p>
            </div>
        </div>
    );
}

export default AboutUs;
