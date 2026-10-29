// The shape Next.js 16 passes to routes with an [id] folder
export type IdContext = { params: Promise<{ id: string }> };

// Turns the id from the URL into a safe positive whole number, or null
export async function readId(context: IdContext): Promise<number | null> {
  const { id: raw } = await context.params; // params is a Promise in Next.js 16
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}