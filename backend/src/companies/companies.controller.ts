import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { CompaniesService } from './companies.service'

@Controller('companies')
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @Post()
  create(@Body() body: { name: string }) {
    return this.companiesService.create(body.name)
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.companiesService.findAll()
  }
}