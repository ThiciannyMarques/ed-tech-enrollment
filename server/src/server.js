const app = require('./app');
const { PORT = 3001 } = process.env;

app.listen(PORT, () => {

  process.stdout.write(`Server running on port ${PORT}\n`);
});
