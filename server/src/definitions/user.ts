export enum UserType {
  SUPER = "SUPER",
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface IUser {
  id: number;
  user_type: UserType;
  house_id: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}
