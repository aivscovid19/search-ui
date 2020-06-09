const debounce = (fn, ms) => {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout((...args) => {
      timer = null;
      fn(...args);
    }, ms);
  };
};

export default debounce;
