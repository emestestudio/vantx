import { Module } from '@nestjs/common'

// controllers
import { ProjectsController } from './projects/projects.controller'

// services (IMPORTANTE)
import { AuthService } from './auth/auth.service'

// prisma
import { PrismaService } from './prisma/prisma.service'

@Module({
  imports: [],
  controllers: [ProjectsController],
  providers: [
    AuthService,
    PrismaService,
  ],
})
export class AppModule {}