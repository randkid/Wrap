import read from "../read.ts"
import process from "../process.ts"
import { Nominal } from "../deps.ts"
import Structure from "../Structure.ts"

export default new Structure(read(async CSV => {
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
}), 
    ({categories, freqAccList}) => new Nominal<string, any[]>({
        inputMaterials: [] as any,
        rand(seed: number){
            const range = freqAccList[freqAccList.length - 1]
            let i = 0
            while(freqAccList[i] < seed * range) {
                i++
            }
            return categories[i]
        },
        categories
    })
)