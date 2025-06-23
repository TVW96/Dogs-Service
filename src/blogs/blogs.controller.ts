import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';

class BlogDto {
  id: number;
  title: string;
  body: string;
  userId: number;
}

@Controller('blogs')
export class BlogsController {
  private blogs: BlogDto[] = [];

  @Get()
  findAll(): BlogDto[] {
    return this.blogs;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): BlogDto {
    const blog = this.blogs.find((b) => b.id === id);
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return blog;
  }

  @Post()
  create(@Body() blogData: Omit<BlogDto, 'id'>): BlogDto {
    const newId =
      this.blogs.length > 0 ? Math.max(...this.blogs.map((b) => b.id)) + 1 : 1;
    const newBlog = { ...blogData, id: newId };
    this.blogs.push(newBlog);
    return newBlog;
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedBlog: BlogDto,
  ): BlogDto {
    const index = this.blogs.findIndex((b) => b.id === id);
    if (index === -1) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    this.blogs[index] = updatedBlog;
    return updatedBlog;
  }

  @Patch(':id')
  patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() partialUpdate: Partial<BlogDto>,
  ): BlogDto {
    const blog = this.blogs.find((b) => b.id === id);
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }

    Object.assign(blog, partialUpdate);
    return blog;
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): { message: string } {
    const index = this.blogs.findIndex((b) => b.id === id);
    if (index === -1) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }

    this.blogs.splice(index, 1);
    return { message: `Blog with ID ${id} deleted` };
  }
}
