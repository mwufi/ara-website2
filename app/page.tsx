export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between py-6 mb-16 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 font-serif">
              Ara Intelligence
            </h1>
          </div>
        </div>

        <nav className="hidden md:flex space-x-8">
          <a href="#" className="text-purple-600 hover:text-purple-700 font-medium transition-colors">
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
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-light text-gray-900 dark:text-gray-100 mb-6 leading-tight font-serif">
            What will the world look like, when AI is everywhere?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-3xl mx-auto">
            We're building a future that looks more cute & personal - where every person has an OS1,
            a personal assistant & friend that helps with anything.
          </p>
        </div>
      </section>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Personal Memory Block */}
        <div className="group cursor-pointer">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-pink-400 rounded-xl flex items-center justify-center flex-shrink-0">
                <div className="grid grid-cols-2 gap-1">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                  <div className="w-3 h-3 bg-white rounded-full col-start-1 col-end-3"></div>
                </div>
              </div>
              <div className="flex-1">
                <div className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2">Design</div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3 font-serif">
                  Personal memory
                </h3>
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Explore
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Email Client Block */}
        <div className="group cursor-pointer">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
            <div className="mb-6">
              <div className="text-sm text-pink-600 dark:text-pink-400 font-medium mb-2">Artwork</div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 font-serif">
                Email Client of You
              </h3>
              <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Explore
              </button>
            </div>
            <div className="w-full h-48 bg-gradient-to-br from-blue-400 via-orange-400 to-red-400 rounded-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <div className="absolute top-4 left-4 w-8 h-8 bg-white/80 rounded"></div>
              <div className="absolute top-4 right-4 w-16 h-2 bg-white/60 rounded"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="space-y-2">
                  <div className="h-2 bg-white/70 rounded w-3/4"></div>
                  <div className="h-2 bg-white/50 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Content Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-white text-2xl">🤖</span>
          </div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 font-serif">Smart & Personal</h4>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            AI that truly understands you and adapts to your unique needs and preferences.
          </p>
        </div>

        <div className="text-center p-6">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-white text-2xl">💝</span>
          </div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 font-serif">Cute & Friendly</h4>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            Technology that feels warm, approachable, and genuinely cares about your wellbeing.
          </p>
        </div>

        <div className="text-center p-6">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-white text-2xl">🚀</span>
          </div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 font-serif">Always There</h4>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            Your personal assistant is ready to help with anything, anytime, anywhere.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 pt-8">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © 2024 Ara Intelligence. Building the future of personal AI.
          </p>
        </div>
      </footer>
    </div>
  );
}
