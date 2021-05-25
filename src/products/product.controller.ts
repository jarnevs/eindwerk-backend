import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { Public } from "src/public.decorator";
import { ProductsService } from "./product.service";

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {};

  @Get()
  async getProducts() {
    return await this.productService.getProducts();
  }

  @Get(':id')
  async getProduct(
    @Param('id') prodId: string
  ) {
    return await this.productService.getProduct(prodId);
  }

  @Public()
  @Post()
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('desc') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const generatedId = await this.productService.insertProduct(prodTitle, prodDesc, prodPrice);
    return { id: generatedId }
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('desc') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    await this.productService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
    return null;
  }

  @Delete(':id')
  async deleteProduct(
      @Param('id') prodId: string
  ) {
    await this.productService.deleteProduct(prodId);
    return null;
  }
}