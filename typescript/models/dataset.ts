// biome-ignore-all format: DO NOT UPDATE this @generated file
import { z } from "zod";

export const Table1Resource = z.object({
    name: z.literal("table1"),
    Table: z.literal("https://fairspec.github.io/fairspec-extension/schemas/0.2.2/table1.json")
});

export const Table2Resource = z.object({
    name: z.literal("table2"),
    Table: z.literal("https://fairspec.github.io/fairspec-extension/schemas/0.2.2/table2.json")
});

export const Resource = z.union([Table1Resource, Table2Resource]);

export const Dataset = z.object({
    $schema: z.literal("https://fairspec.github.io/fairspec-extension/profiles/0.2.2/dataset.json"),
    resources: z.tuple([Resource]).rest(Resource)
});

export const FairspecExtensionProfile = Dataset;
export type Table1Resource = z.infer<typeof Table1Resource>
export type Table2Resource = z.infer<typeof Table2Resource>
export type Resource = z.infer<typeof Resource>
export type Dataset = z.infer<typeof Dataset>
export type FairspecExtensionProfile = z.infer<typeof FairspecExtensionProfile>
