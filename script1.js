var selectedGenre = "";
var horrorArray = ["supernatural", "horror", "terror", "fear"];
var theResult = "";

$(document).ready(function(){

});


function getWordArray(theWord) {
    return new Promise(function (resolve, reject) {
        resolve($.get('https://api.datamuse.com/words?rel_trg=' + theWord));
    });
}

function boot() {
    var theList = document.getElementById("drList");
    theResult = "";
    selectedGenre = theList.options[theList.selectedIndex].text;
    //
    switch (selectedGenre) {
        case "Horror":
            getWordArray(randomFromArray(horrorArray)).then(function(obj){
                makeSentence(obj);
            });
            break;
        case "Fantasy":
            break;
        case "Science Fiction":
            break;
        case "Literary":
            break;
        case "Experimental":
            break;
        case "Crime":
            break;
        case "Romance":
            break;
        case "Thriller":
            break;
    }
    //


}

function makeSentence(obj) {
    var nounArr = [];
    var noun1;
    var adjArr = [];
    var adj1;
    var phrase01;

    for (var i=0;i<obj.length;i++) {
        if (RiTa.isNoun(obj[i].word)) {
            nounArr.push(obj[i].word);
        }
        else  if (RiTa.isAdjective(obj[i].word)) {
            adjArr.push(obj[i].word);
        }
    }

    noun1 = randomFromArray(nounArr);
    adj1 = randomFromArray(adjArr);
    
    if (Math.random() < 0.5) {
        phrase01 = (RiTa.evaluate('( his | her | the [3] )') + " " + RiTa.evaluate('(attic|mansion|house)'));
    }
    else {
        phrase01 = "";
    }

    //
    var theOption = getRndInteger(1,5);
    theOption = 1 //DEBUG
    switch(theOption) {
        case 1:
            if (Math.random() < 0.5) {
                noun1 = RiTa.singularize(noun1);
            }
            else {
                noun1 = RiTa.pluralize(noun1);
            }
            theResult += ("The " + noun1 + " " + RiTa.evaluate('( of | in )') + " " + phrase01);
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
        case 5:
            break;
    }
}

//
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function randomFromArray(items) {
    return items[Math.floor(Math.random()*items.length)];
}



/*
1) "The" + [noun]
2) 
*/