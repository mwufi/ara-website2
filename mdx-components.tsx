
export const components = {
    h1: ({ children }: { children: React.ReactNode }) => (
        <h1 className="text-5xl font-serif font-light leading-[1.2] tracking-[-0.02em] mb-8 mt-12">{children}</h1>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
        <h2 className="text-4xl font-serif font-light leading-[1.3] tracking-[-0.01em] mb-6 mt-10">{children}</h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
        <h3 className="text-3xl font-serif font-light leading-[1.4] mb-4 mt-8">{children}</h3>
    ),
    h4: ({ children }: { children: React.ReactNode }) => (
        <h4 className="text-2xl font-serif font-light leading-[1.4] mb-4 mt-6">{children}</h4>
    ),
    h5: ({ children }: { children: React.ReactNode }) => (
        <h5 className="text-xl font-serif font-light leading-[1.4] mb-3 mt-5">{children}</h5>
    ),
    h6: ({ children }: { children: React.ReactNode }) => (
        <h6 className="text-lg font-serif font-light leading-[1.4] mb-3 mt-4">{children}</h6>
    ),
    p: ({ children }: { children: React.ReactNode }) => (
        <p className="text-lg font-sans leading-[1.7] tracking-[0.01em] mb-4">{children}</p>
    ),
    img: ({ src, alt }: { src: string; alt: string }) => (
        <div className="my-8">
            <img 
                src={src} 
                alt={alt} 
                className="rounded-lg w-full h-auto"
            />
        </div>
    ),
    a: ({ href, children }: { href: string; children: React.ReactNode }) => (
        <a 
            href={href} 
            className="text-blue-600 hover:text-blue-800 underline transition-colors"
            target="_blank"
            rel="noopener noreferrer"
        >
            {children}
        </a>
    ),
    ul: ({ children }: { children: React.ReactNode }) => (
        <ul className="list-disc list-inside mb-6 space-y-2">{children}</ul>
    ),
    ol: ({ children }: { children: React.ReactNode }) => (
        <ol className="list-decimal list-inside mb-6 space-y-2">{children}</ol>
    ),
    li: ({ children }: { children: React.ReactNode }) => (
        <li className="text-lg leading-relaxed">{children}</li>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
        <blockquote className="border-l-4 border-gray-300 pl-4 italic my-6 text-gray-700">
            {children}
        </blockquote>
    ),
    code: ({ children }: { children: React.ReactNode }) => (
        <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5 text-sm">
            {children}
        </code>
    ),
    pre: ({ children }: { children: React.ReactNode }) => (
        <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto my-6">
            {children}
        </pre>
    ),
}