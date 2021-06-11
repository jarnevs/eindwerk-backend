import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PostsController } from "./posts.controller";
import { PostsSchema } from "./posts.model";
import { PostsService } from "./posts.service";

@Module(
  {
    imports: [MongooseModule.forFeature([{ name: 'Post', schema: PostsSchema }])],
    controllers: [PostsController],
    providers: [PostsService],
  }
)
export class PostsModule {}