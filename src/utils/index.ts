export const getRandom = (min: number, max: number, nullable: boolean = true) => {
  let value: number
  do {
    value = Math.floor(Math.random() * ((max+1) - min)) + min;
  } while (nullable ? false : !value)
  return value;
}