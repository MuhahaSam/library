// let word = "aAaaamaaaaa"
// const word2 = "aAmkaa"
// function isPolindrom(word){
//     const regisrtWord = word.toLowerCase()
//     const length = Math.ceil(word.length/2)
//     for (let i = 0; i < length; i++){
//         if(regisrtWord[i] !== regisrtWord[word.length - i - 1]) 
//         {
//             return false    
//         }
        
//     }
//     return true
// }

// console.log(isPolindrom(word))
// console.log(isPolindrom(word2))

// word.split('').reverse().join('') === word

const sam = [1,1,1,2,3,4,5,5,5]
const kim = new Set(sam)
console.log(Array.from(kim.values()))


