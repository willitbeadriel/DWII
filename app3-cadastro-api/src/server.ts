import express from 'express';
import livrosRouter from './routes/livros.routes';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(livrosRouter);

app.listen(PORT, () => {
  console.log(`🚀 Servidor da Biblioteca a rodar em http://localhost:${PORT}`);
});