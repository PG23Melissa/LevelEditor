// Copyright (C) 2022, Melissa Osorio

import Express from "express";
import Path from "path"
import HTTP from "http"




import { fileURLToPath } from 'url';

const PORT = 3000;

class Server {

    #__filename;
    #__dirname;

    constructor() {

        this.#__filename = fileURLToPath( import.meta.url );
        this.#__dirname = Path.dirname( this.#__filename );

        this.api = Express();

        this.api
            .use( Express.json())
            .use( Express.urlencoded({ extended: false }))
            .use( Express.static( Path.join( this.#__dirname, './')))
            .use( Express.static( Path.join( this.#__dirname, './server/api')))


        this.api.get("/", ( request, response ) => {
            // handle basic requests
            let tempPath = `${Path.join( this.#__dirname, './')}./index.html`;
            response.sendFile( tempPath ) ;
            console.log(`Served index.html`)
        });

        this.api.post("/api/save", ( request, response ) => {
            // Pull apart the request, do something here...
            const params = request.params;
            const body = request.body;
            const query = request.query;

            // const data = {
            //     name: query.name,
            //     shots: query.shots,
            //     onesStar:query.score1,
            // }

            response.send( JSON.stringify( {status: "saved"} ));

            //response.send( JSON.stringify( data ));
            // console.log(JSON.stringify( data ));
        })

        this.api.set("port", PORT );
        this.listener = HTTP.createServer( this.api );
        this.listener.listen( PORT );

        this.listener.on("listening", () => { this.handleListening() })
    }

    handleListening() {

        const addr = this.listener.address();
        const bind = typeof addr == `'string`?` pipe ${addr}`: `port ${addr.port}`;
        console.log(`Listening on ${bind}`)
    }
}

const server = new Server();