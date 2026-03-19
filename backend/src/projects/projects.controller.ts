import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ProjectsService } from './projects.service'

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@Request() req: any) {
    return this.projectsService.findAll(req.user.companyId)
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() body: { name: string; description?: string }, @Request() req: any) {
    return this.projectsService.create({
      name: body.name,
      description: body.description,
      companyId: req.user.companyId,
    })
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  delete(@Param('id') id: string) {
    return this.projectsService.delete(id)
  }
}