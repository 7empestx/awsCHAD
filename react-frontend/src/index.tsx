import React from 'react';
import ReactDOM from 'react-dom/client';
import "@cloudscape-design/global-styles/index.css";
import { LoginPage } from './Login';

function App() {
  return (
    <div>
      <LoginPage />
    </div>
  );
}

const root = document.getElementById('root');
const reactRoot = ReactDOM.createRoot(root);
reactRoot.render(<App />);
