const myElements = <h1>React is {5 + 5} times better with JSX</h1>;


import React from 'react';
import ReactDOM from 'react-dom/client';

const myElement = (
  <ul>
    <li>Apples</li>
    <li>Bananas</li>
    <li>Cherries</li>
  </ul>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(myElement);

/* 
What is JSX?
JSX stands for JavaScript XML. It is a syntax extension for JavaScript used with React to describe what the UI should look like. JSX may remind you of a template language, but it comes with the full power of JavaScript.

Syntax and Rules
Basic Syntax

JSX allows you to write HTML-like syntax within JavaScript.
Each JSX element is translated to regular JavaScript by Babel (a JavaScript compiler).

const element = <h1>Hello, world!</h1>;

*/

/*
  Embedding Expressions in JSX
  You can embed any JavaScript expression within JSX by wrapping it in curly braces {}
  const name = 'John';
  const element = <h1>Hello, {name}!</h1>;

*/

/*
 JSX is an Expression Too

 After compilation, JSX expressions become regular JavaScript function calls and evaluate to JavaScript objects.
 This means you can use JSX inside of if statements and for loops, assign it to variables, accept it as arguments, and return it from functions.

 function getGreeting(user) {
  if (user) {
    return <h1>Hello, {user}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}

*/

/**
   Specifying Attributes with JSX

You can use quotes to specify string literals as attributes.
You can also use curly braces to embed a JavaScript expression as an attribute.
const element = <div tabIndex="0"></div>;
const element = <img src={user.avatarUrl}></img>;

 */

/*
  Specifying Children with JSX
  If a tag is empty, you can close it immediately with />.
  const element = <img src={user.avatarUrl} />;
*/

/*
 JSX tags may contain children.
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);

*/

/*
  JSX Prevents Injection Attacks
  By default, React DOM escapes any values embedded in JSX before rendering them. Everything is converted to a string before being rendered.
 */

  /*
   JSX Represents Objects
   Babel compiles JSX down to React.createElement() calls.
   const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);

const element = React.createElement(
  'h1',
  { className: 'greeting' },
  'Hello, world!'
);

React.createElement() performs a few checks to help you write bug-free code but essentially creates an object like this:
// Note: this structure is simplified
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};

  */


// Embedding Expressions in JSX: Complete Details

/*
  Embedding Variables
  You can embed any valid JavaScript expression in JSX by wrapping it in curly braces {}.
  const user = {
  firstName: 'John',
  lastName: 'Doe'
};
const element = <h1>Hello, {user.firstName} {user.lastName}!</h1>;
*/

/*
  Embedding Function Calls
  You can also embed function calls within JSX.
  function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

*/

/*
  Embedding Expressions in Attributes
  Use curly braces to embed a JavaScript expression in an attribute.
  const user = {
  avatarUrl: 'http://placekitten.com/g/200/300'
};

const element = <img src={user.avatarUrl} />;


*/

/*
  Embedding Conditional Statements
  You can use JavaScript conditional statements like if, ternary operators, or && within JSX.
  function getGreeting(user) {
  if (user) {
    return <h1>Hello, {user}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}

const element = getGreeting(user);


const isLoggedIn = true;
const element = (
  <div>
    {isLoggedIn ? <LogoutButton /> : <LoginButton />}
  </div>
);



const isLoggedIn = true; 

const element = (
  <div>
    {isLoggedIn && <LogoutButton />}
  </div>
);

*/


/*
Key Points to Remember
JSX allows embedding JavaScript expressions within HTML-like syntax.
JSX is compiled to React.createElement() calls by Babel.
JSX expressions are JavaScript expressions and can be used in any context that JavaScript expressions can.
You can use curly braces {} to embed variables, function calls, and other JavaScript expressions in JSX.
JSX helps in writing more readable and maintainable UI components by combining the power of JavaScript with the simplicity of HTML-like syntax.
*/