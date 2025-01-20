import { useEffect, useState } from 'react'
import { generatePairs } from '@/utils/generatePairs.js'
import { calculateRanking } from '@/utils/calculateRanking.js'

export const useRanking = (items) => {
  const [currentPair, setCurrentPair] = useState(0)
  const [nextPair, setNextPair] = useState(currentPair + 1)
  const [preferences, setPreferences] = useState(
    items?.length > 0
      ? Object.fromEntries(items.map((item) => [item, new Set()]))
      : {}
  )
  const [missIndex, setMissIndex] = useState(new Set())
  const pairs = generatePairs(items)
  const isFinished = currentPair >= pairs.length

  const getRanking = () => calculateRanking(preferences)

  console.log(preferences)

  useEffect(() => {
    for (let i = nextPair; i < pairs.length; i++) {
      preferences[pairs[i][1]]?.forEach((item) => {
        if (preferences[item].has(pairs[i][0])) {
          setMissIndex((prev) => new Set([...prev, i]))
        }
      })
      preferences[pairs[i][0]]?.forEach((item) => {
        if (preferences[item].has(pairs[i][1])) {
          setMissIndex((prev) => new Set([...prev, i]))
        }
      })
    }
    setNextPair(currentPair + 1)
  }, [currentPair, pairs, preferences, nextPair])

  useEffect(() => {
    if (missIndex.has(currentPair)) {
      setCurrentPair((prev) => prev + 1)
    }
  }, [currentPair, missIndex])

  const handleOptionClick = (option) => {
    setPreferences((prev) => {
      const updatedPreferences = { ...prev }

      const pair = pairs[currentPair]
      const currentItem = pair[option]
      const otherItem = pair[1 - option]

      if (!updatedPreferences[currentItem])
        updatedPreferences[currentItem] = new Set()
      if (!updatedPreferences[otherItem])
        updatedPreferences[otherItem] = new Set()

      updatedPreferences[currentItem].add(otherItem)

      return updatedPreferences
    })

    let nextIndex = currentPair + 1
    while (missIndex.has(nextIndex)) {
      nextIndex++
    }
    setCurrentPair(nextIndex)
  }
  return {
    currentPair,
    pairs,
    isFinished,
    handleOptionClick,
    getRanking,
  }
}
