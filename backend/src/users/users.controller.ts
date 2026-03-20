import { Controller, Get, Patch, Delete, Body, Param, UseGuards, Request } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { UsersService } from './users.service'

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll(@Request() req: any) {
    return this.usersService.findAll(req.user.companyId)
  }

  @Get('me')
  getMe(@Request() req: any) {
    return this.usersService.findById(req.user.userId)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findById(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: { name?: string; email?: string }) {
    return this.usersService.update(id, body)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id)
  }
}