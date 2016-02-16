/*
 * An Extended Array Class
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