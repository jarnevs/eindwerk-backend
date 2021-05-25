import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import {  Product } from "./product.model";

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>) {}

  async getProducts() {
    const result = await this.productModel.find().exec();
    return result.map((prod) => ({id: prod.id, title: prod.title, description: prod.description, price: prod.price}));
  }

  async getProduct(prodId: string) {
    const product = await this.findProduct(prodId);
    return {id: product.id, title: product.title, description: product.description, price: product.price};
  }

  async insertProduct(title: string, desc: string, price: number) {
    const newProduct = new this.productModel({title, description: desc, price});
    const result = await newProduct.save();
    return result.id as string;
  }

  async updateProduct(productId: string, title: string, desc: string, price: number) {
    const updatedProduct = await this.findProduct(productId);
    

    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.description = desc;
    }
    if (price) {
      updatedProduct.price = price;
    }
    updatedProduct.save();
  }

  deleteProduct(prodId: string) {
    return this.productModel.findByIdAndDelete(prodId );
  }

  private async findProduct(id: string): Promise<Product> {
    let product;

    try {
      product = await this.productModel.findById(id);
    } catch (err) {
      throw new NotFoundException('Product not found');
    }
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }
}