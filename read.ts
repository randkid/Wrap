import { readCSV } from "https://deno.land/x/csv/mod.ts"

export default <T> (action: (csvIterable: AsyncIterable<AsyncIterable<string>>) => Promise<T>) => async (filename: string) => {
    const f = await Deno.open(filename)
    const result = await action(readCSV(f))
    f.close()
    return result
}