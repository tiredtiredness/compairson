export const generatePairs = (array) => {
  const pairsArray = []
  for (let i = 0; i < array?.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      pairsArray.push([array[i], array[j]])
    }
  }
  return pairsArray
}
