import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // GET /api/products
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  // GET /api/products/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  // POST /api/products
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: any) {
    return this.productsService.create(body);
  }

  // PUT /api/products/:id
  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.productsService.update(id, body);
  }

  // DELETE /api/products/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
