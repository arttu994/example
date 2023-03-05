import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import permission from '../constants/permission';
import { RequiredPermissions } from '../decorators/permissions.decorator';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('add')
  @RequiredPermissions(permission.PRODUCT_CREATE)
  async addProduct(@Body() product) {
    return this.productService.addProduct(product);
  }

  @Get('find/all')
  @RequiredPermissions(permission.PRODUCT_READ)
  async findAllProducts() {
    return this.productService.findAllProducts();
  }

  @Get('find/:id')
  @RequiredPermissions(permission.PRODUCT_READ)
  async findProductById(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findProductById(id);
  }
}
