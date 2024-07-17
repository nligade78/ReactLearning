// Array Methods
// There are many Javascript array methods

// One of the most useful in React is the map() array method

// The .map() methods allows you to run a function on each item in the array, returning a new array as the result.

// In react, map() can be used to generate lists.

// Example

import React from 'react';
import ReactDOM from 'react-dom/client';

const myArray =['apple','banana','orange'];

const myList= myArray.map((item) =><p>{item}</p>)

const container =document.getElementById('root');
const root=ReactDOM.createRoot(container);
root.render(myList);