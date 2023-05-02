export function containsAlphaCharacter(value: any): boolean {
  const regex = /[a-zA-Z]/;
  return regex.test(value);
}
