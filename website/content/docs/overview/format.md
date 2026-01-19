---
title: Format
sidebar:
  order: 1
---

> [!TIP]
> This is a template to create your own Data Package Extension. To start using it, click "Use this template" on [the repository](https://github.com/datisthq/extensiondp) in the top right corner. After cloning a newly created repo, run `git tag v0.1.0 && git push --tags` to create an initial semantic version. Read [Contribution Guide](../contributing) for following steps. **This documentation is just a placeholder to get started with!**

Extension DP (Data Package Extension Template) is a data exchange format that helps `PLACEHOLDER` share their `PLACEHOLDER`. It is developed on top of the Data Package standard.

## Why Extension DP?

The `PLACEHOLDER` lacks a standardized format for exchanging  data among publishers, and aggregation platforms. This creates several challenges:

- **Data inconsistency**: Each platform uses its own proprietary format, making integration difficult
- **Manual data entry**: Often needed to manually enter the same data across multiple platforms
- **Limited interoperability**: Aggregators must maintain custom integrations for each data source
- **Data quality issues**: Without clear schemas, data validation and quality control are challenging

Extension DP solves these problems by providing a **standardized, validated, and extensible format** for sharing data. Built on the proven [Data Package](https://datapackage.org/) standard, it ensures data is machine-readable, well-documented, and easy to integrate.

## Structure of a Extension DP

A Extension DP is a [Data Package](https://datapackage.org/) that follows the Data Package specification. The file contains metadata about the package and one or more data resources:

### Basic Structure

```json
{
  "$schema": "https://datisthq.github.io/extensiondp/extension/<version>/profile.json",
  "resources": [
    {
      "name": "table1",
      "schema": "https://datisthq.github.io/extensiondp/extension/<version>/schemas/table1.json",
      "data": [{...}, {...}, {...}]
    },
    {
      "name": "table2",
      "schema": "https://datisthq.github.io/extensiondp/extension/<version>/schemas/table2.json",
      "data": [{...}]
    }
  ]
}
```

### Key Components

1. **Profile**: References the Extension DP profile that defines the structure and validation rules
2. **Resources**: An array containing resources:
   - **table1**: First table
   - **table2**: Second table (and so on)

Each resource includes:
- **name**: The resource type identifier
- **schema**: URL pointing to the JSON schema that validates the data structure

### Data Relationships

The resources might be connected through foreign keys. The relationships are defined in the data table schemas.
