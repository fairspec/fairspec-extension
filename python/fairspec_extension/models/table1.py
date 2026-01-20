# ruff: noqa -- DO NOT UPDATE this @generated file

from __future__ import annotations

from datetime import date
from enum import Enum
from typing import Optional

from pydantic import BaseModel, Field, confloat, conint, constr


class Status(Enum):
    active = 'active'
    inactive = 'inactive'
    pending = 'pending'


class Table1(BaseModel):
    id: constr(pattern=r'^t1-[0-9]{3}$') = Field(
        ..., examples=['t1-001', 't1-002', 't1-003']
    )
    """
    Unique identifier for the record
    """
    name: constr(min_length=3, max_length=100) = Field(
        ..., examples=['Example Entity', 'Sample Item']
    )
    """
    Name of the entity
    """
    status: Status = Field(..., examples=['active', 'inactive', 'pending'])
    """
    Current status of the entity
    """
    value: confloat(ge=0.0) = Field(..., examples=[100.5, 250.75, 500])
    """
    Numeric value associated with the entity
    """
    itemCount: Optional[conint(ge=0, le=1000)] = Field(None, examples=[5, 10, 25])
    """
    Count of items
    """
    isVerified: bool = Field(..., examples=[True, False])
    """
    Whether the entity has been verified
    """
    createdDate: date = Field(..., examples=['2024-01-15', '2024-03-20'])
    """
    Date when the entity was created
    """
    description: Optional[str] = Field(
        None,
        examples=['This is a sample description', 'Additional notes about the entity'],
    )
    """
    Optional description of the entity
    """
