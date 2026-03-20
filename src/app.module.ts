import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { CompaniesModule } from './companies/companies.module'
import { ProjectsController } from './projects/projects.controller'
import { PrismaModule } from './prisma/prisma.module'

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    CompaniesModule,
  ],
  controllers: [ProjectsController],
})
export class AppModule {}
