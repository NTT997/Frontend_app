/**
 * ================================================
 * Shared Models Entry Point
 * ================================================
 *
 * This module exposes all shared TypeScript interfaces,
 * types, and models used across both frontend projects:
 *
 * - Web App (React + TypeScript)
 * - Mobile App (React Native + Expo + TypeScript)
 *
 * The purpose is to maintain a single source of truth
 * for all API request/response contracts, domain models,
 * and shared definitions between platforms.
 *
 * Import Usage Example:
 *
 * import { User, LoginRequest } from '@ui/shared-models';
 *
 * Add new models in the `src/` folder and export them
 * here to make them available across apps.
 *
 * Do not include any platform-specific logic or components.
 */

// Add more models below

export * from "./models/Configuration";
export * from "./models/Address";
export * from "./models/Country";
export * from "./models/Language";
export * from "./models/Security";
export * from "./models/User";
export * from "./models/Zone";
export * from "./models/Description";
export * from "./models/Category";
export * from "./models/Manufacturer";
export * from "./models/Product/Product";
export * from "./models/Product/Attribute";
export * from "./models/Product/Option";
export * from "./models/Product/OptionValue";
export * from "./models/Customer";
export * from "./models/Cart";
export * from "./models/Order/Order";
export * from "./models/Order/OrderProduct";
export * from "./models/Order/Payment";
