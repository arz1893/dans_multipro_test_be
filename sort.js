const input = [2, 1, 21, 8, 17, 29, 21]

function sortArray(input) {
    for(let i = 0; i < input.length; i++) {
        for(let j = i; j < input.length; j++) {
            if(input[j] < input[i]) {
                let temp = input[i]
                input[i] = input[j]
                input[j] = temp
            }
        }
    }
    return input
}

const result = sortArray(input)

console.log(result)