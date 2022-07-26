import { ContractType } from './contract-type';
import { SortBy } from './sort-by';
import { SortMethod } from '../sort-method';
import { StudentStatus } from './student-status';
import { WorkType } from './work-type';

export interface CreateStudentDtoInterface {
  email: string;
  courseCompletion: number;
  courseEngagement: number;
  projectDegree: number;
  teamProjectDegree: number;
  bonusProjectUrls: string[];
}

export interface UpdateStudentDtoInterface {
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  newPassword: string;
  githubUsername: string;
  bio: string;
  phoneNumber: string;
  projectUrls: string[];
  portfolioUrls: string[];
  education: string;
  courses: string;
  monthsOfCommercialExp: number;
  workExperience: string;
  expectedSalary: number;
  targetWorkCity: string;
  expectedContractType: ContractType;
  expectedTypeWork: WorkType;
  canTakeApprenticeship: boolean;
}

export interface FindAllQueryDtoInterface extends FindAllQueryFilter {
  page: number;
  status: StudentStatus[];
  sortBy: SortBy;
  sortMethod: SortMethod;
  search: string;
}

export interface FindAllQueryFilter {
  courseCompletion: number;
  courseEngagement: number;
  projectDegree: number;
  teamProjectDegree: number;
  contractType: ContractType[];
  typeWork: WorkType[];
  salaryMin: number;
  salaryMax: number;
  canTakeApprenticeship: boolean[];
  monthsOfCommercialExp: number;
}

export interface ChangeStatusInterviewDtoInterface {
  hrId: string;
}
