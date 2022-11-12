// Copyright (C) 2022, Melissa Osorio

export default class App {

    #__private__;

    constructor() {

        const my = this.#__private__ = {

            output$: $("#output")
        };
        my.output$ = $("#output");

        // connect a handler for the submit event on the form
        $("#level-info").on("submit", event => this.onSubmit( event ));
        $("#save-btn").on("click", event => this.onSave( event ));
        this.initDraggables();
        this.initDropzone();

        this.x;
        this.y;

    }


    initDraggables() {
        $(".box").on("dragstart", (event,clone) => {
            // attach my id here to the element & transfer it
            const data = {
                targetId: event.target.id,
            };
            this.x=event.offsetX;
            this.y=event.offsetY;


            const xferData = JSON.stringify( data );
            event.originalEvent.dataTransfer.setData("text", xferData );
            event.originalEvent.dataTransfer.effectAllowed = "move";
        });
        
    }


    initDropzone() {

        $("#editor-area")
            .on("dragover", event => {
                // preven the default ghosting issue
                event.preventDefault();
            })
            .on("drop", (event) => {
                event.preventDefault();
                // duplicate the element dropped if it doesn't have the 'isPlaced' class

                const xferData = event.originalEvent.dataTransfer.getData("text");
                const data = JSON.parse( xferData );
                let gameObjectSrc = $(`#${data.targetId}`);

                let classList = `isPlaced ${gameObjectSrc.classList}`;  
                
                console.log(gameObjectSrc);
                let newEl = $(`<div class=${classList} draggable="true"></div>`);
                newEl = $(`#${data.targetId}`);
                newEl.css("top",event.originalEvent.offsetY);
                newEl.css("left",event.originalEvent.offsetX);
                newEl.addClass("placed");
                $("#editor-area").append( newEl );
            });
    }


    onSave( event ) {
        //event.preventDefault();
        // create new Scene( this.editor$ )
        const aScene = new Scene( this.editor$ );
        // Serialize the scene
        const payload = aScene.serialize();
        // post the scene to the server
        const options = {
            userid: "Melissa", // eg pg15student
            name: "filename",   // name of entity, no spaces, no extension
            type: "level",      // one of these two key strings
            payload: payload   // actual data in JSON format
        };

        console.log(options.payload);
        $.post(`/api/save`, options )
            .then( response => {
                // handle the response
                const respData = JSON.parse( response );
                if (!respData.error)
                    console.log(`SUCCESS: Received ${respData.bytes} from the server`)
            })
    }


    onSubmit( event ) {
        event.preventDefault();

        const my = this.#__private__;

        let formData = $(event.target).serializeArray();
        let formQuery = $(event.target).serialize();

        let formJSON = JSON.stringify( formData );
        $.post(`/api/save?${formQuery}`, formJSON )
            .then( result => {
                // called when the server returns
                let responseData = JSON.parse( result );
                my.output$.html('made it here');

                my.output$.append( result );
            })
    }
}