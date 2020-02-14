const request = require('request');
const cheerio =require("cheerio");



let body;

/**@param nodes
 * @getTitle recibe a nodes for get text that has de book
 */
exports.getTitle = (nodes) =>{

    return nodes[3].childNodes[1].childNodes[0].data;
 }

 /**
  * @params nodes
  * @function getLecturaText
  * @returns the text plan of lecture if day 
  */
 exports.getLecturaText = (node) =>{

    let textArray = [];
    let lectura = "";
    let nodeValue;
    for(let i = 5; i <= node[3].childNodes.length-1;i++){

        //exclude br
        if(node[3].childNodes[i].name === "br") continue;

        //append first value default
        if(i === 5) {
            textArray.push(node[3].childNodes[i].data)
        }
        else{
            //get final value into nodeValue
            if(!node[3].childNodes[i].childNodes){
                nodeValue = node[3].childNodes[i].data;
            }else{
                nodeValue = node[3].childNodes[i].childNodes[0].data;
            }            

            //break if node is palabra de Dios
            if(nodeValue === 'Palabra de Dios') break;

           if(nodeValue && nodeValue.length > 2){
               textArray.push(nodeValue);
           };
        }


    }
    if(textArray){
        for (let i = 0; i < textArray.length; i++) {
            lectura += textArray[i];
            lectura += "\n";            
        }
    }else{
        lectura = "no data";
    }
    return lectura;
 }


 exports.getChapterAndVerse = (text) =>{
     
    
        let chapterAndVerseMap = new Map();

        let start = text.indexOf('(');
        let end = text.indexOf(')');
        let cite = text.substring(start+1,end);

        let lecturas = cite.split(';');

        let finalChapter = getChapterFromCite(lecturas[0]);
        let startVerse = getStartVerse(lecturas[0]);
        let endVerse = getEndVerse(lecturas[0]);

        chapterAndVerseMap.set('chapter',finalChapter);
        chapterAndVerseMap.set('startVerse',startVerse);
        chapterAndVerseMap.set('endVerse',endVerse);

        return chapterAndVerseMap;

 }

exports.getBody = (url) =>{

    
    request(url).on('response',(response) =>{
        
    if(!err && res.statusCode == 200){
        body = response.body;
    }
    else{
        body = null;
    }
    });

} 







 getChapterFromCite = (cite) =>{

    let coma = cite.indexOf(',');
    return cite.substring(0,coma);
}

getStartVerse = (cite) =>{
    let coma = cite.indexOf(',');
    let guion = cite.indexOf('-');
    return cite.substring(coma+1,guion);
}

getEndVerse = (cite) =>{
    let guion = cite.indexOf('-');
    return cite.substring(guion+1,cite.length);
}