// biome-ignore-all format: DO NOT UPDATE this @generated file

export type FairspecExtensionProfile = Dataset
export type Resource = Table1Resource | Table2Resource

export interface Dataset {
  $schema: "https://fairspec.github.io/profiles/0.1.1/dataset.json"
  /**
   * @minItems 1
   */
  resources: [Resource, ...Resource[]]
}
/**
 * Data records have to conform to the Table1 schema
 */
export interface Table1Resource {
  name: "table1"
  tableSchema: "https://fairspec.github.io/schemas/0.1.1/table1.json"
}
/**
 * Data items have to conform to the Table2 schema
 */
export interface Table2Resource {
  name: "table2"
  tableSchema: "https://fairspec.github.io/schemas/0.1.1/table2.json"
}
