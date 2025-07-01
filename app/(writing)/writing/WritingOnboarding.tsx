import { useState } from 'react'

interface WritingOnboardingProps {
  onComplete: (name: string) => void
}

export default function WritingOnboarding({ onComplete }: WritingOnboardingProps) {
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [isTransitioning, setIsTransitioning] = useState(false)

  const nextStep = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setStep(step + 1)
      setIsTransitioning(false)
    }, 300)
  }

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      nextStep()
    }
  }

  const handleComplete = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      onComplete(name)
    }, 300)
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div 
        className={`transition-opacity duration-300 text-center max-w-md mx-auto ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {step === 1 && (
          <div>
            <h1 className="text-4xl font-light mb-8 text-gray-800">hi!</h1>
            <p className="text-xl mb-8 text-gray-600">what's your name?</p>
            <form onSubmit={handleNameSubmit}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-lg border-none outline-none border-b-2 border-gray-300 focus:border-gray-600 bg-transparent text-center py-2 px-4 w-full text-gray-800"
                placeholder="your name here"
                autoFocus
              />
              <div className="mt-8">
                <button
                  type="submit"
                  className="px-6 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors"
                  disabled={!name.trim()}
                >
                  continue
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 2 && (
          <div>
            <h1 className="text-4xl font-light mb-8 text-gray-800">
              here's a writing surface for you, {name}!
            </h1>
            <button
              onClick={nextStep}
              className="px-6 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors"
            >
              ok
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            <h1 className="text-2xl font-light mb-6 text-gray-800">how this works:</h1>
            <p className="text-lg mb-8 text-gray-600">
              you can just write here, and i'll ask you questions along the way!
            </p>
            <p className="text-sm text-gray-400 mb-8">
              your files are stored in localstorage
            </p>
            <button
              onClick={handleComplete}
              className="px-6 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors"
            >
              let's start writing
            </button>
          </div>
        )}
      </div>
    </div>
  )
}