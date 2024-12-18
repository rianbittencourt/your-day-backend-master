import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation } from '@nestjs/swagger'; // Importando a anotação para documentação
import { AuthService } from './auth.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService, // Adicione o AuthService ao construtor
  ) {}

  // Exemplo de uso do método getUser
  @ApiOperation({ summary: 'Encontra um usuário pelo Google ID' }) // Descrição para documentação
  @Get(':googleID')
  async findUser(@Param('googleID') googleID: string) {
    try {
      const user = await this.userService.getUser(googleID);
      if (user) {
        return user;
      } else {
        return { message: 'Usuário não encontrado.' };
      }
    } catch (error) {
      return { error: 'Erro ao acessar o banco de dados.' };
    }
  }

  @Post('verify-token')
  async verifyAccessToken(@Body() { accessToken }: { accessToken: string }) {
    try {
      const tokenInfo = await this.authService.verifyAccessToken(accessToken);
      return { message: 'Token válido', data: tokenInfo };
    } catch (error) {
      // Se o token for inválido, retornar uma exceção com o código de status HTTP apropriado
      throw new HttpException('Token inválido', HttpStatus.UNAUTHORIZED);
    }
  }

  // Exemplo de uso do método createUser
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @Post()
  async createUser(@Body() user: any) {
    try {
      const newUser = await this.userService.createUser(
        user.name,
        user.gender,
        user.nationality,
        user.googleID,
        new Date(),
      );
      return newUser;
    } catch (error) {
      return { error: 'Erro ao criar o usuário.' };
    }
  }

  @ApiOperation({ summary: 'Login Google' }) // Descrição para documentação
  @Post('login')
  async loginWithGoogle(
    @Body()
    {
      googleID,
      name,
      email,
    }: {
      googleID: string;
      name: string;
      email: string;
    },
  ) {
    try {
      console.log('Requisição para /users/login:', { googleID, name, email });

      // Verificar se o usuário ainda existe no banco de dados
      let user = await this.userService.getUser(googleID);

      if (!user) {
        console.log('Usuário não encontrado. Criando novo usuário...');
        // Criar um novo usuário
        user = await this.userService.createUser(
          name, // Troquei para firstName

          '', // Adicionei um espaço vazio para o gender, pode ser modificado conforme necessário
          '', // Adicionei um espaço vazio para o nationality, pode ser modificado conforme necessário
          googleID,
          new Date(),
        );
      }

      return user;
    } catch (error) {
      // Tratar erros de forma adequada
      console.error('Erro ao fazer login com o Google:', error);
      return { error: 'Erro ao fazer login com o Google.' };
    }
  }
}
