export interface RegisterRequestGroup {
  name: string;
  type: string;
}

export interface RegisterRequest {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  userName: string;
  password: string;
  repeatPassword: string;
  defaultLanguage: string;
  store: string;
  active: boolean;
  groups: RegisterRequestGroup[];
}

export interface RegisterResponseGroup {
  id: number;
  name: string;
  type: string;
}

export interface RegisterResponsePermission {
  id: number;
  name: string;
}

export interface RegisterResponse {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  userName: string;
  defaultLanguage: string;
  store: string;
  active: boolean;
  lastAccess: string | null;
  loginTime: string | null;
  merchant: string;
  groups: RegisterResponseGroup[];
  permissions: RegisterResponsePermission[];
}