import { CreateStudentDtoInterface } from './user.dto';
import { UserSaveData } from './user';
import { StudentResponse } from './student';
import { UrlResponse } from './url';

// export type CreateStudentsResponse = CreateStudentDtoInterface[];
export type UserResponse = Omit<UserSaveData, 'student'> & {
  student: StudentResponse;
};

export type CreateStudentsResponse = UserResponse[];
export type SignupCompleteStudentsResponse = UserResponse;
