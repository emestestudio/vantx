import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email)
    if (!user) throw new UnauthorizedException('Credenciales inválidas')

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) throw new UnauthorizedException('Credenciales inválidas')

    const payload = { userId: user.id, companyId: user.companyId }
    const token = this.jwtService.sign(payload)

    return { token, userId: user.id, companyId: user.companyId }
  }

  async register(email: string, password: string, name: string, companyId: string) {
    const exists = await this.usersService.findByEmail(email)
    if (exists) throw new UnauthorizedException('El email ya está registrado')

    const user = await this.usersService.create({ email, password, name, companyId })
    const payload = { userId: user.id, companyId: user.companyId }
    const token = this.jwtService.sign(payload)

    return { token, userId: user.id, companyId: user.companyId }
  }
}