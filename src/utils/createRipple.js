export function createRipple(event) {
  const target = event.currentTarget;

  if (!target) {
    return;
  }

  const circle = document.createElement("span");
  const diameter = Math.max(target.clientWidth, target.clientHeight);
  const rect = target.getBoundingClientRect();

  circle.className = "ripple-node";
  circle.style.width = `${diameter}px`;
  circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - rect.left - diameter / 2}px`;
  circle.style.top = `${event.clientY - rect.top - diameter / 2}px`;

  target.querySelector(".ripple-node")?.remove();
  target.appendChild(circle);

  window.setTimeout(() => {
    circle.remove();
  }, 700);
}
