import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import axios from 'axios';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token de acesso não fornecido' });
    }

    try {
      // Faz uma chamada à API de userinfo do Google usando o AccessToken
      const response = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Verifica se a chamada à API foi bem-sucedida
      if (response.status === 200) {
        // Obtemos o googleID da resposta da API
        const googleIDFromToken = response.data.sub;

        // Verifica se o googleID enviado na requisição é igual ao googleID do AccessToken
        if (
          googleIDFromToken === req.body.googleID ||
          googleIDFromToken === req.body.googleId
        ) {
          // Se os googleIDs coincidirem, prossegue para a próxima middleware
          next();
        } else {
          // Se os googleIDs não coincidirem, a autenticação falha
          return res
            .status(403)
            .json({ message: 'Falha na autenticação: googleID inválido' });
        }
      } else {
        // Se a chamada falhou, o AccessToken é inválido
        return res.status(403).json({ message: 'Token inválido' });
      }
    } catch (error) {
      // Se ocorrer um erro ao fazer a chamada à API, o AccessToken é inválido
      return res.status(403).json({ message: 'Token inválido' });
    }
  }
}
