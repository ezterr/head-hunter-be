import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  UsePipes,
  UseGuards,
  Get,
  Query,
  Inject,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { ImportStudentDto } from './dto/import-student.dto';
import { ArrayValidationPipe } from '../common/pipes/ArrayValidationPipe';
import { CreateStudentsResponse, GetStudentsResponse } from '../types';
import { CompletionStudentDto } from './dto/completion-student.dto';
import { SetRole } from '../common/decorators/set-role';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RoleGuard } from '../common/guards/role.guard';
import { FindAllQueryDto } from './dto/find-all-query.dto';

@Controller('/student')
export class StudentController {
  constructor(@Inject(StudentService) private studentService: StudentService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @SetRole('admin', 'hr')
  async findAll(@Query() query: FindAllQueryDto): Promise<GetStudentsResponse> {
    return this.studentService.findAll(query);
  }

  @Post('/')
  @SetRole('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UsePipes(ArrayValidationPipe(ImportStudentDto))
  async create(@Body() createUserDto: ImportStudentDto[]): Promise<CreateStudentsResponse> {
    return this.studentService.importStudents(createUserDto);
  }

  @Patch('/:userToken')
  completeSignup(
    @Param('userToken') userToken: string,
    @Body() updateUserDto: CompletionStudentDto,
  ) {
    return this.studentService.completeSignup(userToken, updateUserDto);
  }
}
