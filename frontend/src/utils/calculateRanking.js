export const calculateRanking = victoryMap => {
  // Создаём объект для подсчёта транзитивных побед
  const totalWins = Object.fromEntries(
    Object.keys(victoryMap).map(key => [key, new Set(victoryMap[key])])
  );

  // Вычисляем транзитивные победы
  for (const key in victoryMap) {
    const stack = [...victoryMap[key]];
    const visited = new Set(stack);

    while (stack.length > 0) {
      const current = stack.pop();
      for (const subWin of victoryMap[current] || []) {
        if (!visited.has(subWin)) {
          visited.add(subWin);
          stack.push(subWin);
          totalWins[key].add(subWin);
        }
      }
    }
  }

  // Подсчитываем количество побед и создаём массив для сортировки
  const ranking = Object.entries(totalWins)
    .map(([key, wins]) => ({ element: key, victories: wins.size }))
    .sort((a, b) => b.victories - a.victories);

  return ranking;
};
