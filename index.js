const express = require('express');
const multer = require('multer');
const upload = multer({dest: 'temp/'});
const cors = require('cors');
const app = express();
var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
const respuesta = '';

app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization, Origin, X-Requested-With, Accept, Cache-Control",
    preflightContinue: true,
    optionsSuccessStatus: 204,
}));

// Enable pre-flight across-the-board
app.options('*', cors(), ((req, res, next) => {
    console.log(req, res, next);
    res.send('CORS Allow');
}));

//app.post: postea servicio web para ser consumido, en primera instancia se le declara el enpoint 
//          por el cual va a recibir la peticion seguido en este caso que recibira un archivo (file)
//          en el body.
//          Publish web service to be consumed, in the first instance the enpoint is declared
//          for which you will receive the request followed in this case you will receive a file (file)
//          in the body.
app.post('path', upload.single('file'), function (req, res, next) {
  console.log("Getting POST request from: ", req.ip, new Date().toISOString())
    // Verify the pre-condition, the params name-file and
    // Token must be exist in the header of HTTP

    if (req.headers["name-file"] === undefined) {
        // 500 Internal Server Error
        return res.status(500).send("The parameter name-file not send in the header of HTTP");
    }

    if (req.headers["acces-token"] === undefined) {
        // 500 Internal Server Error
        return res.status(500).send("The parameter acces-token not send in the header of HTTP");
    }

    if (req.headers["name-file"] === "") {
      // 500 Internal Server Error
      return res.status(500).send("The parameter name-file not send in spaces");
     }

    if (req.headers["acces-token"] === "") {
      // 500 Internal Server Error
      return res.status(500).send("The parameter acces-token not send in spaces");
     }
    
    //Varible load with parameters of entry
  const parnamefile = req.headers["name-file"];
  const partoken = req.headers["acces-token"];
  console.log(parnamefile);
  console.log(partoken);
  //const file = req.file.path;
  const newPathPDF = 'received/' + parnamefile + '.PDF';
  console.log(newPathPDF);
  writeFiles(req.file.path, newPathPDF);
  
  
  var data = new FormData();
  data.append('File-Name', parnamefile);
  data.append('File', fs.createReadStream(newPathPDF));
  var config = {
    method: 'post',
    url: 'https://URL',
    headers: { 
      'Access-Token': partoken ,
      ...data.getHeaders()
    },
    data : data
  };
  
  axios(config)
  .then(function (response) {
    console.log('paso por response');
    console.log(JSON.stringify(response.data));
     //response to response the ws exposed
     res.send(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log('paso por error');
    console.log(error);
    console.log(JSON.stringify(error.data));
    res.send('genero error')
  });
  
  console.log('rta');
  res.setHeader('hename', 'falso');
  //res.send('ok');
    
})

function writeFiles(pathFile, pathPDF) {
  try {
    fs.writeFileSync(pathPDF, pathFile);
      fs.renameSync(pathFile, pathPDF);
  } catch (error) {
      console.log(error);
  }
}

const port = process.env.PORT || 3823

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
