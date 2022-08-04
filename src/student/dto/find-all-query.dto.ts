import { ContractType, FindAllQueryDtoInterface, SortBy, SortMethod, WorkType } from '../../types';
import { IsEnum, IsInt, IsNumber, IsOptional, IsString, Length, Max, Min } from 'class-validator';
import { IsBooleanArray, IsEnumArray } from '../../common/decorators/validation';

export class FindAllQueryDto implements FindAllQueryDtoInterface {
  @IsEnum(SortBy)
  @IsOptional()
  public sortBy: SortBy;

  @IsEnum(SortMethod)
  @IsOptional()
  public sortMethod: SortMethod = SortMethod.Desc;

  @IsString()
  @Length(0, 255)
  @IsOptional()
  public search: string = '';

  @IsInt()
  @Min(0)
  @Max(5)
  @IsOptional()
  public courseCompletion: number = 0;

  @IsInt()
  @Min(0)
  @Max(5)
  @IsOptional()
  public courseEngagement: number = 0;

  @IsInt()
  @Min(0)
  @Max(5)
  @IsOptional()
  public projectDegree: number = 0;

  @IsInt()
  @Min(0)
  @Max(5)
  @IsOptional()
  public teamProjectDegree: number = 0;

  @IsEnumArray(ContractType)
  @IsOptional()
  public contractType: ContractType[] = [
    ContractType.Irrelevant,
    ContractType.EmploymentContract,
    ContractType.PossibleB2BContract,
    ContractType.PossibleMandate,
  ];

  @IsEnumArray(WorkType)
  @IsOptional()
  public typeWork: WorkType[] = [
    WorkType.Irrelevant,
    WorkType.Hybrid,
    WorkType.OnSite,
    WorkType.ReadyToMoving,
    WorkType.Remote,
  ];

  @IsNumber()
  @Min(0)
  @Max(9999999.99)
  @IsOptional()
  public salaryMin: number = 0;

  @IsNumber()
  @Min(0)
  @Max(9999999.99)
  @IsOptional()
  public salaryMax: number = 9999999.99;

  @IsInt()
  @Min(0)
  @Max(9999)
  @IsOptional()
  public monthsOfCommercialExp: number = 1;

  @IsBooleanArray()
  @IsOptional()
  public canTakeApprenticeship: boolean[] | boolean = [true, false];
}
