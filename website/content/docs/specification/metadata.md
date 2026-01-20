---
title: Metadata
---

## Definitions

- <a id="%24defs/Dataset"></a>**`Dataset`** *(object)*
  - <a id="%24defs/Dataset/properties/%24schema"></a>**`$schema`**: Must be: `"https://fairspec.github.io/fairspec-extension/profiles/0.2.1/dataset.json"`.
  - <a id="%24defs/Dataset/properties/resources"></a>**`resources`** *(array, required)*: Length must be at least 1.
    - <a id="%24defs/Dataset/properties/resources/items"></a>**Items**: Refer to *[#/$defs/Resource](#%24defs/Resource)*.
- <a id="%24defs/Resource"></a>**`Resource`**
  - **One of**
    - <a id="%24defs/Resource/oneOf/0"></a>: Refer to *[#/$defs/Table1Resource](#%24defs/Table1Resource)*.
    - <a id="%24defs/Resource/oneOf/1"></a>: Refer to *[#/$defs/Table2Resource](#%24defs/Table2Resource)*.
- <a id="%24defs/Table1Resource"></a>**`Table1Resource`** *(object)*: Data records have to conform to the Table1 schema.
  - <a id="%24defs/Table1Resource/properties/name"></a>**`name`**: Must be: `"table1"`.
  - <a id="%24defs/Table1Resource/properties/tableSchema"></a>**`tableSchema`**: Must be: `"https://fairspec.github.io/fairspec-extension/schemas/0.2.1/table1.json"`.
- <a id="%24defs/Table2Resource"></a>**`Table2Resource`** *(object)*: Data items have to conform to the Table2 schema.
  - <a id="%24defs/Table2Resource/properties/name"></a>**`name`**: Must be: `"table2"`.
  - <a id="%24defs/Table2Resource/properties/tableSchema"></a>**`tableSchema`**: Must be: `"https://fairspec.github.io/fairspec-extension/schemas/0.2.1/table2.json"`.
