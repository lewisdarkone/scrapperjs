const cheerio =require("cheerio");
const fs = require('fs');
const request = require('request');


const url = "https://www.ciudadredonda.org/calendario-lecturas/evangelio-del-dia/hoy";


request(url, (err,res,body) =>{
    let books = getBookFile();

    if(!err && res.statusCode == 200){

        //load body over cheerio
        let $ = cheerio.load(body);

        //get main data to extra books and chapters
        let bodyMap = new Map();

        //set data from page
        $('section','.lecturas').each((i,elem) =>{
            let childNodes = $(elem.childNodes).toArray();
            switch (i) {
                case 0:
                    bodyMap.set('mLectTitle',lecturaTitle(childNodes));
                    bodyMap.set('mLectText',lecturaTextSp(childNodes));
                    break;
                case 2:
                    bodyMap.set('mEvanTitle',lecturaTitle(childNodes));
                    bodyMap.set('mEvantText',lecturaTextSp(childNodes));
                    break;            
                default:
                    break;
            }

        });

    }
});

const lecturaTitle = (nodes) =>{

    return nodes[3].childNodes[1].childNodes[0].data;
 }

 const lecturaTextSp = (node) =>{

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
 const getBookFile = (() =>{
     try {
        let file = fs.readFileSync('./bibleBooks.txt','utf8');
        return file
     } catch (error) {
         return error;
     }
    
});
