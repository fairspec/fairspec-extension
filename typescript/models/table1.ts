// biome-ignore-all format: DO NOT UPDATE this @generated file
import { z } from "zod";

export const Table1 = z.object({
    id: z.string(),
    name: z.string(),
    status: z.union([z.literal("active"), z.literal("inactive"), z.literal("pending")]),
    value: z.number(),
    itemCount: z.number().optional(),
    isVerified: z.boolean(),
    createdDate: z.string(),
    description: z.string().optional()
});
export type Table1 = z.infer<typeof Table1>
