import { Category } from '../category.entity';

export class CreateCategoryDto {
  name: string;

  parent?: number;

  children?: Category[];

  constructor(category: Partial<Category>) {
    Object.assign(this, category);
  }
}
