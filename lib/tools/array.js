/*
 * An Extended Array Class
 */

var exp = module.exports:

exp.removeByIndex = function (arr, index) {
    arr.splice(index, 1);
};

exp.removeByValue = function (arr, val) {
    for(var i=0; i<arr.length; i++) {
        if(arr[i] == val) {
            arr.splice(i, 1);
            break;
        }
    }
};