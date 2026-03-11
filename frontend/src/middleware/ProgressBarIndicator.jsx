export const ProgressBarIndicator = () => {
  console.log('ProgressBarIndicator mounted')
  const progressBarElem = document.getElementById('progress-bar-indicator')
  if (progressBarElem) {
    progressBarElem.style.display = 'block'
  }
  setTimeout(() => {
    if (progressBarElem) {
      console.log('ProgressBarIndicator unmounted')
      progressBarElem.style.display = 'none'
    }
  }, 1000)
}
