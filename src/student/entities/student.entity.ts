import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { ContractType, StudentInterface, StudentStatus, WorkType } from '../../types';
import { PortfolioUrl } from './portfolio-url.entity';
import { ProjectUrl } from './project-url.entity';
import { BonusProjectUrl } from './bonus-project-url.entity';

@Entity()
export class Student extends BaseEntity implements StudentInterface {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'enum',
    enum: StudentStatus,
    default: StudentStatus.Available,
  })
  public status: StudentStatus;

  @Column({
    type: 'float',
    precision: 3,
    scale: 2,
  })
  public courseCompletion: number;

  @Column({
    type: 'float',
    precision: 3,
    scale: 2,
  })
  public courseEngagement: number;

  @Column({
    type: 'float',
    precision: 3,
    scale: 2,
  })
  public projectDegree: number;

  @Column({
    type: 'float',
    precision: 3,
    scale: 2,
  })
  public teamProjectDegree: number;

  @Column({
    length: 39,
    nullable: true,
    default: null,
  })
  @Index({ unique: true })
  public githubUsername: string;

  @Column({
    length: 256,
    nullable: true,
    default: null,
  })
  public bio: string;

  @Column({
    length: 15,
    nullable: true,
    default: null,
  })
  public phoneNumber: string;

  @Column({
    type: 'text',
    nullable: true,
    default: null,
  })
  public education: string;

  @Column({
    type: 'text',
    nullable: true,
    default: null,
  })
  public courses: string;

  @Column({
    precision: 4,
    default: 0,
    unsigned: true,
  })
  public monthsOfCommercialExp: number;

  @Column({
    type: 'text',
    nullable: true,
    default: null,
  })
  public workExperience: string;

  @Column({
    length: 50,
    nullable: true,
    default: null,
  })
  public targetWorkCity: string;

  @Column({
    unsigned: true,
    type: 'float',
    precision: 9,
    scale: 2,
    default: 0,
  })
  public expectedSalary: number;

  @Column({
    type: 'enum',
    enum: ContractType,
    default: ContractType.Irrelevant,
  })
  public expectedContractType: ContractType;

  @Column({
    type: 'enum',
    enum: WorkType,
    default: WorkType.Irrelevant,
  })
  public expectedTypeWork: WorkType;

  @Column({
    type: 'boolean',
    precision: 1,
    default: 0,
  })
  public canTakeApprenticeship: boolean;

  @OneToMany((type) => BonusProjectUrl, (bonusProjectUrls) => bonusProjectUrls.student)
  public bonusProjectUrls: BonusProjectUrl[];

  @OneToMany((type) => ProjectUrl, (bonusProjectUrls) => bonusProjectUrls.student)
  public projectUrls: ProjectUrl[];

  @OneToMany((type) => PortfolioUrl, (portfolioUrls) => portfolioUrls.student)
  public portfolioUrls: PortfolioUrl[];

  @OneToOne((type) => User, (user) => user.student, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  public user: User;
}
