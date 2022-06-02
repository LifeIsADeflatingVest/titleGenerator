var selectedGenre = "";
var cnt = 0;
var madeWord;
var randomizedLocale;
var horrorArray = ["supernatural", "horror", "ghost", "monster", "creature", "nightmare"];
var fantasyArray= ["supernatural", "ghost", "witch", "creature", "vampire", "werewolf", "elf", "magician", "amulet", "ring"];
var scienceFictionArray= ["alien", "computer", "network", "robot", "cyborg", "element", "device", "computer", "entity"];
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
function getVerb(theWord) {
    return new Promise(function (resolve, reject) {
        resolve($.get('https://api.datamuse.com/words?rc=' + theWord + '&md=p'));
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
				randomizedLocale = randomFromArray(theStreets);
                makeSentence(obj);
            });
            break;
        case "Fantasy":
			madeWord = "";
			madeWord += getRi(3);
			madeWord += getRi(2);
			madeWord += getRi(2);
		    getWordArray(randomFromArray(fantasyArray)).then(function(obj){
				randomizedLocale = (madeWord + " " + randomFromArray(magicalLocales));
                makeSentence(obj);
            });
            break;
        case "Science Fiction":
			madeWord = "";
			madeWord += getRi(3);
			madeWord += getRi(2);
			madeWord += getRi(2);
		    getWordArray(randomFromArray(scienceFictionArray)).then(function(obj){
				randomizedLocale = (madeWord + " " + randomFromArray(sciFiLocales.concat(magicalLocales)));
                makeSentence(obj);
            });
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
    var nounArr = ["being"];//fallbacks
    var noun1;
    var adjArr = ["interesting"];//fallbacks
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
        phrase01 = (" " + RiTa.evaluate('(at[2]|of)') + " " + randomizedLocale);
    }

    //
    var theOption = getRndInteger(1,5);
    switch(theOption) {
        case 1:
            theResult = titleCase("The " + noun1 + phrase01);
            showResult();
            break;
        case 2:
            getAdjective(noun1).then(function(obj){
                var adjObj = randomFromArray(obj)
				if (adjObj==undefined) {
					adjObj = RiTa.randomWord({ pos: "jj"});//fallback
				}
                theResult = titleCase("The " + adjObj.word + " " + noun1);
				if (Math.random() < 0.5) {
					theResult += titleCase((" " + RiTa.evaluate('(at[2]|of)') + " " + randomizedLocale));
				}
                showResult();
            });
            break;
        case 3:
            getNoun(adj1).then(function(obj){
                var nounObj = randomFromArray(obj);
				if (nounObj==undefined) {
					nounObj = RiTa.randomWord({ pos: "nn"});//fallback
				}
                theResult = titleCase("The " + adj1 + " " + nounObj.word);
				if (Math.random() < 0.5) {
					theResult += titleCase((" " + RiTa.evaluate('(at[2]|of)') + " " + randomizedLocale));
				}
                showResult();
            });
            break;
        case 4:
			getVerb(noun1).then(function(obj){
				var tempArrayVerbs = ["examine", "understand", "see", "behold", "fear", "know", "dream", "escape", "imprison"]; // fallbacks
				var tempArrayNouns = ["man", "woman", "entity", "creature", "entity", "vision"];//fallbacks
				for (var i=0;i<obj.length;i++) {
					if (obj[i].tags != undefined) {
						if (obj[i].tags.includes("v")) {
							tempArrayVerbs.push(obj[i].word);
						}
						else if (obj[i].tags.includes("n") && RiTa.isNoun(obj[i].word)) {
							tempArrayNouns.push(obj[i].word);
						}
					}
				}
				var nounPhrase;
				if (Math.random() < 0.5) {
					nounPhrase = (RiTa.evaluate('(the | )') + " " + RiTa.pluralize(noun1));
				}
				else {
					nounPhrase = ("the " + RiTa.singularize(noun1));
				}
                var verbObj = randomFromArray(tempArrayVerbs);
				var nounObj = randomFromArray(tempArrayNouns);
				if (Math.random() < 0.5) {
					theResult = titleCase(RiTa.conjugate(verbObj, {form: RiTa.GERUND}) + " " + nounPhrase);
				}
				else {
					theResult = titleCase("The " + nounObj + " who " + RiTa.conjugate(verbObj, {tense: RiTa.PAST}) + " " + nounPhrase);
				}
				if (Math.random() < 0.5) {
					theResult += titleCase((" " + RiTa.evaluate('(at[2]|of)') + " " + randomizedLocale));
				}
                showResult();
            });
            break;
        case 5:
			var adjObj;
		     getAdjective(noun1).then(function(obj){
                adjObj = randomFromArray(obj);
				getNoun(adj1).then(function(obj2){
					var nounObj = randomFromArray(obj2);
					theResult = titleCase(adjObj.word + " " + RiTa.pluralize(noun1) + " and the " + adj1 + " " + nounObj.word);
					if (Math.random() < 0.5) {
						theResult += titleCase((" " + RiTa.evaluate('(at[2]|of)') + " " + randomizedLocale));
					}
					showResult();
				});
            });
            break;
    }

}

function showResult() {
	if (cnt>0) {
		$("#theText").append("<br>");
	}
	else {
		$("#butts").fadeIn(1500);
	}
	var sp = document.createElement("span");
	sp.setAttribute("id", ("span"+cnt));
	document.getElementById("theText").appendChild(sp);
	$("#span"+cnt).hide();
	$("#span"+cnt).html(theResult);
	$("#span"+cnt).fadeIn(1500);
	cnt++;
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
function getRi(n) {
  return RiTa.randomWord().slice(0,n);
}
function actionText(b) {
	if (b) {
		
	}
	else {
		ctn=0;
		$("#butts").hide();
		$("#theText").html("");
	}
}



/*
1) "The" + vampire in/of the 
2) 
*/