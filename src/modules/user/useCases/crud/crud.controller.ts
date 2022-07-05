import { Controller, Post, Req, Res } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserService } from './services/create.user.service';
import { Request, Response } from 'express';
import { CreateUserDTO } from '../../DTOs/CreateUserDTO';
import { UserDTO } from '../../DTOs/UserDTO';
import { BadRequest } from 'src/shared/DTO/BadRequest';
import { ErrorModel } from 'src/config/errors/ErrorModel';

@Controller()
@ApiTags('User: CRUD')
@ApiResponse({ type: BadRequest, status: 400 })
@ApiResponse({ type: ErrorModel, status: 500 })
export class CrudController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  @ApiBody({ type: CreateUserDTO })
  @ApiResponse({ type: UserDTO, status: 201 })
  async createUser(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    const body: CreateUserDTO = request.body;

    const responseData = await this.createUserService.createUser(body);

    return response.status(201).json(responseData);
  }
}
