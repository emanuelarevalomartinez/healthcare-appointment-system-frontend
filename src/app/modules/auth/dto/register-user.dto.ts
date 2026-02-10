import { UserRole } from "./user-role.enum";

export interface RegisterUserDTO {
  username: string;
  password: string;
  email: string;
  role: UserRole;
}
