import { Module } from '@nestjs/common'
import { UsersService } from './users.service'

@Module({
  providers: [UsersService],
  exports: [UsersService], // 👈 ESTO ES LO QUE TE FALTA CASI SEGURO
})
export class UsersModule {}