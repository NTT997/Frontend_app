import { ReadableZone } from "../models/Zone";

/**
 * Base representation of a country, used in internal logic.
 */
export interface CountryEntity {
  id: number;
  code: string; // ISO country code
  supported: boolean;
}

/**
 * Human-readable country information, includes zones if applicable.
 */
export interface ReadableCountry extends CountryEntity {
  name: string;
  zones: ReadableZone[];
}
