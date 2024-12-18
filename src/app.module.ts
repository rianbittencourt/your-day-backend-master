// app.module.ts
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from './auth.middleware';
import { UserService } from './user.service';
import { User, UserSchema } from './user.schema';
import { UserController } from './user.controller';
import { AuthService } from './auth.service';
import { Post, PostSchema } from './post.schema'; // Importe o Post e o PostSchema aqui
import { PostController } from './post.controller'; // Importe o PostController aqui
import { PostService } from './post.service'; // Importe o PostService aqui

@Module({
  imports: [
    MongooseModule.forRoot(
      (process.env.MONGODB_URI),
    ),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]), // Adicione a configuração do PostModel aqui
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [UserController, PostController], // Adicione o PostController aqui
  providers: [UserService, AuthService, PostService], // Adicione o PostService aqui
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
