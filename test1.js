const fsLibrary  = require('fs') 
function readBestScore(path, data){
    fsLibrary.readFile(path, (error, txtString) => {
        if (error) throw error; 
        data = txtString.toString()
    }) 
    return data
}
var bestScore;
readBestScore('score.txt',bestScore)
console.log(bestScore)