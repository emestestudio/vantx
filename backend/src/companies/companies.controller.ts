import { Controller, Get, Post, Body } from '@nestjs/common';
import { CompaniesService } from './companies.service';

@Controller('companies')
export class CompaniesController {

  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  create(@Body() body: { name: string; rut: string; email?: string; phone?: string }) {
    return this.companiesService.create(body);
  }

  @Get()
  findAll() {
    return this.companiesService.findAll();
  }

}