export function conditionalRender (expression, element) {
  if (expression) return element

  return null
}