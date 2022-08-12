import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { RoleGuard } from '../common/guards/role.guard';
import { SetRole } from '../common/decorators/set-role';
import { FindAllNotificationQueryDto } from './dto/find-all-notification-query.dto';
import { GetNotificationsResponse } from '../types/admin/notification-response';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('/admin')
export class AdminController {
  constructor(@Inject(AdminService) private notificationService: AdminService) {}

  @Get('/notification')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @SetRole('admin')
  async findAllNotifications(
    @Query() query: FindAllNotificationQueryDto,
  ): Promise<GetNotificationsResponse> {
    return this.notificationService.findAllNotifications(query);
  }
}
