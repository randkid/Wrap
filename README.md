# Wrap
CSV preprocessor for Randkid materials
## Use (Deno)
### Convert CSV to JS
**convert.ts**
```ts
import {weightedList} from "https://raw.githubusercontent.com/randkid/Wrap/master/mod.ts"
await weightedList.convert("data.csv", "data.js")
```
```sh
deno run --allow-read --allow-write convert.ts
```
### Generate "Material" from JS
**mod.ts**
```ts
import {weightedList} from "https://raw.githubusercontent.com/randkid/Wrap/master/mod.ts"
import data from "./data.js"
export default weightedList.getMaterial(data)
```
### Use "Material"
Refer to [Randkid](https://github.com/randkid/Randkid).
```ts
import material from "./mod.ts"
console.log(material.rand(Math.random()))
```
## Why is this necessary?
CSV file can't be imported.  
This provides importable JS file.
