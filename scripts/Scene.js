export default class App {

constructor(){

    this.createScene();

    this.sceneObjects=$(".placed")
    
}

createScene(){
    console.log("sirvo")
}

serialize(){
    console.log("serialized");
    let sceneObjectsArray=[];
    
    this.sceneObjects.each(function( index ) {
        let sceneDic={
            id:this.id,
            offsety:this.attributes.offsety.nodeValue,
            offsetx:this.attributes.offsetx.nodeValue,
        }

        sceneObjectsArray.push(sceneDic);

        // console.log( index + ": " + this.id);
        // console.log( index + ": " + this.attributes.offsety.nodeValue);
        // console.log( index + ": " + this.attributes.offsetx.nodeValue);
        // for (var att, i = 0, atts = this.attributes, n = atts.length; i < n; i++){
        //     att = atts[i];
        //     console.log(att.nodeName);
        // }
    });

    return JSON.stringify(sceneObjectsArray);
}

}