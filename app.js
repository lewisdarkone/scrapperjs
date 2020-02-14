const cheerio =require("cheerio");
const fs = require('fs');
const request = require('request');
const books = require('./utils');
const lectura = require('./lectura');


let url = "https://www.ciudadredonda.org/calendario-lecturas/evangelio-del-dia/hoy";

//https://www.ciudadredonda.org/calendario-lecturas/evangelio-del-dia/hoy
//https://www.ciudadredonda.org/calendario-lecturas/evangelio-del-dia/?f=2020-01-


let test = 
//[START REQUEST]
request(url, (err,res,body) =>{       

    if(!err && res.statusCode == 200){

        /**
         * load body over cheerio
         */
        let $ = cheerio.load(body);

        /**
         * get main data to extra books and chapters
         */
        let bodyMap = new Map();

        /**
         *get sections that contain the daily words 
         */
        //
        $('section','.lecturas').each((i,elem) =>{
            let childNodes = $(elem.childNodes).toArray();
            switch (i) {
                case 0:
                    bodyMap.set('mLectTitle',lectura.getTitle(childNodes));
                    bodyMap.set('mLectText',lectura.getLecturaText(childNodes));
                    break;
                case 2:
                    bodyMap.set('mEvanTitle',lectura.getTitle(childNodes));
                    bodyMap.set('mEvantText',lectura.getLecturaText(childNodes));
                    break;            
                default:
                    break;
            }

        });

        /**
         * Variables to get books, chapters and verses
         */
        let finalLectBook = books.getBookOfText(bodyMap.get("mLectTitle"));
        let finalLectChapterAndVerses = lectura.getChapterAndVerse(bodyMap.get("mLectTitle"));        
        let finalEvanBook =books.getBookOfText(bodyMap.get("mEvanTitle"));
        let finalEvanChapterAndVerses = lectura.getChapterAndVerse(bodyMap.get("mEvanTitle"));

        /**
         * Maps to storage the dailyWord: lectures and evangelions
         */
        let dailyWord = new Map();
        let dailyLectura = new Map();
        let dailyEvan = new Map();

      

        /**
         * Set dailyLecture
         */
        dailyLectura
        .set('finalLectBook',finalLectBook)
        .set('chapter',finalLectChapterAndVerses.get('chapter'))
        .set('startVerse',finalLectChapterAndVerses.get('startVerse'))
        .set('endVerse',finalLectChapterAndVerses.get('endVerse'));

        /**
         * Set daily Evan
         */
        dailyEvan
        .set('finalLectBook',finalEvanBook)
        .set('chapter',finalEvanChapterAndVerses.get('chapter'))
        .set('startVerse',finalEvanChapterAndVerses.get('startVerse'))
        .set('endVerse',finalEvanChapterAndVerses.get('endVerse'));

        /**
         * Set dailyWore
         */
        dailyWord
        .set('dailyLectura',dailyLectura)
        .set('dailyEvan',dailyEvan);

    }
});
//[END RESQUEST]

console.log(test);
for (let i = 1; i <= 31; i++) {
    if(i < 9){
        url=url+'0'+i;
    }else{
        url = url+i;
    }

    
}

