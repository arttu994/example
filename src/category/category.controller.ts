import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import permission from '../constants/permission';
import { RequiredPermissions } from '../decorators/permissions.decorator';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('add')
  @RequiredPermissions(permission.CATEGORY_CREATE)
  async addCategory(category: CreateCategoryDto) {
    return this.categoryService.addCategory(category);
  }

  @Get('find/category/:id')
  @RequiredPermissions(permission.CATEGORY_READ)
  async findCategoryTree(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.findCategoryTree(id);
  }

  @Get('find/all')
  @RequiredPermissions(permission.CATEGORY_READ)
  async findAllCategories() {
    return this.categoryService.findAllCategories();
  }

  @Get('find/:id')
  @RequiredPermissions(permission.CATEGORY_READ)
  async findCategoryById(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.findCategoryById(id);
  }
}
