function ContactUs() {
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
            <h1 className="text-white text-4xl font-bold text-center mb-6 mt-10">Contact Us</h1>

            {/* Contact Information */}
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto transform transition-transform duration-300 hover:shadow-2xl">
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Our Office Address</h2>
                    <p className="text-lg text-gray-600">123 Office Street, Suite 456, Business City, Country</p>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Phone Number</h2>
                    <p className="text-lg text-gray-600">+1 (123) 456-7890</p>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Email Address</h2>
                    <p className="text-lg text-gray-600">support@officemanagement.com</p>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Business Hours</h2>
                    <p className="text-lg text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                </div>

                <div className="flex justify-center mt-6">
                    <button className="py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105 bg-green-600 text-white font-semibold hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-700">
                        Get in Touch
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;
