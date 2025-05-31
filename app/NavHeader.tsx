import Image from "next/image";
import Link from "next/link";

export default function NavHeader() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-10">
                <Link href="/" className="flex items-center space-x-3 backdrop-blur-sm rounded-full px-8 bg-white/50 transition-transform duration-300 hover:scale-105">
                    <div className="w-20 h-16 rounded-lg flex items-center justify-center">
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
                </Link>

                <nav className="hidden md:flex space-x-8 backdrop-blur-sm bg-white/50 rounded-full px-4 h-10 items-center">
                    <Link href="/" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 font-medium transition-colors">
                        Home
                    </Link>
                    <Link href="/products" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 font-medium transition-colors">
                        Products
                    </Link>
                    <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 font-medium transition-colors">
                        About
                    </a>
                    <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 font-medium transition-colors">
                        Connect
                    </a>
                </nav>
            </div>
        </header>
    )
}