var selectedGenre = "";
var horrorArray = ["supernatural", "horror", "ghost", "monster", "creature"];
var theResult = "";

$(document).ready(function(){

});


function getWordArray(theWord) {
    return new Promise(function (resolve, reject) {
        resolve($.get('https://api.datamuse.com/words?rel_trg=' + theWord));
    });
}
function getAdjective(theWord) {
    return new Promise(function (resolve, reject) {
        resolve($.get('https://api.datamuse.com/words?rel_jjb=' + theWord));
    });
}
function getNoun(theWord) {
    return new Promise(function (resolve, reject) {
        resolve($.get('https://api.datamuse.com/words?rel_jja=' + theWord));
    });
}

function boot() {
    $("#theText").hide();
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
    if (Math.random() < 0.5) {
        noun1 = RiTa.singularize(noun1);
    }
    else {
        noun1 = RiTa.pluralize(noun1);
    }
    adj1 = randomFromArray(adjArr);
    
    if (Math.random() < 0.5) {
        phrase01 = (" " + RiTa.evaluate('(in the attic| in the mansion| in the house| in the basement| in the room|in ' + RiTa.evaluate('(his | her )') + ' subconscious |in ' + RiTa.evaluate('(his | her )') + ' mind| in the meadows|in the forest|)'));
    }
    else {
        phrase01 = (" " + RiTa.evaluate('(at[2]|of)') + " " + randomFromArray(theStreets));
    }

    //
    var theOption = getRndInteger(1,5);
    theOption = 5 //DEBUG
    switch(theOption) {
        case 1:
            theResult = titleCase("The " + noun1 + phrase01);
            showResult();
            break;
        case 2:
            getAdjective(noun1).then(function(obj){
                var adjObj = randomFromArray(obj)
                theResult = titleCase("The " + adjObj.word + " " + noun1);
				if (Math.random() < 0.5) {
					theResult += titleCase((" " + RiTa.evaluate('(at[2]|of)') + " " + randomFromArray(theStreets)));
				}
                showResult();
            });
            break;
        case 3:
            getNoun(adj1).then(function(obj){
                var nounObj = randomFromArray(obj);
                theResult = titleCase("The " + adj1 + " " + nounObj.word);
				if (Math.random() < 0.5) {
					theResult += titleCase((" " + RiTa.evaluate('(at[2]|of)') + " " + randomFromArray(theStreets)));
				}
                showResult();
            });
            break;
        case 4:// "verb+ing + the + adj1"
            break;
        case 5:
			var adjObj;
		     getAdjective(noun1).then(function(obj){
                adjObj = randomFromArray(obj);
				getNoun(adj1).then(function(obj2){
					var nounObj = randomFromArray(obj2);
					theResult = titleCase(adjObj.word + " " + RiTa.pluralize(noun1) + " and the " + adj1 + " " + nounObj.word);
					if (Math.random() < 0.5) {
						theResult += titleCase((" " + RiTa.evaluate('(at[2]|of)') + " " + randomFromArray(theStreets)));
					}
					showResult();
				});
            });
            break;
    }

}

function showResult() {
    $("#theText").html(theResult);
    $("#theText").fadeIn(1500);
}

//
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
 }
function randomFromArray(items) {
    return items[Math.floor(Math.random()*items.length)];
}



/*
1) "The" + vampire in/of the 
2) 
*/