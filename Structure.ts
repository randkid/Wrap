import { Material } from "https://raw.githubusercontent.com/randkid/Randkid/master/mod.ts"

export default class Structure<T, Option, J, I extends Material<any, any[]>[]> {
    async toJson(filename: string, option?: Option): Promise<J> {
        return undefined as unknown as Promise<J>
    }
    getMaterial(input: J): Material<T, I> {
        return undefined as unknown as Material<T, I>
    }

    async convert(fromFilename: string, toFilename: string, option?: Option){
        Deno.writeTextFile(toFilename, "export default " + JSON.stringify(await this.toJson(fromFilename, option)))
    }
}