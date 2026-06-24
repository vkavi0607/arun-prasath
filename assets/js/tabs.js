export function initTabs() {
  const buttons = document.querySelectorAll('.tab-button');
  const contents = document.querySelectorAll('.tab-content');

  if (!buttons.length) return;

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(item => item.classList.remove('active'));
      contents.forEach(panel => panel.classList.remove('active'));

      button.classList.add('active');
      const target = button.dataset.tab;
      const panel = document.getElementById(target);
      if (panel) panel.classList.add('active');
    });
  });
}
