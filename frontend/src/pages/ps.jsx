import React, { useState } from 'react';

const PairwiseSorter = () => {
  const namMember = [
    'Tim McGraw',
    'Picture to Burn',
    'Teardrops On My Guitar',
    'A Place In This World',
    'Cold As You',
    'The Outside',
  ];

  const [lstMember, setLstMember] = useState([namMember.map((_, i) => i)]);
  const [parent, setParent] = useState([-1]);
  const [rec, setRec] = useState([]);
  const [equal, setEqual] = useState(new Array(namMember.length).fill(-1));
  const [cmp1, setCmp1] = useState(0);
  const [cmp2, setCmp2] = useState(1);
  const [head1, setHead1] = useState(0);
  const [head2, setHead2] = useState(0);
  const [numQuestion, setNumQuestion] = useState(1);
  const [finishSize, setFinishSize] = useState(0);
  const [finishFlag, setFinishFlag] = useState(false);

  // Initialize the lists by splitting into pairs
  const initialize = () => {
    let n = 0;
    const newParent = [-1];
    const newLstMember = [namMember.map((_, i) => i)];

    for (let i = 0; i < newLstMember.length; i++) {
      if (newLstMember[i].length >= 2) {
        const mid = Math.ceil(newLstMember[i].length / 2);
        newLstMember.push(newLstMember[i].slice(0, mid));
        newParent.push(i);
        newLstMember.push(newLstMember[i].slice(mid));
        newParent.push(i);
      }
    }

    setLstMember(newLstMember);
    setParent(newParent);
    setCmp1(newLstMember.length - 2);
    setCmp2(newLstMember.length - 1);
    setRec([]);
    setEqual(new Array(namMember.length).fill(-1));
    setNumQuestion(1);
    setFinishSize(0);
    setFinishFlag(false);
  };

  const handleChoice = choice => {
    // Проверяем существование массивов для сравнения
    if (!lstMember[cmp1] || !lstMember[cmp2]) {
      console.error('One of the comparison arrays is undefined');
      return;
    }

    // Если сортировка завершена, выходим
    if (finishFlag) return;

    // Локальные копии для обновлений
    let updatedRec = [...rec];
    let updatedHead1 = head1;
    let updatedHead2 = head2;
    let updatedFinishSize = finishSize;

    // Обработка выбора пользователя
    if (choice === -1) {
      // Выбор первого элемента
      updatedRec.push(lstMember[cmp1][updatedHead1]);
      updatedHead1++;
      updatedFinishSize++;
    } else if (choice === 1) {
      // Выбор второго элемента
      updatedRec.push(lstMember[cmp2][updatedHead2]);
      updatedHead2++;
      updatedFinishSize++;
    } else if (choice === 0) {
      // Элементы равны
      updatedRec.push(lstMember[cmp1][updatedHead1]);
      updatedRec.push(lstMember[cmp2][updatedHead2]);
      updatedHead1++;
      updatedHead2++;
      updatedFinishSize += 2;
    }

    // Слияние массивов, если оба завершены
    if (
      updatedHead1 === lstMember[cmp1].length &&
      updatedHead2 === lstMember[cmp2].length
    ) {
      const combinedList = [...updatedRec];
      lstMember[parent[cmp1]] = combinedList; // Обновляем родительский массив
      lstMember.pop(); // Удаляем последние два массива
      lstMember.pop();

      // Сдвигаем указатели
      setCmp1(cmp1 - 2);
      setCmp2(cmp2 - 2);
      setHead1(0);
      setHead2(0);
      setRec([]);
    } else {
      // Продолжаем сравнение
      setHead1(updatedHead1);
      setHead2(updatedHead2);
      setRec(updatedRec);
    }

    // Обновляем прогресс сортировки
    setFinishSize(updatedFinishSize);

    // Если сортировка завершена
    if (cmp1 < 0) {
      setFinishFlag(true);
    }
  };

  const renderResult = () => {
    const result = lstMember[0].map((idx, rank) => {
      return (
        <tr key={idx}>
          <td>{rank + 1}</td>
          <td>{namMember[idx]}</td>
        </tr>
      );
    });

    return (
      <table border='1' style={{ margin: 'auto' }}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Song</th>
          </tr>
        </thead>
        <tbody>{result}</tbody>
      </table>
    );
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      {!finishFlag ? (
        <div>
          <h2>Battle #{numQuestion}</h2>
          <p>{Math.floor((finishSize / namMember.length) * 100)}% sorted</p>
          <button
            onClick={() => handleChoice(-1)}
            disabled={head1 >= lstMember[cmp1]?.length}
          >
            {lstMember[cmp1]?.[head1] !== undefined
              ? namMember[lstMember[cmp1][head1]]
              : 'End'}
          </button>
          <span> VS </span>
          <button
            onClick={() => handleChoice(1)}
            disabled={head2 >= lstMember[cmp2]?.length}
          >
            {lstMember[cmp2]?.[head2] !== undefined
              ? namMember[lstMember[cmp2][head2]]
              : 'End'}
          </button>
        </div>
      ) : (
        <div>
          <h2>Sorting Complete</h2>
          {renderResult()}
        </div>
      )}
      <button onClick={initialize} style={{ marginTop: '20px' }}>
        Restart
      </button>
    </div>
  );
};

export default PairwiseSorter;
