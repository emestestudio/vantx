import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {

 constructor(
  private usersService: UsersService,
  private jwtService: JwtService,
 ) {}

 async register(data: any) {

  const hashedPassword = await bcrypt.hash(data.password, 10)

  const user = await this.usersService.create({
   ...data,
   password: hashedPassword,
  })

  const token = this.jwtService.sign({
   userId: user.id,
   companyId: user.companyId
  })

  return { token }

 }

 async login(email: string, password: string) {

  const user = await this.usersService.findByEmail(email)

  if (!user) {
   throw new UnauthorizedException()
  }

  const valid = await bcrypt.compare(password, user.password)

  if (!valid) {
   throw new UnauthorizedException()
  }

  const token = this.jwtService.sign({
   userId: user.id,
   companyId: user.companyId
  })

  return { token }

 }

}