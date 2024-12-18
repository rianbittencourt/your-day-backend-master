import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './post.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
  ) {}

  async createPost(postData: any, userId: string): Promise<Post> {
    const currentDate = new Date();

    if (postData.date > currentDate) {
      throw new Error('Não é possível fazer uma postagem com uma data futura.');
    }

    const existingPost = await this.postModel.findOne({
      createdBy: userId,
      date: postData.date,
    });

    if (existingPost) {
      throw new Error('Já existe uma postagem sua neste dia.');
    }

    const createdPost = new this.postModel({
      ...postData,
      createdBy: userId,
    });

    await createdPost.save();

    return createdPost;
  }

  async getPostsByUser(userId: string): Promise<Post[]> {
    const posts = await this.postModel.find({ createdBy: userId }).exec();
    return posts;
  }
}
