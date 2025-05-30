export default function MemoryBlock() {
    return (
        < div className="group cursor-pointer transition-all duration-700 hover:scale-[1.02]" >
            <div className="relative h-96 md:h-[500px] w-full rounded-3xl overflow-hidden bg-gradient-to-br from-orange-300 via-pink-300 to-blue-400 shadow-2xl">
                {/* Background Art */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-200 via-pink-200 to-blue-300 opacity-90"></div>
                <div className="absolute inset-0 opacity-30" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}></div>

                {/* Content */}
                <div className="relative h-full flex items-center justify-between p-8 md:p-16">
                    <div className="flex items-center space-x-8">
                        {/* Icon */}
                        <div className="w-32 h-32 md:w-40 md:h-40 relative">
                            <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-3xl"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="w-6 h-6 bg-white rounded-full shadow-lg"></div>
                                    <div className="w-6 h-6 bg-white rounded-full shadow-lg"></div>
                                    <div className="w-6 h-6 bg-white rounded-full shadow-lg"></div>
                                    <div className="w-6 h-6 bg-white rounded-full shadow-lg"></div>
                                    <div className="w-6 h-6 bg-white rounded-full shadow-lg col-start-1 col-end-3 justify-self-center"></div>
                                </div>
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="text-white">
                            <div className="text-sm md:text-base font-medium mb-3 text-white/80">Design</div>
                            <h3 className="text-3xl md:text-5xl font-light mb-6 font-serif">
                                Personal memory
                            </h3>
                            <button className="px-6 py-3 border border-white/30 rounded-lg text-sm md:text-base font-medium text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                                Explore
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}