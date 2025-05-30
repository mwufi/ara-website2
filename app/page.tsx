import Image from "next/image";

const headerText = `What will the world look like, when AI is everywhere? We're building a future that looks more cute & personal - where every person has an OS1, a personal assistant & friend that helps with anything.`

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between py-6 mb-16">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center">
            <Image
              src="/ara_logo.svg"
              alt="Ara Intelligence Logo"
              width={140}
              height={40}
              className="w-full h-full"
            />
          </div>
          <div>
            <h1 className="text-2xl font-sans text-gray-900 dark:text-gray-100">
              Ara Intelligence
            </h1>
          </div>
        </div>

        <nav className="hidden md:flex space-x-8">
          <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 font-medium transition-colors">
            Home
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 font-medium transition-colors">
            About
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 font-medium transition-colors">
            Connect
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="mb-20">
        <h2 className="font-serif text-[48px] font-light leading-[1.2] tracking-[-0.02em] max-w-[65rem]">
          {headerText}
        </h2>
      </section >

      {/* Full-width Content Blocks */}
      < div className="space-y-8 mb-20" >
        {/* Personal Memory Block */}
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

        {/* Email Client Block */}
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

        {/* Future Vision Block */}
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
      </div >

      {/* Footer */}
      < footer className="border-t border-gray-200 dark:border-gray-700 pt-12 pb-8" >
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © 2024 Ara Intelligence. Building the future of personal AI.
          </p>
        </div>
      </footer >
    </div >
  );
}
