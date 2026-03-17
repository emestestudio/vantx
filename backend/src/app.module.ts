import { Module } from '@nestjs/common'
import { ProjectsController } from './projects/projects.controller'

@Module({
  controllers: [ProjectsController],
})
export class AppModule {}