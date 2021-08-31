export function generateRandomDate(start, end): Date{
  start = start.getTime();
  end = end.getTime();
  return new Date(start + Math.random() * (end - start));
}
