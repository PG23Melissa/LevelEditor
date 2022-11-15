/// Copyright (C) 2022 Melissa Osorio
'use strict';

export default class LevelController {

    constructor( editor$ ) {

        // create new Scene( this.editor$ )
        this.scene = new Scene( editor$ );

        // Serialize the scene
        this.payload = this.scene.serialize();
        this.options = {
            userid: "shenshaw", // eg pg15student
            name: "filename",   // name of entity, no spaces, no extension
            type: "level",      // one of these two key strings
            payload: this.payload   // actual data in JSON format
        };
    }

    save( payload ) {
                
        return new Promise(( resolve, reject ) => {
            // do some work here
            // post the scene to the server
            $.post(`/api/save`, options )
                .then( response => {
                    // handle the response
                    /*{
                        "name": "requested entity name",
                        "bytes": "actual bytes written",
                        "error": 0
                    } */
                    const respData = JSON.parse( response );
                    if (!respData.error)
                        console.log(`SUCCESS: Received ${respData.bytes} from the server`)

                    resolve( respData );
                })
                .catch( error => reject( error ))
        })
    }
}