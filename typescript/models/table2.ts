// biome-ignore-all format: DO NOT UPDATE this @generated file

/**
 * An exemplar schema demonstrating foreign key relationships and additional constraints
 */
export interface Table2 {
  /**
   * Unique identifier for the record
   */
  id: string
  /**
   * Reference to the parent table1 record. If not provided, the record is independent
   */
  table1Id?: string
  /**
   * Title or name of the item
   */
  title: string
  /**
   * Monetary or numeric amount
   */
  amount: number
  /**
   * Priority level of the item
   */
  priority: "low" | "medium" | "high"
  /**
   * Percentage value between 0 and 100
   */
  percentage?: number
  /**
   * Additional notes or comments
   */
  notes?: string
  /**
   * Whether the item is currently active
   */
  isActive: boolean
}
