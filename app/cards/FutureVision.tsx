export default function FutureVision() {
    return (
        < div className="group cursor-pointer transition-all duration-700 hover:scale-[1.02]" >
            <div className="relative h-96 md:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-teal-400 to-blue-500"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                {/* Floating elements */}
                <div className="absolute top-8 right-8 w-16 h-16 bg-white/20 rounded-full backdrop-blur-sm"></div>
                <div className="absolute top-24 right-32 w-8 h-8 bg-white/30 rounded-full backdrop-blur-sm"></div>
                <div className="absolute bottom-32 right-16 w-12 h-12 bg-white/25 rounded-full backdrop-blur-sm"></div>

                {/* Content */}
                <div className="relative h-full flex items-center justify-center text-center p-8 md:p-16">
                    <div className="text-white max-w-2xl">
                        <div className="text-sm md:text-base font-medium mb-3 text-white/80">Vision</div>
                        <h3 className="text-3xl md:text-5xl font-light mb-6 font-serif">
                            The Future of AI
                        </h3>
                        <p className="text-lg text-white/90 mb-8 leading-relaxed">
                            Where technology becomes as natural as breathing, and AI companions understand us better than we understand ourselves.
                        </p>
                        <button className="px-6 py-3 border border-white/30 rounded-lg text-sm md:text-base font-medium text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                            Explore
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
}