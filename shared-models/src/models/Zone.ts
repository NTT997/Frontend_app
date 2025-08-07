/**
 * Base representation of a geographic zone (e.g., a state or province).
 */
export interface ZoneEntity {
  id: number;
  countryCode: string;
  code: string;
}

/**
 * Represents a human-readable zone with its display name.
 */
export interface ReadableZone extends ZoneEntity {
  name: string;
}
