import { Controller, Post, Req, Res } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { BadRequest } from 'src/shared/DTO/BadRequest';
import { ErrorModel } from 'src/config/errors/ErrorModel';
import { LoginService } from './services/login.service';
import { LoginDTO } from '../../DTOs/LoginDTO';
import { LoginResponseDTO } from '../../DTOs/LoginResponseDTO';

@Controller('login')
@ApiTags('User: Login')
@ApiResponse({ type: BadRequest, status: 400 })
@ApiResponse({ type: ErrorModel, status: 500 })
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @ApiBody({ type: LoginDTO })
  @ApiResponse({ type: LoginResponseDTO, status: 200 })
  async createUser(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    const body: LoginDTO = request.body;

    const responseData = await this.loginService.login(body);

    return response.status(200).json(responseData);
  }
}
