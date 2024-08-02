// Destructuring Arrays

// Here is the old way of assigning array items to a variable:

const vehicles =['mustang','f-150','expedition','honda'];

//old way
const car= vehicles[0];
const truck= vehicles[1];
const suv= vehicles[2];
const bike= vehicles[3];


//Here is the new way of assigning array items to a variable:

// With destructuring

const vehicless = ['mustang', 'f-150', 'expedition'];

const [carr, truckk, suvv] = vehicless;
// When destructuring arrays, the order that variables are declared is important.


// If we only want the car and suv we can simply leave out the truck but keep the comma:

// const vehicles = ['mustang', 'f-150', 'expedition'];

// const [car,, suv] = vehicles;

// Destructuring comes in handy when a function returns an array:


function calculate(a, b) {
    const add = a + b;
    const subtract = a - b;
    const multiply = a * b;
    const divide = a / b;
  
    return [add, subtract, multiply, divide];
  }
  
  const [add, subtract, multiply, divide] = calculate(4, 7);
