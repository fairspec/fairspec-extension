// biome-ignore-all format: DO NOT UPDATE this @generated file
import { z } from "zod";

export const Table2 = z.object({
    id: z.string(),
    table1Id: z.string().optional(),
    title: z.string(),
    amount: z.number(),
    priority: z.union([z.literal("low"), z.literal("medium"), z.literal("high")]),
    percentage: z.number().optional(),
    notes: z.string().optional(),
    isActive: z.boolean()
});
export type Table2 = z.infer<typeof Table2>
