let key = {};
const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n'
,'o','p','q','r','s','t','u','v','w','x','y','z'];
function Decrypt(){
    const inputText = document.getElementById("encrypted").value;
    let bestMessage = "";
    let bestScore = -100000;  
    let offset = 0;
    for(let i = 0; i < 26; i++){
        CreateKey(i);
        const results = Decode(inputText);
        //console.log(`Message: ${results[0]} Score: ${results[1]}`);
        if(results[1] > bestScore){
            bestScore = results[1];
            bestMessage = results[0];
            offset = i;
        }
    }

    console.log(bestMessage + ". Offset: " + offset);
}

function Encrypt(){
    const offset = document.getElementById("offset").value;
    const text = document.getElementById("unencrypted").value;
    let t = 1;
    
    console.log(text);
    CreateKey(offset);
    console.log(key);
    console.log(Decode(text)[0]);
}

function CreateKey(placesMoved){
    
    for(let i = 0; i < alphabet.length; i++){
        
        key[alphabet[i]]  = GetNextCharacter(i, placesMoved);
        //console.log(`Original letter: ${alphabet[i]} New letter:${key[alphabet[i]]} Places moved: ${placesMoved}`);

    }
}

function GetNextCharacter(originalPlace,placesMoved){
    if(originalPlace + placesMoved >= alphabet.length){
        return alphabet[originalPlace + placesMoved - alphabet.length];
    }else{
        return alphabet[originalPlace + placesMoved];
    }
}

function Decode(inputText){
    let result = "";
    let numUnusual = 0;
    let numCommon = 0;
    for(let i = 0; i < inputText.length; i++){
        if(inputText[i] == " "){
            result += " ";
        }
        else{
            result += key[inputText[i]];
            if(key[inputText[i]] == "e"){
                numCommon++;
            }
            else if(key[inputText[i]] == "z" || key[inputText[i]] == "x" || key[inputText[i]] == "q"){
                numUnusual++;
            }
            //console.log("Decoding: " + inputText[i]);
        }
    }
    return [result, numCommon - numUnusual];
}

