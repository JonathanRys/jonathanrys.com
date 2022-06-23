export const dateFormatter = (date: Date) => {
  return date.toLocaleString()
}

let copyToClipboard: (copyText: string) => void;

if (navigator && navigator.clipboard) {
  copyToClipboard = navigator.clipboard.writeText;
} else {
  // For older browsers
  copyToClipboard = (copyText: string) => {
    const textField = document.createElement('textarea');
    textField.innerText = copyText;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
  };
}

export { copyToClipboard };
