function getNumberRanges(arr) {
    if(!arr.length)return false
    let currentNum = null;
    let currentLength = 0;
    const ranges = [];
  
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== currentNum) {
        if (currentNum !== null) {
          ranges.push({ num: currentNum, length: currentLength });
        }
        currentNum = arr[i];
        currentLength = 1;
      } else {
        currentLength++;
      }
    }
  
    if (currentNum !== null) {
      ranges.push({ num: currentNum, length: currentLength });
    }
  
    return ranges;
  }

  export default getNumberRanges