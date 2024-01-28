const filterMostOftenNumber = (numsArr) => {
  const qwonNum = numsArr.reduce((acc, num) => {
    if (acc[num]) acc[num]++;
    else acc[num] = 1;
    return acc;
  }, {});

  const mostComNum = Object.keys(qwonNum).reduce((acc, num) =>
    qwonNum[acc] > qwonNum[num] ? acc : num
  );

  const newArrayWithoutMostComNum = numsArr.filter(
    (num) => num !== parseInt(mostComNum)
  );
  const newArrayWithMostCommon = Array(qwonNum[mostComNum]).fill(
    parseInt(mostComNum)
  );

  return console.log(newArrayWithoutMostComNum);
};

filterMostOftenNumber([1, 1, 5, 6, 7, 1, 8, , 8]);
