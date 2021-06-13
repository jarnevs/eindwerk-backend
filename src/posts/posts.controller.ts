import { Body, Controller, Delete, Get, Param, Patch, Post, Request } from "@nestjs/common";
import { PostsService } from "./posts.service";

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {};

  @Get(':id')
  async getPost(
      @Param('id') id: string
  ) {
    return await this.postsService.getPost(id);
  }

  @Get('posts/user')
  async getPostsUser(
    @Request() req
  ) {
    const { user } = req;
    return await this.postsService.getPostsUser(user.userId);
  }

  @Get('comments/:id')
  async getCommentsPost(
      @Param('id') parentId: string
  ) {
    return await this.postsService.getCommentsPost(parentId);
  }

  @Get('artist/:id')
  async getPostsArtist(
      @Param('id') artistId: string
  ) {
    return await this.postsService.getPostsArtist(artistId);
  }

  @Post()
  async createPost(
    @Request() req,
    @Body() post: { message: string, artistId: string }
  ) {
    const { user } = req;
    return await this.postsService.createPost(user.userId, post);
  }

  @Post(':id')
  async createComment(
    @Request() req,
    @Param('id') parentPostId: string,
    @Body() post: { message: string, artistId: string }
  ) {
    const { user } = req;
    return await this.postsService.createPost(user.userId, post, parentPostId);
  }

  @Patch('/like/:id')
  async likePost(
    @Request() req,
    @Param('id') postId: string, 
  ) {
    const { user } = req;
    return await this.postsService.likePost(user.userId, postId);
  }
}