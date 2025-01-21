import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    HttpCode,
    HttpStatus,
    ParseIntPipe,
    Put,
  } from '@nestjs/common';
  import { CategoriasService } from './categorias.service';
  import { Categoria } from './entities/categoria.entity';
  
  
  @Controller('/categorias')
  export class CategoriasController {
    constructor(private readonly categoriasService: CategoriasService) {}
  
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() categoria: Categoria): Promise<Categoria> {
      return this.categoriasService.create(categoria);
    }
  
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Categoria[]> {
      return this.categoriasService.findAll();
    }
  
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Categoria> {
      return this.categoriasService.findById(id);
    }
  
    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() categoria: Categoria): Promise<Categoria> {
      return this.categoriasService.update(categoria);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
      return this.categoriasService.delete(id);
    }
  }
  