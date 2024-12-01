import Photo1 from '../../../../Storage/PrimeHubBlue.jpg';
import Digree from '../../../../Storage/Digree.jpg';
import Internet from '../../../../Storage/Internet.jpg';
import HomeIcon from '../../../../Storage/Home.jpg';
import Code from '../../../../Storage/Code.jpg';

function Home() {
    return (
        <>
            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    ></div>
                </div>
                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                    <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                        <div
                            className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                        >
                            Explore Office Tools.{' '}
                            <a
                                href="#"
                                className="font-semibold text-indigo-600"
                            >
                                <span className="absolute inset-0" aria-hidden="true"></span>
                                Read more <span aria-hidden="true">&rarr;</span>
                            </a>
                        </div>
                    </div>
                    <div className="text-center">
                        <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
                            Efficient Solutions for Modern Offices
                        </h1>
                        <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                            Boost productivity and make work easier with our office tools.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <a
                                href="#"
                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Get started
                            </a>
                            <a
                                href="#"
                                className="text-sm/6 font-semibold text-gray-900"
                            >
                                Learn more <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    ></div>
                </div>
            </div>

            <section className="text-white body-font bg-[#000777]">
                <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                        <img className="object-cover object-center rounded" alt="hero"
                             src={Photo1}/>
                    </div>
                    <div
                        className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">Brief description of
                            the
                            out
                            <br className="hidden lg:inline-block"/>project goals and objectives.
                        </h1>
                        <p className="mb-8 leading-relaxed">This project aims to streamline office resource allocation,
                            enhance task tracking, and improve communication within teams. The system integrates various
                            tools to automate processes, ensuring efficiency and accuracy.</p>
                        <div className="flex justify-center">
                            <button
                                className="overflow-hidden w-32 p-2 h-12 bg-white text-[#113823] border-none rounded-md text-xl font-bold cursor-pointer relative z-10 group"
                            >
                                Prime Hub!
                                <span
                                    className="absolute w-36 h-32 -top-8 -left-2 bg-white rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left"
                                ></span>
                                <span
                                    className="absolute w-36 h-32 -top-8 -left-2 bg-blue-500 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left"
                                ></span>
                                <span
                                    className="absolute w-36 h-32 -top-8 -left-2 bg-blue-900 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-left"
                                ></span>
                                <span
                                    className="text-white group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10"
                                >Explore!</span
                                > 
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        <div  className="hover:text-white rounded-lg lg:w-1/4 lg:mb-0 mb-6 p-4 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-450 hover:bg-[#000777]">
                            <div className="h-full text-center">
                                <img alt="testimonial"
                                     className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                                     src={Digree}/>
                                <h2 className="font-medium title-font tracking-wider text-sm">Skilled Intern</h2>
                                <span className="inline-block h-1 w-10 rounded bg-indigo-500 mt-6 mb-4"></span>
                                <p className="leading-relaxed">A skilled intern brings expertise and passion to the workplace, offering valuable support to teams..</p>
                            </div>
                        </div>
                        <div className="hover:text-white rounded-lg lg:w-1/4 lg:mb-0 mb-6 p-4 transition ease-in-out delay-50  hover:-translate-y-1 hover:scale-110 duration-450 hover:bg-[#000777]">
                            <div className="h-full text-center">
                                <img alt="testimonial"
                                     className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                                     src={Internet}/>
                                <h2 className="font-medium title-font tracking-wider text-sm">Online Work</h2>
                                <span className="inline-block h-1 w-10 rounded bg-indigo-500 mt-6 mb-4"></span>
                                <p className="leading-relaxed">Online work allows professionals to complete tasks remotely, often involving digital tools for communication and collaboration.</p>
                            </div>
                        </div>
                        <div className="hover:text-white rounded-lg lg:w-1/4 lg:mb-0 p-4 transition ease-in-out delay-50  hover:-translate-y-1 hover:scale-110 duration-450 hover:bg-[#000777]">
                            <div className="h-full text-center">
                                <img alt="testimonial"
                                     className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                                     src={HomeIcon}/>
                                <h2 className="font-medium title-font tracking-wider text-sm">Work From Home</h2>
                                <span className="inline-block h-1 w-10 rounded bg-indigo-500 mt-6 mb-4"></span>
                                <p className="leading-relaxed">Work from home enables employees to complete their job responsibilities from the comfort of their home.</p>
                            </div>
                        </div>
                        <div className="hover:text-white rounded-lg lg:w-1/4 lg:mb-0 p-4 transition ease-in-out delay-50  hover:-translate-y-1 hover:scale-110 duration-450 hover:bg-[#000777]">
                            <div className="h-full text-center">
                                <img alt="testimonial"
                                     className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                                     src={Code}/>
                                <h2 className="font-medium title-font tracking-wider text-sm">Problem Solveing</h2>
                                <span className="inline-block h-1 w-10 rounded bg-indigo-500 mt-6 mb-4"></span>
                                <p className="leading-relaxed">Problem-solving involves identifying issues, analyzing them, and developing solutions.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;
