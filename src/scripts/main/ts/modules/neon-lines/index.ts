function init() {
  const canvas = <HTMLCanvasElement>document.getElementById('neon-lines');

  if (!canvas) return;

  const parent = canvas.parentElement;

  //set styles
  if (parent) {
    const parentWidth = parent.getBoundingClientRect().width;
    const parentHeight = parent.getBoundingClientRect().height;
    canvas.width = parentWidth;
    canvas.height = parentHeight;
  }


}

init();
window.addEventListener('resize', init);
