# ruff: noqa -- DO NOT UPDATE this @generated file

from __future__ import annotations

from typing import Literal, TypedDict

from typing_extensions import NotRequired


class Table2(TypedDict):
    id: str
    """
    Unique identifier for the record
    """
    table1Id: NotRequired[str]
    """
    Reference to the parent table1 record. If not provided, the record is independent
    """
    title: str
    """
    Title or name of the item
    """
    amount: float
    """
    Monetary or numeric amount
    """
    priority: Literal['low', 'medium', 'high']
    """
    Priority level of the item
    """
    percentage: NotRequired[float]
    """
    Percentage value between 0 and 100
    """
    notes: NotRequired[str]
    """
    Additional notes or comments
    """
    isActive: bool
    """
    Whether the item is currently active
    """
