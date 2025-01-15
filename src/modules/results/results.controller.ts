import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ResultsService } from './results.service';
import { CreateResultDto } from './dto/create-result.dto';
import { Results } from './entities/results.entity/results.entity';
import { UpdateResultDto } from './dto/update-result.dto';

@Controller('results')
export class ResultsController {
  constructor(private readonly resultService: ResultsService) {}

  // Tạo mới kết quả
  @Post()
  async create(@Body() createResultDto: CreateResultDto): Promise<Results> {
    return this.resultService.create(createResultDto); // Đảm bảo phương thức createResult() trong service trả về kết quả
  }

  // Lấy tất cả kết quả
  @Get()
  async findAll(): Promise<Results[]> {
    return this.resultService.findAll(); // Đảm bảo phương thức này được định nghĩa trong service
  }

  // Lấy một kết quả theo ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Results> {
    return this.resultService.findOne(id); // Đảm bảo phương thức này trả về một kết quả cụ thể
  }

  // Cập nhật kết quả
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateResultDto: UpdateResultDto): Promise<Results> {
    return this.resultService.update(id, updateResultDto); // Đảm bảo phương thức update() trong service đã hoạt động chính xác
  }

  // Xóa kết quả
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.resultService.remove(id); // Đảm bảo phương thức remove() trong service đã hoạt động chính xác
  }
}
