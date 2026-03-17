import { Module } from '@nestjs/common'
import { ProjectsController } from './projects/projects.controller'
import { AuthController } from './auth/auth.controller'
import { UsersController } from './users/users.controller'

@Module({
  controllers: [
    ProjectsController,
    AuthController,
    UsersController
  ],
})
export class AppModule {}