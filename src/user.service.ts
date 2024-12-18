// user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async getUser(googleID: string): Promise<User | null> {
    return this.userModel.findOne({ googleID }).exec();
  }

  async findByGoogleId(googleId: string): Promise<User | null> {
    try {
      return await this.userModel.findOne({ googleID: googleId });
    } catch (error) {
      console.error('Erro ao encontrar usuário:', error);
      return null;
    }
  }

  async createUser(
    name: string,
    gender: string,
    nationality: string,
    googleID: string,
    birthday: Date,
  ): Promise<User> {
    const newUser = new this.userModel({
      _id: new mongoose.Types.ObjectId(), // Adiciona um novo _id gerado pelo MongoDB
      name,
      gender, 
      nationality,
      googleID,
      isPremium: false,
      birthday
    });
    return newUser.save();
  }
}
