---
title: Metadata
---

## Definitions

- <a id="definitions/Package"></a>**`Package`** *(object)*
  - <a id="definitions/Package/properties/%24schema"></a>**`$schema`**: Must be: `"https://datisthq.github.io/extension/v0.1.6/profile.json"`.
  - <a id="definitions/Package/properties/resources"></a>**`resources`** *(array, required)*: Length must be at least 1.
    - <a id="definitions/Package/properties/resources/items"></a>**Items**: Refer to *[#/definitions/Resource](#definitions/Resource)*.
- <a id="definitions/Resource"></a>**`Resource`**
  - **One of**
    - <a id="definitions/Resource/oneOf/0"></a>: Refer to *[#/definitions/Table1Resource](#definitions/Table1Resource)*.
    - <a id="definitions/Resource/oneOf/1"></a>: Refer to *[#/definitions/Table2Resource](#definitions/Table2Resource)*.
- <a id="definitions/Table1Resource"></a>**`Table1Resource`** *(object)*: Data records have to conform to the Table1 schema.
  - <a id="definitions/Table1Resource/properties/name"></a>**`name`**: Must be: `"table1"`.
  - <a id="definitions/Table1Resource/properties/schema"></a>**`schema`**: Must be: `"https://datisthq.github.io/extension/v0.1.6/schemas/table1.json"`.
- <a id="definitions/Table2Resource"></a>**`Table2Resource`** *(object)*: Data items have to conform to the Table2 schema.
  - <a id="definitions/Table2Resource/properties/name"></a>**`name`**: Must be: `"table2"`.
  - <a id="definitions/Table2Resource/properties/schema"></a>**`schema`**: Must be: `"https://datisthq.github.io/extension/v0.1.6/schemas/table2.json"`.
