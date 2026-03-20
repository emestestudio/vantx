import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Controller('projects')
export class ProjectsController {

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@Request() req: any) {
    return [{ message: 'Projects funcionando 🚀', userId: req.user.userId }]
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() body: any, @Request() req: any) {
    return {
      message: 'Proyecto creado',
      name: body.name,
      userId: req.user.userId,
      companyId: req.user.companyId,
    }
  }
}
