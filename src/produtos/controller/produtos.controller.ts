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
  import { ProdutosService } from './produtos.service';
  import { Produto } from './entities/produto.entity';
  
  @Controller('/produtos')
  export class ProdutosController {
    constructor(private readonly produtosService: ProdutosService) {}
  
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() produto: Produto): Promise<Produto> {
      return this.produtosService.create(produto);
    }
  
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Produto[]> {
      return this.produtosService.findAll();
    }
  
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Produto> {
      return this.produtosService.findById(id);
    }
  
    @Get('/preco_maior/:preco')
    @HttpCode(HttpStatus.OK)
    findByPrecoMaior(@Param('preco') preco: number): Promise<Produto[]> {
      return this.produtosService.findByPrecoMaior(preco);
    }
  
    @Get('/preco_menor/:preco')
    @HttpCode(HttpStatus.OK)
    findByPrecoMenor(@Param('preco') preco: number): Promise<Produto[]> {
      return this.produtosService.findByPrecoMenor(preco);
    }
  
    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() produto: Produto): Promise<Produto> {
      return this.produtosService.update(produto);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
      return this.produtosService.delete(id);
    }
  }