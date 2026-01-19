---
title: Examples
sidebar:
  order: 3
---

This page provides examples of Extension DP files for different scenarios.

## Example 1: Simple Package with Inline Data

A basic example with two tables using inline data. Table2 records can optionally reference Table1 records via the `table1Id` foreign key.

```json
{
  "$schema": "https://datisthq.github.io/extensiondp/extension/v0.1.5/profile.json",
  "resources": [
    {
      "name": "table1",
      "schema": "https://datisthq.github.io/extensiondp/extension/v0.1.5/schemas/table1.json",
      "data": [
        {
          "id": "t1-001",
          "name": "First Entity",
          "status": "active",
          "value": 100.5,
          "itemCount": 5,
          "isVerified": true,
          "createdDate": "2024-01-15",
          "description": "This is the first example entity"
        },
        {
          "id": "t1-002",
          "name": "Second Entity",
          "status": "pending",
          "value": 250.75,
          "itemCount": 10,
          "isVerified": false,
          "createdDate": "2024-02-20"
        }
      ]
    },
    {
      "name": "table2",
      "schema": "https://datisthq.github.io/extensiondp/extension/v0.1.5/schemas/table2.json",
      "data": [
        {
          "id": "t2-001",
          "table1Id": "t1-001",
          "title": "Related Item",
          "amount": 99.99,
          "priority": "high",
          "percentage": 75.5,
          "notes": "This item is related to the first entity",
          "isActive": true
        },
        {
          "id": "t2-002",
          "table1Id": "t1-001",
          "title": "Another Related Item",
          "amount": 150.00,
          "priority": "medium",
          "percentage": 50,
          "isActive": true
        },
        {
          "id": "t2-003",
          "title": "Independent Item",
          "amount": 200.00,
          "priority": "low",
          "percentage": 25,
          "notes": "This item has no parent reference",
          "isActive": false
        }
      ]
    }
  ]
}
```

Note: The third Table2 record has no `table1Id`, making it an independent record.

## Example 2: Using Path References

An example demonstrating the use of `path` instead of inline `data` to reference external CSV files.

```json
{
  "$schema": "https://datisthq.github.io/extensiondp/extension/v0.1.5/profile.json",
  "resources": [
    {
      "name": "table1",
      "schema": "https://datisthq.github.io/extensiondp/extension/v0.1.5/schemas/table1.json",
      "path": "data/table1.csv"
    },
    {
      "name": "table2",
      "schema": "https://datisthq.github.io/extensiondp/extension/v0.1.5/schemas/table2.json",
      "path": "data/table2.csv"
    }
  ]
}
```

**data/table1.csv:**
```csv
id,name,status,value,itemCount,isVerified,createdDate,description
t1-001,First Entity,active,100.5,5,true,2024-01-15,This is the first example entity
t1-002,Second Entity,pending,250.75,10,false,2024-02-20,
t1-003,Third Entity,inactive,500,25,true,2024-03-10,Another example
```

**data/table2.csv:**
```csv
id,table1Id,title,amount,priority,percentage,notes,isActive
t2-001,t1-001,Related Item,99.99,high,75.5,This item is related to the first entity,true
t2-002,t1-001,Another Related Item,150.00,medium,50,,true
t2-003,,Independent Item,200.00,low,25,This item has no parent reference,false
```

## Example 3: Minimal Configuration

A minimal valid Extension DP file with only required fields.

```json
{
  "$schema": "https://datisthq.github.io/extensiondp/extension/v0.1.5/profile.json",
  "resources": [
    {
      "name": "table1",
      "schema": "https://datisthq.github.io/extensiondp/extension/v0.1.5/schemas/table1.json",
      "data": [
        {
          "id": "t1-001",
          "name": "Minimal Entity",
          "status": "active",
          "value": 100,
          "isVerified": true,
          "createdDate": "2024-01-01"
        }
      ]
    },
    {
      "name": "table2",
      "schema": "https://datisthq.github.io/extensiondp/extension/v0.1.5/schemas/table2.json",
      "data": [
        {
          "id": "t2-001",
          "title": "Minimal Item",
          "amount": 50,
          "priority": "medium",
          "isActive": true
        }
      ]
    }
  ]
}
```

This minimal example includes only the required fields for both Table1 and Table2 resources, demonstrating the minimum viable data package.

## Example 4: Demonstrating Constraints

An example showing various constraint validations:

```json
{
  "$schema": "https://datisthq.github.io/extensiondp/extension/v0.1.5/profile.json",
  "resources": [
    {
      "name": "table1",
      "schema": "https://datisthq.github.io/extensiondp/extension/v0.1.5/schemas/table1.json",
      "data": [
        {
          "id": "t1-999",
          "name": "Long Name Example with Many Characters",
          "status": "active",
          "value": 9999.99,
          "itemCount": 1000,
          "isVerified": true,
          "createdDate": "2024-12-31",
          "description": "This demonstrates a record with maximum values and long strings within constraints"
        }
      ]
    },
    {
      "name": "table2",
      "schema": "https://datisthq.github.io/extensiondp/extension/v0.1.5/schemas/table2.json",
      "data": [
        {
          "id": "t2-999",
          "table1Id": "t1-999",
          "title": "Edge Case Item with Very Long Title String That Tests Maximum Length Constraints for This Field Which Can Be Up To Two Hundred Characters Long According To The Schema Definition",
          "amount": 0,
          "priority": "high",
          "percentage": 100,
          "notes": "This note tests the maximum length constraint which is 500 characters.",
          "isActive": true
        }
      ]
    }
  ]
}
```

This example demonstrates:
- Pattern constraints (IDs matching `t1-999` and `t2-999`)
- String length constraints (name between 3-100 chars, title between 1-200 chars)
- Numeric constraints (itemCount max 1000, percentage 0-100)
- Enum constraints (status and priority with specific allowed values)
- Required vs optional fields
