var selectedGenre = "";
var cnt = 0;
var madeWord;
var randomizedLocale;
var horrorArray = ["supernatural", "vampire", "werewolf", "demon", "witchcraft", "ghost", "monster", "creature", "nightmare", "madness"];
var fantasyArray= ["supernatural", "ghost", "witch", "creature", "vampire", "werewolf", "elf", "magician", "amulet", "ring"];
var scienceFictionArray= ["alien", "computer", "network", "robot", "cyborg", "element", "device", "computer", "galaxy", "planet"];
var literaryArray = ["memory", "hate", "dismay", "mind", "thoughts", "emotions", "loneliness", "nostalgia", "feelings", "dreams", "vision"];
var crimeArray = ["detective", "police", "murder", "suspect", "investigation", "crime", "criminal", "robbery", "embassy", "mystery", "spy", "secret"];
var romanceArray = ["love", "lover", "feelings", "marriage", "solitude", "affair", "passion", "lips", "kiss", "body", "sensual", "prostitute", "playboy", "baron", "aristocrat"];
var tempArrayVerbs = ["examine", "understand", "see", "behold", "fear", "know", "dream", "escape", "imprison"]; // fallbacks
var tempArrayNouns = ["man", "woman", "entity", "creature", "being", "vision"];//fallbacks
var theResult = "";

$(document).ready(function(){

});


function getWordArray(theWord) {
    return new Promise(function (resolve, reject) {
        resolve($.get('https://api.datamuse.com/words?ml=' + theWord + '&topics='+ theWord + '&max=30'));
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
				randomizedLocale = (" " + RiTa.evaluate('(at|of)') + " " + randomFromArray(theStreets));
                makeSentence(obj);
            });
            break;
        case "Fantasy":
			madeWord = "";
			madeWord += getRi(3);
			madeWord += getRi(2);
			madeWord += getRi(2);
		    getWordArray(randomFromArray(fantasyArray)).then(function(obj){
				randomizedLocale = (" of " + madeWord + " " + randomFromArray(magicalLocales));
                makeSentence(obj);
            });
            break;
        case "Science Fiction":
			madeWord = "";
			madeWord += getRi(3);
			madeWord += getRi(2);
			madeWord += getRi(2);
		    getWordArray(randomFromArray(scienceFictionArray)).then(function(obj){
				randomizedLocale = (" of " + madeWord + " " + randomFromArray(sciFiLocales.concat(magicalLocales)));
                makeSentence(obj);
            });
            break;
        case "Literary":
		    getWordArray(randomFromArray(literaryArray)).then(function(obj){
				randomizedLocale = (" " + RiTa.evaluate('(at|of)') + " " + randomFromArray(theStreets));
                makeSentence(obj);
            });
            break;
        case "Experimental":
			madeWord = "";
			madeWord += getRi(3);
			madeWord += getRi(2);
			madeWord += getRi(2);
			getWordArray(RiTa.randomWord({ pos: "nn"})).then(function(obj){
				randomizedLocale = (" " + madeWord);
                makeSentence(obj);
            });
            break;
        case "Crime":
		    getWordArray(randomFromArray(crimeArray)).then(function(obj){
				randomizedLocale = (" " + RiTa.evaluate('(at|of)') + " " + randomFromArray(theStreets));
                makeSentence(obj);
            });
            break;
        case "Romance":
			getWordArray(randomFromArray(romanceArray)).then(function(obj){
				randomizedLocale = (" of the " + randomFromArray(magicalLocales));
                makeSentence(obj);
            });
            break;
    }
    //


}

