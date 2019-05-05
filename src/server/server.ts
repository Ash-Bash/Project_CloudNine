"use strict";
import * as express from 'express';
import * as path from 'path';
import * as engines from 'consolidate';

/*const app = express();
 
app.get('/', (req, res) => {
    res.send('Hello from Express')
});
 
const server = app.listen(8000, "localhost", () => {
 
   var port = server.address().port;
   var address = server.address().address;
   console.log('Listening on http://localhost:' + port);
});*/

const clientPrefixDir = '../dist/client/';
const clientPath = path.resolve('./', 'dist/client');
const serverPath = path.resolve('./', 'dist/server');

class Server {
    public express : any;
    app = express();
  
    constructor () {
      this.express = express()

      console.log("Server Dir: " + serverPath);
      console.log("Client Path: " + clientPath);

      this.app.use('/scripts' , express.static(clientPath));
      this.app.set('views', clientPath);
      this.app.engine('pug', engines.pug);
      this.app.set('view engine', 'pug');

      this.config();

      this.mountRoutes()
    }

    public config() : void {
        //add static paths
        //this.app.use(express.static(clientPath));
    }
  
    private mountRoutes () : void {
      const router = express.Router()

      router.get('/', (req, res) => {
        res.send('Hello from Express');
      })
      router.get('/player', (req, res) => {
        res.render(clientPrefixDir + 'index.pug');
      })
      this.express.use('/', router)
    }
    
}

const server = new Server();

const port = process.env.PORT || 3000
server.express.use('/', express.static(clientPath));
//server.express.use('/', express.static(clientPath));
server.express.listen(port, (err : any) => {
  if (err) {
    return console.log(err)
  }

  return console.log(`server is listening on ${port}`)
})