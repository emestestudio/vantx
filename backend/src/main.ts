import { NestFactory } from '@nestjs/core'
import { Module, Controller, Post, Body, Get, Headers } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'

const SECRET = 'vantx_secret'

// 🔥 FAKE DB (funciona ya)
let users = [
  { id: 1, email: 'admin@vantx.cl', password: '123456', companyId: 1 },
]

let projects: any[] = []

// 🔐 AUTH CONTROLLER
@Controller('auth')
class AuthController {
  @Post('login')
  login(@Body() body: any) {
    const user = users.find(
      (u) => u.email === body.email && u.password === body.password,
    )

    if (!user) {
      return { error: 'Credenciales incorrectas' }
    }

    const token = jwt.sign(
      { userId: user.id, companyId: user.companyId },
      SECRET,
    )

    return { access_token: token }
  }
}

// 🏢 PROJECTS CONTROLLER
@Controller('projects')
class ProjectsController {
  @Get()
  getProjects(@Headers('authorization') auth: string) {
    const token = auth?.split(' ')[1]

    try {
      const decoded: any = jwt.verify(token, SECRET)

      return projects.filter(p => p.companyId === decoded.companyId)
    } catch {
      return []
    }
  }

  @Post()
  createProject(@Body() body: any, @Headers('authorization') auth: string) {
    const token = auth?.split(' ')[1]

    try {
      const decoded: any = jwt.verify(token, SECRET)

      const newProject = {
        id: Date.now(),
        name: body.name,
        status: 'Activo',
        companyId: decoded.companyId,
      }

      projects.push(newProject)

      return newProject
    } catch {
      return { error: 'No autorizado' }
    }
  }
}

// 🧱 MODULE
@Module({
  controllers: [AuthController, ProjectsController],
})
class AppModule {}

// 🚀 BOOTSTRAP
async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: '*',
  })

  await app.listen(3001)

  console.log('🔥 VANTX BACKEND RUNNING http://localhost:3001')
}
bootstrap()