function makeSentence(obj) {
    var nounArr = [];
	var adjArr = [];
	var nounArrFallBack = ["being", "creature", "form"];
	var adjArrFallBack = ["interesting", "unique", "peculiar", "odd", "unknown", "marvelous", "fantastic", "curious"];
    var noun1;
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
	
	if (nounArr.length < 1) {
		for (var i=0;i<nounArrFallBack.length;i++) {
			nounArr.push(nounArrFallBack[i]);
		}
	}
	if (adjArr.length < 1) {
		for (var i=0;i<adjArrFallBack.length;i++) {
			adjArr.push(adjArrFallBack[i]);
		}
	}

    noun1 = randomFromArray(nounArr);
	if (noun1=="in") {
		noun1 = RiTa.randomWord({ pos: "nn"});//fallback
	}
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
        phrase01 = (" " + randomizedLocale);
    }

    //
    var theOption = getRndInteger(1,10); // number of…numbers greater than 8 indicate possibilities of simple (default) title
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
					theResult += titleCase(randomizedLocale);
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
					theResult += titleCase(randomizedLocale);
				}
                showResult();
            });
            break;
        case 4:
			getVerb(noun1).then(function(obj){
				var tmpArrV = [];
				var tmpArrN = [];
				for (var i=0;i<obj.length;i++) {
					if (obj[i].tags != undefined) {
						if (obj[i].tags.includes("v")) {
							tmpArrV.push(obj[i].word);
						}
						else if (obj[i].tags.includes("n") && RiTa.isNoun(obj[i].word)) {
							tmpArrN.push(obj[i].word);
						}
					}
				}
				if (tmpArrN.length < 2) {
					tmpArrN = tempArrayNouns;
				}
				if (tmpArrV.length < 2) {
					tmpArrV = tempArrayVerbs;
				}
				var nounPhrase;
				if (Math.random() < 0.5) {
					nounPhrase = (RiTa.evaluate('(the | )') + " " + RiTa.pluralize(noun1));
				}
				else {
					nounPhrase = ("the " + RiTa.singularize(noun1));
				}
                var verbObj = randomFromArray(tmpArrV);
				var nounObj = randomFromArray(tmpArrN);
				if (Math.random() < 0.5) {
					theResult = titleCase(RiTa.conjugate(verbObj, {form: RiTa.GERUND}) + " " + nounPhrase);
				}
				else {
					theResult = titleCase("The " + nounObj + " that " + RiTa.conjugate(verbObj, {tense: RiTa.PAST}) + " " + nounPhrase);
				}
				if (Math.random() < 0.5) {
					theResult += titleCase(randomizedLocale);
				}
                showResult();
            });
            break;
        case 5:
			var adjObj;
		     getAdjective(noun1).then(function(obj){
                adjObj = randomFromArray(obj);
				if (adjObj==undefined) {
					adjObj = RiTa.randomWord({ pos: "jj"});//fallback
				}
				getNoun(adj1).then(function(obj2){
					var nounObj = randomFromArray(obj2);
					if (nounObj==undefined) {
						nounObj = RiTa.randomWord({ pos: "nn"});//fallback
					}
					theResult = titleCase(adjObj.word + " " + RiTa.pluralize(noun1) + " and the " + adj1 + " " + nounObj.word);
					if (Math.random() < 0.5) {
						theResult += titleCase(randomizedLocale);
					}
					showResult();
				});
            });
            break;
		case 6:
			getVerb(noun1).then(function(obj){
				var tmpArrV = [];
				var tmpArrN = [];
				for (var i=0;i<obj.length;i++) {
					if (obj[i].tags != undefined) {
						if (obj[i].tags.includes("v")) {
							tmpArrV.push(obj[i].word);
						}
						else if (obj[i].tags.includes("n") && RiTa.isNoun(obj[i].word)) {
							tmpArrN.push(obj[i].word);
						}
					}
				}
				if (tmpArrN.length < 2) {
					tmpArrN = tempArrayNouns;
				}
				if (tmpArrV.length < 2) {
					tmpArrV = tempArrayVerbs;
				}
				var nounPhrase;
				if (Math.random() < 0.5) {
					nounPhrase = (RiTa.evaluate('(the | )') + " " + RiTa.pluralize(noun1));
				}
				else {
					nounPhrase = ("the " + RiTa.singularize(noun1));
				}
                var verbObj = randomFromArray(tmpArrV);
				var nounObj = randomFromArray(tmpArrN);
				if (nounObj=="in") {
					nounObj = RiTa.randomWord({ pos: "nn"});//fallback
				}
				if (Math.random() < 0.5) {
					theResult = titleCase(RiTa.evaluate('(as|when|how)') + " " + RiTa.evaluate('(I|she|he)') + " " + RiTa.conjugate(verbObj, {tense: RiTa.PAST}) + " " + nounPhrase);
				}
				else {
					theResult = titleCase("The " + nounObj + " " + RiTa.conjugate(verbObj, {form: RiTa.GERUND}) + " " + nounPhrase);
				}
				if (Math.random() < 0.5) {
					theResult += titleCase(randomizedLocale);
				}
                showResult();
            });
			break;		
		case 7:
			getVerb(noun1).then(function(obj){
				var tmpArr = [];
				for (var i=0;i<obj.length;i++) {
					if (obj[i].tags != undefined) {
						if (obj[i].tags.includes("v")) {
							tmpArr.push(obj[i].word);
						}
					}
				}
				if (tmpArr.length < 2) {
					tmpArr = tempArrayVerbs;
				}
                var verbObj = randomFromArray(tmpArr);
                theResult = titleCase("To " + RiTa.conjugate(verbObj, {tense: RiTa.INFINITIVE}) + " " + RiTa.evaluate('('+RiTa.singularize(noun1)+').art()'));
                showResult();
            });
			break;
		case 8:
			getVerb(noun1).then(function(obj){
				var tmpArr = [];
				for (var i=0;i<obj.length;i++) {
					if (obj[i].tags != undefined) {
						if (obj[i].tags.includes("v")) {
							tmpArr.push(obj[i].word);
						}
					}
				}
				if (tmpArr.length < 2) {
					tmpArr = tempArrayVerbs;
				}
                var verbObj = randomFromArray(tmpArr);
                theResult = titleCase(RiTa.conjugate(verbObj, {tense: RiTa.INFINITIVE}) + " the " + RiTa.singularize(noun1));
                showResult();
            });
			break;		
		default: 
			if (Math.random() < 0.5) {
				theResult = titleCase("The " + adj1 + " " + noun1);
			}
			else {
				theResult = titleCase(RiTa.evaluate('('+adj1+').art()') + " " + RiTa.singularize(noun1));
			}
            showResult();
    }

}

function showResult() {
	if (cnt>0) {
		$("#theText").append("<br><hr>");
	}
	else {
		$("#theText").html("");
	}
	var sp = document.createElement("span");
	sp.setAttribute("id", ("span"+cnt));
	document.getElementById("theText").appendChild(sp);
	$("#span"+cnt).hide();
	$("#span"+cnt).html(theResult);
	$("#span"+cnt).fadeIn(1500);
	scrollBot('textFrame');
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
	if (cnt==0) {
		$("#theText").html("<span style='color:darkred'>The list is empty!</span>");
	}
	else {
		if (b) {
			var hiddenElement = document.createElement('a');
			hiddenElement.href = 'data:attachment/text,' + encodeURI(document.getElementById('theText').innerText);
			hiddenElement.target = '_blank';
			hiddenElement.download = 'TitleGenerator.txt';
			hiddenElement.click();
			$("#fooOK").fadeIn(1000);
			setTimeout(function(){
				$("#fooOK").fadeOut(1500);
			}, 1500);
		}
		else {
			cnt=0;
			$("#theText").html("");
		}
	}
}

const scrollBot = (id) => {
    const element = $(`#${id}`);
    element.animate({
        scrollTop: element.prop("scrollHeight")
    }, 500);
}
