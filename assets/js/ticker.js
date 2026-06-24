export function initTicker() {
  const tracks = document.querySelectorAll('.ticker-track');
  tracks.forEach(track => {
    const width = track.scrollWidth;
    const clone = track.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.parentNode.appendChild(clone);
  });
}
