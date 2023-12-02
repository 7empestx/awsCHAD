import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return <h1>Sup Chad!</h1>;
}

const root = document.getElementById('root');
const reactRoot = ReactDOM.createRoot(root);
reactRoot.render(<App />);
