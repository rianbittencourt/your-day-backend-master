import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor() {}

  async verifyAccessToken(accessToken: string): Promise<any> {
    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      return decoded;
    } catch (error) {
      // Se o token for inválido, jwt.verify() irá lançar uma exceção
      throw new Error('Token inválido');
    }
  }
}
