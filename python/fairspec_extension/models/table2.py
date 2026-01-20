# ruff: noqa -- DO NOT UPDATE this @generated file

from __future__ import annotations

from enum import Enum
from typing import Optional

from pydantic import BaseModel, Field, confloat, constr


class Priority(Enum):
    low = 'low'
    medium = 'medium'
    high = 'high'


class Table2(BaseModel):
    id: constr(pattern=r'^t2-[0-9]{3}$') = Field(
        ..., examples=['t2-001', 't2-002', 't2-003']
    )
    """
    Unique identifier for the record
    """
    table1Id: Optional[str] = Field(None, examples=['t1-001', 't1-002'])
    """
    Reference to the parent table1 record. If not provided, the record is independent
    """
    title: constr(min_length=1, max_length=200) = Field(
        ..., examples=['First Item', 'Second Item', 'Sample Entry']
    )
    """
    Title or name of the item
    """
    amount: confloat(ge=0.0) = Field(..., examples=[99.99, 150.5, 2500])
    """
    Monetary or numeric amount
    """
    priority: Priority = Field(..., examples=['low', 'medium', 'high'])
    """
    Priority level of the item
    """
    percentage: Optional[confloat(ge=0.0, le=100.0)] = Field(
        None, examples=[25.5, 50, 75.25, 100]
    )
    """
    Percentage value between 0 and 100
    """
    notes: Optional[constr(max_length=500)] = Field(
        None, examples=['This is a note', 'Additional information here']
    )
    """
    Additional notes or comments
    """
    isActive: bool = Field(..., examples=[True, False])
    """
    Whether the item is currently active
    """
