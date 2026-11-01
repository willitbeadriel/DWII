import { Router } from 'express';
import {
  statusApi,
  listarLivros,
  obterLivroPorIsbn,
  cadastrarLivro,
} from '../controllers/livros.controller';

const router = Router();

router.get('/', statusApi);
router.get('/livros', listarLivros);
router.get('/livros/:isbn', obterLivroPorIsbn);
router.post('/livros', cadastrarLivro);

export default router;