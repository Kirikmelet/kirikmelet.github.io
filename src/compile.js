import * as Fs from "node:fs/promises";
import { JSDOM } from "jsdom";
class PrototypeFile {
    path;
    i18n_path;
    dom_element;
    constructor(path, i18n_path) {
        this.path = path;
        this.i18n_path = i18n_path;
    }
    async init() {
        const buffer = await Fs.readFile(this.path, { encoding: "utf8" });
        this.dom_element = new JSDOM(buffer).window.document.documentElement;
        return this;
    }
    async loadTranslationFile() {
        return JSON.parse("{}");
    }
}
async function main() {
    const I18N_FILE_DIR = "src/i18n";
    const current_dir = process.cwd();
    const project_html_files = (await Fs.readdir(current_dir, { recursive: true, }))
        .filter((item) => item.split(".").pop() === "html");
    let prototypes_promises = project_html_files.filter((item) => item.split(".").includes("proto")).map((item) => new PrototypeFile(item, I18N_FILE_DIR).init());
    const prototypes = await Promise.all(prototypes_promises);
    console.log(prototypes[0].dom_element?.querySelectorAll("[i18n-key]").values().toArray());
}
await main();
