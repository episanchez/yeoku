/*
 * An Extended Array Module
 * @module
 */

var exp = module.exports;

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

exp.clean = function(array, deleteValue) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] == deleteValue) {         
      array.splice(i, 1);
      i--;
    }
  }
  return array;
};

exp.equals = function (arr1, arr2) {
    // if the other array is a falsy value, return

    if (!arr1 || !arr2)
        return false;

    arr1 = exp.clean(arr1, "");
    arr2 = exp.clean(arr2, "");

    // compare lengths - can save a lot of time 
    if (arr1.length != arr2.length){
        return false;
      }

    arr1 = arr1.sort();
    arr2 = arr2.sort();

    for (var i = 0; i < arr1.length; i++){
      if (arr1[i] != arr2[i]){
        return false;
      }
    }
    return true;
};

exp.intersect = function(a, b)
{
  var ai = bi= 0;
  var result = [];

  while( ai < a.length && bi < b.length ){
     if      (a[ai] < b[bi] ){ ai++; }
     else if (a[ai] > b[bi] ){ bi++; }
     else /* they're equal */
     {
       result.push(ai);
       ai++;
       bi++;
     }
  }

  return result;
};

exp.isIntersect = function(a, b){
  if (exp.intersect(a, b).length > 0)
    return true;
  return false;
};