var Keys = ["A", "Bb", "B", "C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab"]
var KeysS = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"]
var KeysF = ["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab"]
counter = 0;
var kc = document.getElementById("keyc");
var chordN = document.getElementById("chordName");
var chordT = document.getElementById("chordType");
chordN.addEventListener("input",makePreview);
chordT.addEventListener("input",makePreview);
var chordNames = ["Major", "Minor", "Diminished","Augmented","Major 7th", "Minor 7th", "Minor Major 7th", "Dominant 7th"];
var chordNums = [[0,4,7],[0,3,7],[0,3,6],[0,4,8],[0,4,7,11],[0,3,7,10],[0,3,7,11],[0,4,7,10]];
var chordExt = ["b9","9","#9","11","#11","b13","13"];
var extNums = [13,14,15,17,18,20,21];
var chord = makeNotes(chordT.value,chordN.value)
var chordP = makeString(chord);
var extensions = [];
var values = [];
values.length = 5;
extensions.length = 5
var e1 = document.getElementById("extension1");
var e2 = document.getElementById("extension2");
var e3 = document.getElementById("extension3");
var e4 = document.getElementById("extension4");
var e5 = document.getElementById("extension5");
var removable = counter > 0;
e1.addEventListener("input",function(){addExtension(e1.value,0);makePreview()},false);
e2.addEventListener("input",function(){addExtension(e2.value,1);makePreview()},false);
e3.addEventListener("input",function(){addExtension(e3.value,2);makePreview()},false);
e4.addEventListener("input",function(){addExtension(e4.value,3);makePreview()},false);
e5.addEventListener("input",function(){addExtension(e5.value,4);makePreview()},false);

function flip(){
  space = document.getElementById("answer");
  corrExt = [];
  for (var i = 0; i < extensions.length; i++){
    if (typeof extensions[i] == "string"){
      corrExt.push(extensions[i])
    }
  }
  let chordAnswer = getNegative(chord,kc.value);
  chordAnswer = makeString(chordAnswer)
  let extAnswer = getNegative(corrExt,kc.value);
  extAnswer = makeExtString(extAnswer);
  console.log(chordAnswer,extAnswer);
  space.innerHTML = chordAnswer + "( " + extAnswer + " )";

}
// extensions[0].addEventListener("input",function(){addExtension("b9")});
preview = document.getElementById("chordP");
preview.innerHTML = chordP;
function print(value){
  console.log(value);
}
function updateExtension(){
  for (var i = 0; i < extensions.length; i++){
    if (typeof extensions[i] != "undefined"){
      if (i == 0){
        addExtension(e1.value,i)
      }
      if (i == 1){
        addExtension(e2.value,i)
      }
      if (i == 2){
        addExtension(e3.value,i)
      }
      if (i == 3){
        addExtension(e4.value,i)
      }
      if (i == 4){
        addExtension(e5.value,i)
      }

    }
  }

}
function insertExtension(){
  if (counter < 5){
  var element = document.getElementById("extension" + (counter + 1).toString());
  var remove = document.getElementById("remBtn");
  remove.hidden = false;
  element.hidden = false;
  addExtension(element.value,counter);
  makePreview();
  counter++;
}
}
function removeExtension() {
  if (counter > 0){
    var element = document.getElementById("extension" + (counter).toString());
    extensions[counter-1] = undefined;
    var remove = document.getElementById("remBtn");
    if (counter == 1){
      remove.hidden = true;
      removable = false;
      this.hidden = false;
    }
    element.hidden = true;
    makePreview();
  counter--;
  }
}
function addExtension(extension,num){
  extIndex = 0
  for (var i = 0; i < chordExt.length; i++){
    if (extension == chordExt[i]){
       extIndex = i
    }
  }
  var rootIndex = 0;
  for (var i = 0; i < Keys.length; i++){
    if (chord[0] == Keys[i]){
      rootIndex = i;
    }
  }
  console.log(extension,"extension")
  console.log(extNums[extIndex])
  console.log(chord[0])
  console.log(Keys[rootIndex],"root")
  extensions[num] = Keys[(rootIndex+extNums[extIndex])%12];
  console.log(extensions[num])
}
function iN(value,array){
  if (array.indexOf(value) != -1){
    return true;
  }
  return false;
}
function makeExtString(array){
  var answer = "";
  for (var i = 0; i < array.length; i++){
    if (typeof array[i] != "undefined"){
    answer += array[i] + " ";
  }
  }
  return answer;


}
function makeString(array){
  var stringArr = [];
  for (var i = 0; i < array.length; i++){
    stringArr.push(array[i].toString());
  }
  var finalString = "";
  for (var i = 0; i < array.length; i++){
    finalString += stringArr[i] + " ";
  }
  return finalString;
}
function makeNotes(name, root){
  var index = 0;
  var rootIndex = 0;
  for (var i = 0; i < chordNames.length; i++){
    if (name == chordNames[i]){
      index = i;
    }
  }
  for (var i = 0; i < Keys.length; i++){
    if (root == Keys[i]){
      rootIndex = i;
    }
  }

  var tones = chordNums[index];
  notes = [];
  thisKeys = Keys;
  for (var i = 0; i < tones.length; i++){
    notes.push(thisKeys[(rootIndex + tones[i]) % 12]);
  }
  return notes;
}

function makePreview(){
  chord = makeNotes(chordT.value,chordN.value)
  updateExtension();
  console.log(chord)
  console.log(extensions)
  var chordP = makeString(chord) + "( " + makeExtString(extensions) + " )";
  preview.innerHTML = chordP;
}

//------------------------Negative Harmony----------------------------//

function makeScale(Cen){
var index = 0;
var answer = [Cen];
for (var i = 0; i < Keys.length; i++) {
  if (Cen == Keys[i]) {
    index = i;
  }
}
for (var j = 1; j < 12; j++) {
  if (index + j < 12) {
    answer.push(Keys[index+j]);
  } else {
    index = index - 12;
    answer.push(Keys[index+j]);
  }
}

var temp = answer[0];
for (var i1 = 0; i1 < 2; i1++) {
  temp = answer[11];
  for (var i2 = 11; i2 >= 0; i2--) {
    answer[i2] = temp;
    if (i2 > 0) {
      answer[i2] = answer[i2-1];
    }
  }
}
return answer;
}
function getNegative(input, Cen) {
var answer = input;
var scale = makeScale(Cen);
var index = [];
var diff = [];
for (var i = 0; i < input.length; i++) {
  for (var j = 0; j < scale.length; j++) {
    if (input[i] == scale[j]) {
      index.push(j);
    }
  }
  if (index[i] < 6) {
    diff.push(6 - index[i]);
  } else {
    diff.push(index[i] - 5);
  }
  if (index[i] < 6) {
    answer[i] = scale[5+diff[i]];
  } else {
    answer[i] = scale[6-diff[i]];
  }
}

return answer;
}
