import { Permission, Group } from './Security';

/**
 * BaseUser represents the common properties shared by both
 * persisted and readable user representations.
 */
interface BaseUser {
  active: boolean;
  defaultLanguage: string;
  emailAddress: string;
  firstName: string;
  lastName: string;
  userName: string;
}

/**
 * PersistableUser is used for user creation or update operations.
 * It includes sensitive fields such as password and an array of group entities.
 */
export interface PersistableUser extends BaseUser {
  id?: number;
  password: string;
  repeatPassword: string;
  groups: Group[];
  store: string;
}

/**
 * ReadableUser is the response model used when retrieving user data.
 * It extends BaseUser and includes additional fields
 */
export interface ReadableUser extends BaseUser {
  id: number;
  loginTime: string;
  lastAccess: string;
  merchant: string;
  permissions: Permission[];
  groups: Group[];
}

/**
 * UserPassword is a DTO used for user password change operations.
 * The `changePassword` field represents the new password.
 */
export interface UserPassword {
  password: string;
  changePassword: string;
}

export interface userLogin {
  username: string;
  password: string;
}