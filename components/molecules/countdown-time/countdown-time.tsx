import { useEffect, useState } from "react"

export const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
  const [daysRemaining, setDaysRemaining] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const calculateDaysRemaining = () => {
      const now = new Date()
      const target = new Date(targetDate)
      const timeDifference = target.getTime() - now.getTime()
      const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24))
      return daysDifference > 0 ? daysDifference : 0
    }

    setDaysRemaining(calculateDaysRemaining())
    setIsLoading(false)

    // Update the countdown every day
    const interval = setInterval(() => {
      setDaysRemaining(calculateDaysRemaining())
    }, 86400000) // 24 hours in milliseconds

    return () => clearInterval(interval)
  }, [targetDate])

  if (isLoading) {
    return <div className="animate-pulse bg-blue-800 h-16 w-40 rounded-lg mx-auto"></div>
  }

  return (
    <div className="flex flex-col items-center">
      <div className="bg-gradient-to-r from-red-600 to-yellow-500 p-1 rounded-lg shadow-lg">
        <div className="bg-[#081235] px-6 py-3 rounded-md">
          <p className="text-white text-sm uppercase font-bold mb-1">Contagem Regressiva</p>
          <div className="flex items-center justify-center gap-2">
            <div className="bg-[#0c1d52] px-4 py-2 rounded-md">
              <span className="text-3xl md:text-4xl font-bold text-white">{daysRemaining}</span>
            </div>
            <span className="text-xl md:text-2xl font-bold text-yellow-400">
              {daysRemaining === 1 ? "DIA" : "DIAS"}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
