import type * as standard from "@fairspect/metadata"
import type * as extension from "./models/dataset.ts"

export type Resource = standard.Resource & extension.Resource
export type Dataset = standard.Dataset & extension.Dataset

export type * from "./models/index.ts"
