# ruff: noqa -- DO NOT UPDATE this @generated file

from __future__ import annotations

from typing import Literal, TypedDict

from typing_extensions import NotRequired


class Table1(TypedDict):
    id: str
    """
    Unique identifier for the record
    """
    name: str
    """
    Name of the entity
    """
    status: Literal['active', 'inactive', 'pending']
    """
    Current status of the entity
    """
    value: float
    """
    Numeric value associated with the entity
    """
    itemCount: NotRequired[int]
    """
    Count of items
    """
    isVerified: bool
    """
    Whether the entity has been verified
    """
    createdDate: str
    """
    Date when the entity was created
    """
    description: NotRequired[str]
    """
    Optional description of the entity
    """
