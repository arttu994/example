import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: TreeRepository<Category>,
  ) {}

  async addCategory(category: CreateCategoryDto) {
    const newCategory = new Category();
    newCategory.name = category.name;

    if (category.parent) {
      const parent = await this.categoryRepository.findOne({
        where: { id: category.parent },
      });
      newCategory.parent = parent;
    }
    return await this.categoryRepository.save(newCategory);
  }

  async findCategoryTree(id: number) {
    const parentCategory = await this.categoryRepository.findOneBy({ id });

    return this.categoryRepository.findDescendants(parentCategory, {
      relations: ['children'],
    });
  }

  async findAllCategories() {
    return this.categoryRepository.find();
  }

  async findCategoryById(id: number) {
    return this.categoryRepository.findOne({
      where: { id },
      relations: ['children'],
    });
  }
}
