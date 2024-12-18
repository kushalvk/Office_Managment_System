import { useNavigate } from "react-router-dom";

function BlogNews() {
    const navigate = useNavigate();

    const posts = [
        {
            id: 1,
            title: "Tips for Effective Office Management",
            description: "Learn how to streamline office processes for maximum productivity.",
            image: "https://via.placeholder.com/300x200",
            date: "2024-12-01",
        },
        {
            id: 2,
            title: "The Future of Remote Work",
            description: "Explore trends and challenges of remote work in modern offices.",
            image: "https://via.placeholder.com/300x200",
            date: "2024-11-25",
        },
        {
            id: 3,
            title: "Office Technology Innovations",
            description: "Discover the latest technological advancements in office environments.",
            image: "https://via.placeholder.com/300x200",
            date: "2024-11-15",
        },
    ];

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
            <h1 className="text-white text-4xl font-bold text-center mb-6 mt-10">Blog & News</h1>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="bg-white rounded-lg shadow-md transform transition-transform duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
                    >
                        <img
                            src={post.image || "https://via.placeholder.com/300x200"}
                            alt={post.title}
                            className="rounded-t-lg object-cover w-full h-48"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-bold text-gray-800">{post.title}</h2>
                            <p className="text-sm text-gray-600 mt-2">{post.description}</p>
                            <p className="text-xs text-gray-500 mt-1">Published: {post.date}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Blog Button */}
            <div className="flex justify-center mt-10">
                <button
                    onClick={() => navigate("/addblognews")}
                    className="py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105 bg-green-600 text-white font-semibold hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-700"
                >
                    Add New Blog
                </button>
            </div>
        </div>
    );
}

export default BlogNews;
