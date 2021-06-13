import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import {  Post, PostData } from "./posts.model";

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('Post') private readonly postModel: Model<Post>
  ) {}

  async getPost(id: string) {
    try {
      const post: any = await this.postModel.findById(id).populate('artistId userId', 'id firstname lastname artistName').exec();
      return {
        id: post._id,
        artist: {
          id: post.artistId.id,
          name: post.artistId.artistName
        },
        user: {
          firstname: post.userId.firstname,
          lastname: post.userId.lastname,
        },
        message: post.message,
        likedBy: post.likedBy,
        createdOn: post.createdOn,
      };
    } catch (e) {
      return e.response;
    }
  }

  async getPostsUser(userId: string) {
    try {
      const posts = await this.postModel.find({ userId, parentId: null }).populate('artistId userId', 'id firstname lastname artistName').exec();
      return this.mapPosts(posts);
    } catch (e) {
      return e.response;
    }
  }

  async getCommentsPost(parentId: string) {
    try {
      const posts = await this.postModel.find({ parentId }).populate('artistId userId', 'id firstname lastname artistName').exec();
      return this.mapPosts(posts);
    } catch (e) {
      return e.response;
    }
  }
  
  async getPostsArtist(artistId: string) {
    try {
      const posts = await this.postModel.find({ artistId, parentId: null }).populate('artistId userId', 'id firstname lastname artistName').exec();
      return this.mapPosts(posts);
    } catch (e) {
      return e.response;
    }
  }

  async createPost(userId: string, post: { message: string, artistId: string }, parentId?:string): Promise<{id: string}> {
    try {
      let postData = {
        userId,
        ...post,
        createdOn: Date.now(),
      } as PostData;

      if (parentId) {
        postData = {
          parentId,
          ...postData,
        }
      }
      
      const createdPost = await this.postModel.create(postData);

      return {
        id: createdPost.id,
      };
    } catch (e) {
      return e.response;
    }
  }

  async likePost(userId: string, postId: string) {
    try  {
      const post: Post = await this.postModel.findById(postId);
      
      if (!post.likedBy.includes(userId)) {
        await this.postModel.findByIdAndUpdate(
          {_id: postId},
          {
            $addToSet: {
              likedBy: userId,
            }
          }
        )
      } else {
        await this.postModel.findByIdAndUpdate(
          {_id: postId},
          {
            $pull: {
              likedBy: userId,
            }
          }
        )
      }

      const updatedPost: any = await this.postModel.findById(postId).populate('artistId userId', 'id firstname lastname artistName').exec();

      return {
        id: updatedPost._id,
        artist: {
          id: updatedPost.artistId.id,
          name: updatedPost.artistId.artistName,
        },
        user: {
          firstname: updatedPost.userId.firstname,
          lastname: updatedPost.userId.lastname,
        },
        message: updatedPost.message,
        likedBy: updatedPost.likedBy,
        createdOn: updatedPost.createdOn,
      };
    } catch(e) {
      return e.response;
    }
  }

  private mapPosts(posts: any[]) {
    return posts.map(({ _id, artistId, userId, message, likedBy, parentId, createdOn }) => ({
      id: _id,
      artist: {
        id: artistId.id,
        name: artistId.artistName
      },
      user: {
        id: userId.id,
        firstname: userId.firstname,
        lastname: userId.lastname,
      },
      parentId,
      message,
      likedBy,
      createdOn,
    }));
  }
}