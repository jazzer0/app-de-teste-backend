export function validate(payload: Record<string, any>) {
  return Object.values(payload).map((valor) => valor !== undefined);
}
