let startTime = Date.now();
let tickers = [];

const handleFrame = () => {
  tickers.forEach((ticker) => {
    ticker(Date.now() - startTime);
  });
  startTime = Date.now();
  requestAnimationFrame(handleFrame);
};

requestAnimationFrame(handleFrame);

export function addTicker(ticker) {
  tickers.push(ticker);
}

export function stopTicker() {
  tickers = [];
}
// 时间累加器
export function intervalTimer(interval) {
    let t = 0;
    return (n) => {
      t += n;
      if (t >= interval) {
        t = 0;
        return true;
      }
      return false;
    };
  }