const IPFS = require('ipfs-http-client');
const ipfs = new IPFS('/ip4/127.0.0.1/tcp/5001');

export default ipfs;