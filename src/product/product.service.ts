import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async addProduct(product) {
    return this.productRepository.save(product);
  }

  async findAllProducts() {
    return this.productRepository.find();
  }

  async findProductById(id: number) {
    return this.productRepository.findOneBy({ id });
  }
}
