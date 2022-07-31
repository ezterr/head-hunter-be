import { UserRole } from './user-role';
import { StudentInterface } from '../student';
import { HrInterface } from '../hr';

export interface UserInterface {
  id: string;
  lastName: string | null;
  firstName: string | null;
  email: string;
  hashPwd: string | null;
  role: UserRole;
  isActive: boolean;
  userToken: string | null;
  jwtId: string | null;
  student?: StudentInterface | null;
  hr?: HrInterface | null;
}

export type UserResponseData = Omit<UserInterface, 'hashPwd' | 'userToken' | 'jwtId'>;
export type OnlyUserResponseData = Omit<
  UserInterface,
  'hashPwd' | 'userToken' | 'jwtId' | 'student' | 'hr'
>;
