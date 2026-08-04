import { readFile, writeFile } from "node:fs/promises"
import { resolve } from "node:path"

const files = [
  resolve("node_modules/next-themes/dist/index.js"),
  resolve("node_modules/next-themes/dist/index.mjs"),
]

for (const file of files) {
  const source = await readFile(file, "utf8")

  if (
    source.includes(
      'if(typeof window!=="undefined")return null;let p=JSON.stringify'
    )
  ) {
    continue
  }

  const patched = source.replace(
    "let p=JSON.stringify",
    'if(typeof window!=="undefined")return null;let p=JSON.stringify'
  )

  if (patched === source) {
    throw new Error(`Unable to patch next-themes: ${file}`)
  }

  await writeFile(file, patched)
}
