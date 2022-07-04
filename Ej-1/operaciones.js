const op = {
  '^': (a,b) => (+a)**(+b),
  '/': (a,b) => (+a)/(+b),
  '*': (a,b) => +a*(+b),
  '-': (a,b) => +a-b,
  '+': (a,b) => +a+(+b),
}

function resolve(string){
  //Si la operacion tiene una longitud mayor a 30 no operamos
  if(string.length > 30) return;
  let copy = string;
  //Separamos en un arreglo todos los números y operadores matemáticos usando Regex
  string = string.replace(/[0-9]+/g, "#").replace(/[\(|\|\.)]/g, "");
  const numbers = copy.split(/[^0-9\.]+/);
  const operators = string.split("#").filter(function(n){return n});
  const stringCopy = [];

  //Generamos el arreglo final con todos los elementos a evaluar separados
  for(i = 0; i < numbers.length; i++){
     stringCopy.push(numbers[i]);
     if (i < operators.length) stringCopy.push(operators[i]);
  }
  
  //Recorremos el objeto de operaciones y verificamos la coincidencia de signos
  Object.keys(op).forEach( (sign,i) => {
    if(!stringCopy.includes(sign)) return;
    let index = 0;
    
    while(stringCopy[index]){
      const char = stringCopy[index];
      if (char === sign) {
        //Operamos los dos elementos adyacentes al operador
        const result = op[sign](stringCopy[index-1],stringCopy[index+1]);
        //guardarmos el resultado sustituyendo el valor de string copy por el valor de la operacion
        stringCopy.splice(index-1, 3, result);
        index = index
      } else {
        index++ 
      }
    }
  })
  //retornamos el resultado que represente la cantidad total
  return +stringCopy.join('')

}

const test = '122+4-5/2^6*2*2';
console.log(resolve(test))