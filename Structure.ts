import { Material } from "https://raw.githubusercontent.com/randkid/Randkid/master/mod.ts"

export default class Structure<T, I extends Material<any, any[]>[]> {
    toJson: (filename: string) => Promise<any>
    toMaterial: (input: any) => Material<T, I>

    constructor(toJson: (filename: string) => Promise<any>, toMaterial: (input: any) => Material<T, I>){
        this.toJson = toJson
        this.toMaterial = toMaterial
    }
    async convert(fromFilename: string, toFilename: string){
        Deno.writeTextFile(toFilename, "export default " + JSON.stringify(await this.toJson(fromFilename)))
    }
    getMaterial(input: any){
        return this.toMaterial(input)
    }
}