import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ResultsService } from './results.service';
import { CreateResultDto } from './dto/create-result.dto';
import { Results } from './entities/results.entity/results.entity';
import { UpdateResultDto } from './dto/update-result.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('results')
export class ResultsController {
  constructor(private readonly resultService: ResultsService) {}

  // Tạo mới kết quả
  @Post()
  async create(@Body() createResultDto: CreateResultDto): Promise<Results> {
    return this.resultService.create(createResultDto); 
  }

  // Lấy tất cả kết quả
  @Get()
  async findAll(): Promise<Results[]> {
    return this.resultService.findAll(); 
  }

  // Lấy một kết quả theo ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Results> {
    return this.resultService.findOne(id); 
  }


  // Xóa kết quả
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async remove(@Param('id') id: string): Promise<void> {
    return this.resultService.remove(id); // Đảm bảo phương thức remove() trong service đã hoạt động chính xác
  }
}
