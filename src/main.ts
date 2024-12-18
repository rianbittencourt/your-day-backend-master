import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configuração do CORS para permitir solicitações de origens diferentes
  app.enableCors({
    origin: 'http://localhost:3000', // Substitua pelo URL do seu frontend em produção
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Define se o servidor permitirá credenciais na solicitação
  });

  await app.listen(3001);
}
bootstrap();
