window.onload = () => {
  const matcher = window.matchMedia('(prefers-color-scheme: dark)');
  const lightIcon = document.querySelector('link#light-scheme-icon');
  const darkIcon = document.querySelector('link#dark-scheme-icon');

  const onUpdate = () => {
    if (matcher.matches) {
      lightIcon.remove();
      document.head.append(darkIcon);
    } else {
      darkIcon.remove();
      document.head.append(lightIcon);
    }
  }
  matcher.addListener(onUpdate);
  onUpdate();          
}
