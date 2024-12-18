import {
  Prop,
  Schema,
  SchemaFactory,

} from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from './user.schema';
import * as mongoose from 'mongoose'; // Importar mongoose

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, required: true }) // Data específica do post enviado pelo front-end
  date: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' }) // Usar mongoose.Schema.Types.ObjectId
  createdBy: User;

  @Prop({ type: Number, default: 0 }) // Número de visualizações do post
  views: number;

}

export const PostSchema = SchemaFactory.createForClass(Post);
