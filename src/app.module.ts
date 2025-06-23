import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DogsController } from './dogs/dogs.controller';
import { DogsModule } from './dogs/dogs.module';
import { BlogsController } from './blogs/blogs.controller';
import { BlogsModule } from './blogs/blogs.module';

@Module({
  imports: [DogsModule, BlogsModule],
  controllers: [AppController, DogsController, BlogsController],
  providers: [AppService],
})
export class AppModule { }
