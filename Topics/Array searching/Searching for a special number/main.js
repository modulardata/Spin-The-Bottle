/*
* In the code below an array of numbers is given to the search() function. Change it so that the function searches for the number in the array that is divisible by 11 and returns it.
* */
function search(numbers) {
// Write your code here
    return numbers.find(n => n % 11 === 0);
}
