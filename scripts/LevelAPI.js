'use stirct';

import  Express from "express";
import Result from './Result.js';
import {readFileSync} from 'fs-extra';

const Router=Express.Router();

Router.get('/',(request,response)=>{

})
Router.post('/get_level_list',(request,response)=>{
    
})
Router.post('/get_object_list/:userId?',(request,response)=>{
    let result = new Result( 201, `Error: missing list or params`);
    let params = {
        ...request.params,      // optional data from the actual uri like userid
        ...request.query,       // data from the client query ?a=b&c=d&...
        ...request.body         //JSON data from the client
    }
        // get list of files in folder using userid
        let fileList = FileSystem.readDirSync(`./data/${params.userid}/objects`);
        if (fileList.length < 1) {
            result.msg = "No files found";
            result.error = 202;
            response.send( result.serialize() )
            return;
        }

        // prune list to just json files
        let jsonFileList = [];
        // add files to result,
        for (let entry of fileList) {
            if (entry.endsWith(".json")) {
                jsonFileList.push( entry.replace(".json",""))
            }
        }
        result.payload = jsonFileList;

    // reset result error code to no error
    result.msg = "No error";
    result.error = 0;

    // send result back to client
    response.send( result.serialize() )
})

Router.post('/load',(request,response)=>{
    
})

Router.post('/save',(request,response)=>{
    
})

export default Router;