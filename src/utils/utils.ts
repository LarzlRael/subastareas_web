export function getParam(code: string) {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(code)
}

export const successResponse = [200, 201, 202, 204, 205, 206];
