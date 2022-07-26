import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserHelperService } from './user-helper.service';
import { ChangePasswordResponse, GetUserResponse, UserInterface, UserRole } from '../types';
import { ChangePasswordDto } from './dto/change-password.dto';
import { compare } from 'bcrypt';
import { hashPwd } from '../common/utils/hashPwd';

@Injectable()
export class UserService {
  constructor(@Inject(UserHelperService) private userHelperService: UserHelperService) {}

  async findOne(id: string): Promise<GetUserResponse> {
    if (!id) throw new BadRequestException();

    const user = await this.getUser({ id });
    if (!user) throw new NotFoundException();

    return this.userHelperService.filterUserByRole(user);
  }

  async changePassword(
    id: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<ChangePasswordResponse> {
    if (!id) throw new BadRequestException();

    const user = await User.findOne({
      where: { id },
    });
    if (!user) throw new NotFoundException();

    const { password, newPassword } = changePasswordDto;
    const hashCompareResult = await compare(password, user.hashPwd);

    if (hashCompareResult) {
      user.hashPwd = newPassword ? await hashPwd(newPassword) : user.hashPwd;
      await user.save();
    } else throw new UnauthorizedException();

    return { ok: true };
  }

  async getUser(where: Partial<UserInterface>): Promise<User> {
    return User.findOne({
      where,
      relations: [
        'hr',
        'student',
        'student.bonusProjectUrls',
        'student.portfolioUrls',
        'student.projectUrls',
      ],
    });
  }
}
