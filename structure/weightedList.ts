import read from "../read.ts"
import process from "../process.ts"
import { Nominal } from "../deps.ts"
import Structure from "../Structure.ts"

export default new class WeightedList<T> extends Structure<string, (item: string) => T, any[]> {
    async toJson(filename: string, option: (item: string) => T) {
        return read(async CSV => {
            const categories: string[] = []
            const freqAccList: number[] = []
            let freqAcc = 0
    
            CSV[Symbol.asyncIterator]().next() // Skip column names
    
            await process(
                () => {},
                [
                    category => {
                        categories.push(category)
                    },
                    freq => {
                        freqAccList.push(freqAcc += Number(freq))
                    },
                ]
            )(CSV)
            return {categories, freqAccList}
        })(filename)
    }
    getMaterial({categories, freqAccList}: any) {
        return new Nominal<string, any[]>({
            inputMaterials: [] as any,
            rand(seed: number){
                const range = freqAccList[freqAccList.length - 1]
                const target = seed * range
                const bSearch = (first: number, last: number): number => {
                    const mid = Math.floor( (first + last) / 2 )
                    if (first >= last) {
                        if (freqAccList[mid] > target) {
                            return mid
                        } else {
                            return mid + 1
                        }
                    }
                    if (freqAccList[mid] > target) {
                        return bSearch(first, mid - 1)
                    } else {
                        return bSearch(mid + 1, last)
                    }
                }
                return categories[bSearch(0, freqAccList.length - 1)]
            },
            categories
        })
    }
}