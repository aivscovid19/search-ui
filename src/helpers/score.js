const MODIFIER = 100000;

export const pretifyT5Score = (score, modifier = MODIFIER) => {
  const [numStr, e] = score.split('-');
  let num = parseFloat(numStr);
  if (typeof e !== 'undefined') {
    num *= Math.pow(10, -parseInt(e));
  }
  return (num * MODIFIER).toFixed(3);
};
