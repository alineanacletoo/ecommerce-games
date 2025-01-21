import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { DeleteResult, LessThan, MoreThan, Repository } from 'typeorm';
import { CategoriasService } from '../categorias/categorias.service';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
    private categoriasServicce: CategoriasService
  ) {}

  async create(produto: Produto): Promise<Produto> {
    await this.categoriasServicce.findById(produto.categoria.id);
    return await this.produtoRepository.save(produto);
  }

  async findAll(): Promise<Produto[]> {
    return this.produtoRepository.find({relations: {categoria: true}});
  }

  async findById(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({ where: { id }, relations: {categoria: true} });

    if (!produto) {
      throw new HttpException('Produto não encontrado.', HttpStatus.NOT_FOUND);
    }

    return produto;
  }

  async findByPrecoMaior(preco: number): Promise<Produto[]> {
    return this.produtoRepository.find({ where: { preco: MoreThan(preco) }, relations: {categoria: true} });
  }

  async findByPrecoMenor(preco: number): Promise<Produto[]> {
    return this.produtoRepository.find({ where: { preco: LessThan(preco) }, relations: {categoria: true} });
  }

  async update(produto: Produto): Promise<Produto> {
    await this.findById(produto.id);
    await this.categoriasServicce.findById(produto.categoria.id);
    return await this.produtoRepository.save(produto);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.produtoRepository.delete(id);
  }
}
