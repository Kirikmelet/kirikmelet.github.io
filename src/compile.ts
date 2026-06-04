import { PathLike } from "node:fs";
import * as Fs from "node:fs/promises"
import path from "node:path";
import { JSDOM } from "jsdom"

class PrototypeFile {
  public path: PathLike
  public i18n_path: PathLike
  public dom_element?: HTMLElement
  constructor(path: PathLike, i18n_path: PathLike) {
    this.path = path
    this.i18n_path = i18n_path
  }
  async init(): Promise<PrototypeFile> {
    const buffer = await Fs.readFile(this.path, { encoding: "utf8" })
    this.dom_element = new JSDOM(buffer).window.document.documentElement
    return this
  }
  async loadTranslationFile(): Promise<JSON> {
    return JSON.parse("{}")
  }
}


async function main() {
  const I18N_FILE_DIR: PathLike = "src/i18n"
  const current_dir = process.cwd();
  const project_html_files = (await Fs.readdir(current_dir, { recursive: true, }))
    .filter((item) => item.split(".").pop() === "html")
  let prototypes_promises = project_html_files.filter((item) => item.split(".").includes("proto")).map((item) => new PrototypeFile(item, I18N_FILE_DIR).init())
  const prototypes = await Promise.all(prototypes_promises)
  console.log(prototypes[0].dom_element?.querySelectorAll("[i18n-key]").values().toArray())
}

await main()
