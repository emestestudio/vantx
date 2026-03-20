import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ProjectsService } from './projects.service'

@Controller('projects')
@UseGuards(AuthGuard('jwt'))
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  findAll(@Request() req: any) {
    return this.projectsService.findAll(req.user.companyId)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id)
  }

  @Post()
  create(@Body() body: { name: string; description?: string }, @Request() req: any) {
    return this.projectsService.create({
      name: body.name,
      description: body.description,
      companyId: req.user.companyId,
    })
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: { name?: string; description?: string }) {
    return this.projectsService.update(id, body)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.projectsService.delete(id)
  }
}