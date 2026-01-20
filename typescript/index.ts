import * as standard from "@fairspec/metadata"
import { z } from "zod"
import * as extension from "./models/dataset.ts"

export * from "./models/index.ts"

export const Dataset = z.intersection(standard.Dataset, extension.Dataset)
export const Resource = z.intersection(standard.Resource, extension.Resource)

export type Dataset = z.infer<typeof Dataset>
export type Resource = z.infer<typeof Resource>
