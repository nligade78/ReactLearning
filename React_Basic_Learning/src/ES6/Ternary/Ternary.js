// The ternary operator is a simplified conditional operator like if / else.

// Syntax: condition ? <expression if true> : <expression if false>

if (authenticated) {
    renderApp();
  } else {
    renderLogin();
  }
  
  authenticated ? renderApp() : renderLogin();

