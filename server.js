conts http=require('http');
conts fs=require('fs');
const index= fs.readFileSync('index.html');
http.createServer((req,res) =>{res.writeHead(200,{'Content-Type':'text/html'});
res.end(index);
                              }).listen(process.env.PORTll3000);                               
