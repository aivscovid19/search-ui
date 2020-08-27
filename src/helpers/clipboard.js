export const copyToClipBoard = (text) => {
  const copyEventListener = (e) => {
    e.clipboardData.setData('text/plain', text);
    e.preventDefault();
  }
  if (navigator.clipboard !== undefined) {
    navigator.clipboard.writeText(text);
  } else {
    document.addEventListener('copy', copyEventListener);
    document.execCommand('copy');
    document.removeEventListener('copy', copyEventListener);
  }
}
