require('newrelic');
const express = require('express');
const path = require('path');
const app = express();
const httpProxy = require('http-proxy');
const port = 5000;
const apiProxy = httpProxy.createProxyServer();

const loadBalancer = 'http://54.193.225.207';

app.all('/*', (req, res) => {
  apiProxy.web(req, res, {target: loadBalancer, changeOrigin: true});
});

app.use(express.static('client'));

app.listen(port, () => console.log(`Proxy listening on ${port}`));


// const express = require('express');
// const path = require('path');
// const { createProxyMiddleware } = require('http-proxy-middleware');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const app = express();
// const port = 5000;
// //static
// app.use(express.static(path.join(__dirname, '../client')));
// app.use(bodyParser.json());
// app.use(cors());

// // app.use('/api', createProxyMiddleware({ target: 'http://52.14.226.255/', changeOrigin: true }));
// // app.use('/reviews', createProxyMiddleware({ target: 'http://18.224.95.187/', changeOrigin: true }));

// app.use('/', createProxyMiddleware({ target: 'http://13.52.254.29/', changeOrigin: true }));

// // app.use('/photogallery', createProxyMiddleware({ target: 'http://ec2-18-221-5-8.us-east-2.compute.amazonaws.com:3004/', changeOrigin: true }));

// app.listen(port, () => console.log(`Listening at http://localhost:${port}/`));