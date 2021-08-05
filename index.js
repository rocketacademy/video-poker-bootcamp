import {createServer} from 'http';
import { readFile } from 'fs';

const PORT = process.argv[2];

const whenIncomingRequest = (request, response) =>{
  console.log('request url', request.url);

  const filepath = `.${request.url}`
  
  readFile(filePath, (err, content)=>{
    if(err)
    {
      console.error('error reading file', err);
      return;
    }
    response.writeHead(200);
    response.end(content, 'utf-8');
  })
}

createServer(whenIncomingRequest).listen(PORT);