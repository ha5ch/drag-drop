export function preventStop(event: Event) {
  event.preventDefault();
  event.stopPropagation();
}
