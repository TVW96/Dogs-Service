import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

interface Dog {
  id: number;
  name: string;
  age: number;
}

@Controller('dogs')
export class DogsController {
  private dogs: Dog[] = [];
  private idCounter = 1;

  @Get()
  getAllDogs(): Dog[] {
    return this.dogs;
  }

  @Post()
  createDog(
    @Body() body: { name: string; age: number },
    @Res() res: Response,
  ): void {
    if (!body.name || typeof body.age !== 'number') {
      throw new HttpException('Invalid input', HttpStatus.BAD_REQUEST);
    }

    const newDog: Dog = {
      id: this.idCounter++,
      name: body.name,
      age: body.age,
    };
    this.dogs.push(newDog);
    res.status(HttpStatus.CREATED).json({
      message: 'Dog created successfully',
      dog: newDog,
    });
  }

  @Get(':id')
  getDogById(@Param('id') id: string): Dog {
    const dog = this.dogs.find((d) => d.id === +id);
    if (!dog) {
      throw new HttpException('Dog not found', HttpStatus.NOT_FOUND);
    }
    return dog;
  }

  @Put(':id')
  updateDogById(
    @Param('id') id: string,
    @Body() body: { name?: string; age?: number },
  ): Dog {
    const index = this.dogs.findIndex((d) => d.id === +id);
    if (index === -1) {
      throw new HttpException('Dog not found', HttpStatus.NOT_FOUND);
    }

    this.dogs[index] = { ...this.dogs[index], ...body };
    return this.dogs[index];
  }

  @Delete(':id')
  deleteDogById(@Param('id') id: string): { message: string } {
    const index = this.dogs.findIndex((d) => d.id === +id);
    if (index === -1) {
      throw new HttpException('Dog not found', HttpStatus.NOT_FOUND);
    }
    this.dogs.splice(index, 1);
    return { message: `Dog with ID ${id} deleted successfully` };
  }
}
