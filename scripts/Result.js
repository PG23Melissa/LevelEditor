//Copyright

"use strict";

export default class Result{

    #__private__;

    constructor( error = 0, msg = "", payload = {}) {

        this.#__private__ = {
            data: {
                error, msg, payload
            }
        }
    }
set error(value){this.#__private__.data.error=error}
set msg(value){this.#__private__.data.msg=msg}
set payload(value){this.#__private__.data.payload=payload}

    serialize(){
        return JSON.stringify(this.#__private__.data)
    }
}