import { Material } from "https://raw.githubusercontent.com/randkid/Randkid/master/mod.ts"

export default class Structure<T, Option, I extends Material<any, any[]>[]> {
    async toJson(filename: string, option?: Option): Promise<any> {
        return undefined as unknown as Promise<any>
    }
    getMaterial(input: any): Material<T, I> {
        return undefined as unknown as Material<T, I>
    }
    
    async convert(fromFilename: string, toFilename: string, option?: Option){
        Deno.writeTextFile(toFilename, "export default " + JSON.stringify(await this.toJson(fromFilename, option)))
    }
}