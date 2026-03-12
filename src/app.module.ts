import { Module } from '@nestjs/common';
import { TodosController } from './todos/todos.controller';

@Module({
  controllers: [TodosController],
})
export class AppModule {}
