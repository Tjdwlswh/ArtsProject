import { app } from './src/app.js';
import { Socket } from './src/webSocket/socket.js';

app.set('port', process.env.PORT || 5000);
app.get('/', (req, res) => {
  res.send('시작');
});

console.log(process.env.PORT);

const server = app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번에서 포트시작');
});

Socket(server, app);
