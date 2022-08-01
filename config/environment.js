const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');
const logDirectory = path.join(__dirname,'../production_logs');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
//creating an access log stream file which will refresh after 1 day
const accessLogStream = rfs.createStream('access_log',{
    interval:'1d',
    path:logDirectory
});
//development mode env object
const development = {
    name:'development',
    asset_path:'./assets',
    session_cookie_key:'keyboard cat',
    db:'placementcell_development',
    morgan:{
        mode:'dev',
        options:{
            stream:accessLogStream
        }
    }
}
//production mode env object
const production = {
    name:'production',
    asset_path:process.env.PLACEMENTCELL_PROJECT_ASSET_PATH,
    session_cookie_key:process.env.PLACEMENTCELL_PROJECT_SESSION_COOKIE_KEY,
    db:process.env.PLACEMENTCELL_PROJECT_DB,
    morgan:{
        mode:'combined',
        options:{
            stream:accessLogStream
        }
    }
}

module.exports = eval(process.env.NODE_ENV == undefined ? development: eval(process.env.NODE_ENV));