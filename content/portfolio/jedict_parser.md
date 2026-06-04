+++
title = "JEDICT Parser"
description = "Rudimentary parser for JE/N/MDICT in Rust"
+++

[Github Repo](https://github.com/Kirikmelet/jedict_parser-rs)

```rust
use jedict_parser::dict::DictToJson;
use jedict_parser::jmdict::dict::{JMDict, JMDictDictionary};
use jedict_parser::parser::jedict_parser_configs;
static JMDICT_FILE: &str = include_str!("File path here.xml");
fn main() {
    let parser = jedict_parser_configs::jmdict_parser(JMDICT_FILE.to_string());
    let Some(dict) = parser.parse() else {
        panic!("Empty dict!")
    };
    let entries = JMDictDictionary::create(dict);
    assert!(!entries.0.is_empty());
}
```

## Stack

- Rust (and libs in `cargo.toml`)
- JE/N/MDICT database

