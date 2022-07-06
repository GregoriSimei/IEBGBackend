export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  SECRETARY = 'secretary',
}

export interface IUser {
  email: string;
  pass: string;
  role: UserRole;
}
