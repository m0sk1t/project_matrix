import express from 'express';

import start from './start';

const app = express();
const port = 3000;

app.use(express.json({}));
app.use(express.urlencoded({}));
app.use(express.static('./static'));

app.post('/', async (req, res) => {
  const ssh_url = req?.body?.repository?.ssh_url;
  console.log(ssh_url);
  await start(ssh_url);
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
