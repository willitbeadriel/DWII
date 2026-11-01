import { Request, Response } from 'express';
import { Livro } from '../models/livro';

// Armazenamento em memória através de array[cite: 1, 3]
const livros: Livro[] = [];

// Função de validação interna[cite: 3]
function validarDadosLivro(body: any): string | null {
  const { titulo, autor, editora, anoEdicao, genero, isbn } = body;

  if (!titulo || typeof titulo !== 'string' || titulo.trim() === '') {
    return 'O campo titulo é obrigatório';
  }
  if (!autor || typeof autor !== 'string' || autor.trim() === '') {
    return 'O campo autor é obrigatório';
  }
  if (!editora || typeof editora !== 'string' || editora.trim() === '') {
    return 'O campo editora é obrigatório';
  }
  if (anoEdicao === undefined || typeof anoEdicao !== 'number' || isNaN(anoEdicao)) {
    return 'O campo anoEdicao é obrigatório e deve ser numérico';
  }
  if (!genero || typeof genero !== 'string' || genero.trim() === '') {
    return 'O campo genero é obrigatório';
  }
  if (!isbn || typeof isbn !== 'string' || isbn.trim() === '') {
    return 'O campo isbn é obrigatório';
  }

  return null;
}

// Handler da Rota Principal GET /[cite: 2]
export const statusApi = (_req: Request, res: Response) => {
  res.status(200).json({ mensagem: 'API Biblioteca funcionando!' });
};

// Handler para consultar todos os livros GET /livros[cite: 2]
export const listarLivros = (_req: Request, res: Response) => {
  res.status(200).json(livros);
};

// Handler para consultar livro por ISBN GET /livros/:isbn[cite: 2, 3]
export const obterLivroPorIsbn = (req: Request, res: Response) => {
  const { isbn } = req.params;
  const livroEncontrado = livros.find((l) => l.isbn === isbn);

  if (!livroEncontrado) {
    res.status(404).json({ erro: 'Livro não encontrado' });
    return;
  }

  res.status(200).json(livroEncontrado);
};

// Handler para cadastrar novo livro POST /livros[cite: 2, 3]
export const cadastrarLivro = (req: Request, res: Response) => {
  const erroValidacao = validarDadosLivro(req.body);
  if (erroValidacao) {
    res.status(400).json({ erro: erroValidacao });
    return;
  }

  const { titulo, autor, editora, anoEdicao, genero, isbn } = req.body;

  const isbnExiste = livros.some((l) => l.isbn === isbn);
  if (isbnExiste) {
    res.status(400).json({ erro: 'Já existe um livro cadastrado com este ISBN' });
    return;
  }

  const novoLivro: Livro = {
    titulo: titulo.trim(),
    autor: autor.trim(),
    editora: editora.trim(),
    anoEdicao,
    genero: genero.trim(),
    isbn: isbn.trim(),
  };

  livros.push(novoLivro);
  res.status(201).json(novoLivro);
};