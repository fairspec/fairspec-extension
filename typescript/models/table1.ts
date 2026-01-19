// biome-ignore-all format: DO NOT UPDATE this @generated file

/**
 * An exemplar schema demonstrating various field types and constraints
 */
export interface Table1 {
  /**
   * Unique identifier for the record
   */
  id: string
  /**
   * Name of the entity
   */
  name: string
  /**
   * Current status of the entity
   */
  status: "active" | "inactive" | "pending"
  /**
   * Numeric value associated with the entity
   */
  value: number
  /**
   * Count of items
   */
  itemCount?: number
  /**
   * Whether the entity has been verified
   */
  isVerified: boolean
  /**
   * Date when the entity was created
   */
  createdDate: string
  /**
   * Optional description of the entity
   */
  description?: string
}
