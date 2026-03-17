import { Controller, Get } from '@nestjs/common'

@Controller('projects')
export class ProjectsController {
  @Get()
  findAll() {
    return [{ message: 'Projects funcionando 🚀' }]
  }
}