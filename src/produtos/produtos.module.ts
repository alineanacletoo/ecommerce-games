import { Module } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { CategoriasModule } from '../categorias/categorias.module';
import { CategoriasService } from '../categorias/categorias.service';

@Module({
  imports: [TypeOrmModule.forFeature([Produto]), CategoriasModule],
  controllers: [ProdutosController],
  providers: [ProdutosService, CategoriasService],
  exports: [TypeOrmModule],
})
export class ProdutosModule {}