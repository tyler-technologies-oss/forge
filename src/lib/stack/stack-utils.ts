export function containsCharacter(value: any): boolean {
  const regex = /[a-zA-Z]/;
  return regex.test(value);
}
