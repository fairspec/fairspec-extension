---
title: Software
sidebar:
  order: 2
---

Fairspec Extension provides SDKs for Python and TypeScript/JavaScript to make it easy to publish and consume Extension datasets.

## Python

> [!NOTE]
> In addition to the Python SDK, we recommend using [Fairspec Python](https://github.com/fairspec/fairspec-python) to manage your datasets. For example, using it you can publish your data package directory to Zenodo instead of saving it locally, as well as consume it from a remote server.

### Installation

```bash
pip install fairspec fairspec-extension
```

### Publication

```python
from fairspec_extension import Dataset, Table1, Table2
from fairspec import saveDatasetDescriptor

# Create Table1 records
record1 = Table1(
    id="t1-001",
    name="First Entity",
    status="active",
    value=100.5,
    itemCount=5,
    isVerified=True,
    createdDate="2024-01-15",
    description="This is the first example entity",
)

# Create Table2 records
record2 = Table2(
    id="t2-001",
    table1Id="t1-001",
    title="Related Item",
    amount=99.99,
    priority="high",
    percentage=75.5,
    notes="This item is related to the first entity",
    isActive=True,
)

dataset = Dataset(
    {
        "$schema": "https://datisthq.github.io/fairspec-extension/profiles/v0.1.5/dataset.json",
        "resources": [
            {
                "name": "table1",
                "data": [record1],
                "tableSchema": "https://datisthq.github.io/fairspec-extension/schemas/v0.1.5/table1.json",
            },
            {
                "name": "table2",
                "data": [record2],
                "tableSchema": "https://datisthq.github.io/fairspec-extension/schemas/v0.1.5/table2.json",
            },
        ],
    }
)

saveDatasetDescriptor(dataset, path="dataset.json")
```

### Validation

```python
from fairspec import validateDataset

report = validateDataset("dataset.json")
print(report)
```

### Consumption

```python
from fairspec import loadDatasetDescriptor

dataset = loadDatasetDescriptor("dataset.json")
print(dataset)
```

## TypeScript

> [!NOTE]
> In addition to the TypeScript SDK, we recommend using [Fairspec TypeScript](https://github.com/fairspec/fairspec-typescript) to manage your datasets. For example, using it you can publish your data package directory to Zenodo instead of saving it locally, as well as consume it from a remote server.

### Installation

```bash
npm install fairspec fairspec-extension
```

### Publication

```typescript
import type { Table1, Table2, Dataset } from "fairspec-extension";
import { savePackageDescriptor } from "fairspec";

const record1: Table1 = {
	id: "t1-001",
	name: "First Entity",
	status: "active",
	value: 100.5,
	itemCount: 5,
	isVerified: true,
	createdDate: "2024-01-15",
	description: "This is the first example entity",
};

const record2: Table2 = {
	id: "t2-001",
	table1Id: "t1-001",
	title: "Related Item",
	amount: 99.99,
	priority: "high",
	percentage: 75.5,
	notes: "This item is related to the first entity",
	isActive: true,
};

const dataset: Dataset = {
	$schema:
		"https://fairspec.github.io/fairspec-extension/profiles/v0.1.5/datast.json",
	resources: [
		{
			name: "table1",
			data: [record1],
			tableSchema:
				"https://fairspec.github.io/fairspec-extension/schemas/v0.1.5/table1.json",
		},
		{
			name: "table2",
			data: [record2],
			tableSchema:
				"https://fairspec.github.io/fairspec-extension/schemas/v0.1.5/table2.json",
		},
	],
};

await saveDatasetDescriptor(dataset, {
	path: "dataset.json",
	overwrite: true,
});
```

### Validation

```typescript
import { validateDataset } from "fairspec";

const { valid, errors } = await validateDataset("dataset.json");
console.log(valid, errors);
```

### Consumption

```typescript
import { loadDatasetDescriptor } from "fairspec";

const dataset = await loadDatasetDescriptor("dataset.json");
console.log(dataset);
```
