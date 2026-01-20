# ruff: noqa -- DO NOT UPDATE this @generated file

from __future__ import annotations

from typing import Literal, Sequence, Union

from pydantic import BaseModel, Field, RootModel


class Table1Resource(BaseModel):
    name: Literal['table1']
    tableSchema: Literal['https://fairspec.github.io/schemas/0.1.1/table1.json']


class Table2Resource(BaseModel):
    name: Literal['table2']
    tableSchema: Literal['https://fairspec.github.io/schemas/0.1.1/table2.json']


class Resource(RootModel[Union[Table1Resource, Table2Resource]]):
    root: Union[Table1Resource, Table2Resource]


class Dataset(BaseModel):
    field_schema: Literal['https://fairspec.github.io/profiles/0.1.1/dataset.json'] = (
        Field(..., alias='$schema')
    )
    resources: Sequence[Resource] = Field(..., min_length=1)


FairspecExtensionProfile = Dataset
