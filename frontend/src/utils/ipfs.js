const IPFS = require('ipfs-http-client');
const ipfs = new IPFS({ host: process.env.REACT_APP_IPFS_INFURA, port: '5001' });

export default ipfs;