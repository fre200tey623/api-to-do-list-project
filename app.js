import express from 'express';
import { sql } from './db.js';
//import swaggerUi from 'swagger-ui-express';
//import swaggerDocument from "./swagger-output.json" assert { type: "json" }

const app = express();
app.use(express.json());

app.post('/', async function(req, res) {
  try {
    const cor = req.body.cor;
    let result;

    if (cor) {
      result = await sql`SELECT * FROM tarefas WHERE cor ILIKE '%' || ${cor} || '%'`;
    } else {
      result = await sql`SELECT * FROM tarefas ORDER BY data_criacao DESC`;
    }

    res.status(200).json(result);
  } catch(err) {
    console.log(err);
    res.status(500).send('Erro ao acessar o banco de dados');
  }
});

app.get('/:id', async function(req, res){
    const { id } = req.params;
    try{
      await sql`SELECT * FROM tarefas WHERE id = ${id}`
    .then((result) => {
      res.status(200).json(result);
    }
    );
    }
    catch(err){
      console.log(err);
      res.status(500).send('Erro ao acessar o banco de dados');
    }
  }
)

app.post('/tarefa', async function(req, res){
  const { titulo, descricao, situacao, cor ,data_criacao, data_finalizacao } = req.body;
  
  console.log(titulo, descricao, situacao, cor ,data_criacao, data_finalizacao);
  try{
    let result = await sql`
    INSERT INTO tarefas (titulo, descricao, cor ,data_criacao)
    VALUES (${titulo}, ${descricao}, ${cor} ,${data_criacao});
    `.then(() => {
      res.status(201).json('Tarefa criada com sucesso!');
    });
    console.log(result);
  }
  catch(err){
    console.log(err);
    res.status(500).send('Erro ao acessar o banco de dados');
  }
})



// app.use('/api-docs', swaggerUi.serve);
// app.use('/api-docs', swaggerUi.setup(swaggerDocument));

app.listen(3333, () => {
  console.log('O servidor esta rodando na porta 3333');
})