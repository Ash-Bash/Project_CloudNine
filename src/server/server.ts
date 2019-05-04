import * as express from 'express';
import * as path from 'path';

/*const app = express();
 
app.get('/', (req, res) => {
    res.send('Hello from Express')
});
 
const server = app.listen(8000, "localhost", () => {
 
   var port = server.address().port;
   var address = server.address().address;
   console.log('Listening on http://localhost:' + port);
});*/

const clientPath = path.resolve('./', 'dist/client');
const serverPath = path.resolve('./', 'dist/server');

class App {
    public express : any;
    app = express();
  
    constructor () {
      this.express = express()

      console.log("Server Dir: " + serverPath);
      console.log("Client Path: " + clientPath);

      this.express.set('views', clientPath);
      this.express.engine('html', require('ejs').renderFile);
      this.express.set('view engine', 'html');

      this.mountRoutes()
    }
  
    private mountRoutes (): void {
      const router = express.Router()

      router.get('/', (req, res) => {
        res.send('Hello from Express');
      })
      router.get('/player', (req, res) => {
        res.render('index');
      })
      this.express.use('/', router)
    }
    
}

const app = new App();

const port = process.env.PORT || 3000

app.express.listen(port, (err : any) => {
  if (err) {
    return console.log(err)
  }

  return console.log(`server is listening on ${port}`)
})