function e(e) {
  return t(e)
    ? e.errors && e.errors.length > 0
      ? e.errors[0]
      : e.message
    : e instanceof Error
      ? e.message
      : `An unexpected error occurred. Please try again.`;
}
function t(e) {
  return typeof e == `object` && !!e && `statusCode` in e && `message` in e;
}
export { e as t };
