import * as express from 'express';

/*const app = express();
 
app.get('/', (req, res) => {
    res.send('Hello from Express')
});
 
const server = app.listen(8000, "localhost", () => {
 
   var port = server.address().port;
   var address = server.address().address;
   console.log('Listening on http://localhost:' + port);
});*/

class App {
    public express
  
    constructor () {
      this.express = express()
      this.mountRoutes()
    }
  
    private mountRoutes (): void {
      const router = express.Router()
      router.get('/', (req, res) => {
        res.json({
          message: 'Hello World!'
        })
      })
      this.express.use('/', router)
    }
    
}

const app = new App();

const port = process.env.PORT || 3000

app.express.listen(port, (err) => {
  if (err) {
    return console.log(err)
  }

  return console.log(`server is listening on ${port}`)
})