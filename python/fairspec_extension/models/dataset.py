# ruff: noqa -- DO NOT UPDATE this @generated file

from __future__ import annotations

from typing import Literal, Sequence, TypedDict, Union


class Table1Resource(TypedDict):
    name: Literal['table1']
    tableSchema: Literal['https://fairspec.github.io/schemas/0.1.0/table1.json']


class Table2Resource(TypedDict):
    name: Literal['table2']
    tableSchema: Literal['https://fairspec.github.io/schemas/0.1.0/table2.json']


Resource = Union[Table1Resource, Table2Resource]


Dataset = TypedDict(
    'Dataset',
    {
        '$schema': Literal['https://fairspec.github.io/profiles/0.1.0/dataset.json'],
        'resources': Sequence[Resource],
    },
)


class FairspecExtensionProfile(Dataset):
    pass
