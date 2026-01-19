# ruff: noqa -- DO NOT UPDATE this @generated file

from __future__ import annotations

from typing import Literal, Sequence, TypedDict, Union


class Table1Resource(TypedDict):
    name: Literal['table1']
    schema: Literal['https://datisthq.github.io/extension/v0.1.6/schemas/table1.json']


class Table2Resource(TypedDict):
    name: Literal['table2']
    schema: Literal['https://datisthq.github.io/extension/v0.1.6/schemas/table2.json']


Resource = Union[Table1Resource, Table2Resource]


Package = TypedDict(
    'Package',
    {
        '$schema': Literal['https://datisthq.github.io/extension/v0.1.6/profile.json'],
        'resources': Sequence[Resource],
    },
)


class ExtensionDataPackageProfile(Package):
    pass
