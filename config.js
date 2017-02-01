// please set serve-favicon in ./node/app/public path
var os = require('os');

var appConfig = {
    blogRootPath: '/home/simplyy/node-server/apps/blog/Article',
    mongoUrl: 'mongodb://simplyy:1994522yu@127.0.0.1:27017/blog',
    devMongoUrl: 'mongodb://127.0.0.1:27017/blog',
    serverPort: '8000',
    renewInterval: 24*3600, // x seconds
    tokenExpireTime: 10 // x hours
};

if (os.platform() === 'darwin') {
    appConfig.blogRootPath = '/Users/yuwei/GitHub/blog/Article';
}
module.exports = appConfig;
