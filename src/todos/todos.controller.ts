import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, HttpCode } from '@nestjs/common';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly service: TodosService) {}

  @Get()
  getAll() {
    return this.service.findAll();
  }

  @Post()
  create(@Body() body: { title: string; description?: string }) {
    return this.service.create(body.title, body.description);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    const todo = this.service.findOne(id);
    if (!todo) throw new NotFoundException();
    return todo;
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: { title?: string; description?: string; status?: 'pending' | 'in_progress' | 'done' },
  ) {
    const todo = this.service.update(id, body);
    if (!todo) throw new NotFoundException();
    return todo;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    const ok = this.service.remove(id);
    if (!ok) throw new NotFoundException();
  }
}
