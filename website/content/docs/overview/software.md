---
title: Software
sidebar:
  order: 2
---

Extension DP provides SDKs for Python and TypeScript/JavaScript to make it easy to publish and consume Extension Data Packages.

## Python

> [!NOTE]
> In addition to the Python SDK, we recommend using [frictionless-py](https://framework.frictionlessdata.io/) to manage your data packages. For example, using it you can publish your data package directory to Zenodo instead of saving it locally, as well as consume it from a remote server.

### Installation

```bash
pip install extensiondp frictionless
```

### Publication

```python
from extensiondp import Package, Table1, Table2
import frictionless

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

package = Package(
    {
        "$schema": "https://datisthq.github.io/extensiondp/extension/v0.1.5/profile.json",
        "resources": [
            {
                "name": "table1",
                "data": [record1],
                "schema": "https://datisthq.github.io/extensiondp/extension/v0.1.5/schemas/table1.json",
            },
            {
                "name": "table2",
                "data": [record2],
                "schema": "https://datisthq.github.io/extensiondp/extension/v0.1.5/schemas/table2.json",
            },
        ],
    }
)

frictionless.Package(package).to_json("extension.json")
```

### Validation

```python
import frictionless

report = frictionless.validate("extension.json")
print(report)
```

### Consumption

```python
import frictionless

package = frictionless.Package("extension.json")
print(package)
```

## TypeScript

> [!NOTE]
> In addition to the TypeScript SDK, we recommend using [frictionless-ts](https://github.com/frictionlessdata/frictionless-ts) to manage your data packages. For example, using it you can publish your data package directory to Zenodo instead of saving it locally, as well as consume it from a remote server.

### Installation

```bash
npm install extensiondp frictionless-ts
```

### Publication

```typescript
import type { Table1, Table2, Package } from "extensiondp";
import { savePackageDescriptor } from "frictionless-ts";

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

const dataPackage: Package = {
	$schema:
		"https://datisthq.github.io/extensiondp/extension/v0.1.5/profile.json",
	resources: [
		{
			name: "table1",
			data: [record1],
			schema:
				"https://datisthq.github.io/extensiondp/extension/v0.1.5/schemas/table1.json",
		},
		{
			name: "table2",
			data: [record2],
			schema:
				"https://datisthq.github.io/extensiondp/extension/v0.1.5/schemas/table2.json",
		},
	],
};

await savePackageDescriptor(dataPackage, {
	path: "extension.json",
	overwrite: true,
});
```

### Validation

```typescript
import { validatePackage } from "frictionless-ts";

const { valid, errors } = await validatePackage("extension.json");
console.log(valid, errors);
```

### Consumption

```typescript
import { loadPackageDescriptor } from "frictionless-ts";

const dataPackage = await loadPackageDescriptor("extension.json");
console.log(dataPackage);
```
