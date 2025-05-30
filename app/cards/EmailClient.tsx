export default function EmailClient() {
    return (
        < div className="group cursor-pointer transition-all duration-700 hover:scale-[1.02]" >
            <div className="relative h-96 md:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl">
                {/* Abstract Art Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-orange-500"></div>
                <div className="absolute inset-0 opacity-80">
                    <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-blue-400 mix-blend-multiply"></div>
                    <div className="absolute top-1/4 right-0 w-2/5 h-3/4 bg-orange-400 mix-blend-multiply"></div>
                    <div className="absolute bottom-0 left-1/4 w-1/2 h-1/3 bg-red-400 mix-blend-multiply"></div>
                    <div className="absolute top-1/3 left-1/3 w-1/4 h-1/4 bg-white mix-blend-screen rounded-lg"></div>
                </div>

                {/* Content */}
                <div className="relative h-full flex items-end p-8 md:p-16">
                    <div className="text-white">
                        <div className="text-sm md:text-base font-medium mb-3 text-white/80">Artwork</div>
                        <h3 className="text-3xl md:text-5xl font-light mb-6 font-serif">
                            Email Client of You
                        </h3>
                        <button className="px-6 py-3 border border-white/30 rounded-lg text-sm md:text-base font-medium text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                            Explore
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
}