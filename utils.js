exports.getBooks = () =>{
  return  ["génesis",
    "éxodo",
    "levítico",
    "números",
    "deuteronomio",
    "josué ",
    "jueces",
    "rut",
    "1samuel",
    "2samuel",
    "1reyes",
    "2reyes",
    "1crónicas",
    "2crónicas",
    "esdras",
    "nehemías",
    "ester",
    "job",
    "salmos",
    "proverbios",
    "eclesiastés",
    "cantardeloscantares",
    "isaías",
    "jeremías",
    "lamentaciones",
    "ezequiel",
    "daniel",
    "oseas",
    "joel",
    "amós",
    "abdías",
    "jonás",
    "miqueas",
    "nahúm",
    "habacuc",
    "sofonías",
    "hageo",
    "zacarías",
    "malaquías",
    "mateo",
    "marcos",
    "lucas",
    "juan",
    "hechos",
    "romanos",
    "1corintios",
    "2corintios",
    "gálatas",
    "éfesios",
    "filipenses",
    "colosenses",
    "1tesalonicenses",
    "2tesalonicenses",
    "1timoteo",
    "2timoteo",
    "tito",
    "filemón",
    "hebreos",
    "santiago",
    "1pedro",
    "2pedro",
    "1juan",
    "2juan",
    "3juan",
    "judas",
    "apocalipsis"];
}

exports.isBook = (word) =>{
    for(let b in this.getBooks()){
        if(word === this.getBooks()[b]) return this.getBooks()[b];
    }
    return "notBook";
}

exports.getBookOfText = (text) =>{
    let wordList = text.split(" ");

    for(let b in wordList){
        let bb = this.isBook(wordList[b].toLowerCase());

        if(bb != "notBook") return bb;
    }
    return "text not has book";
}