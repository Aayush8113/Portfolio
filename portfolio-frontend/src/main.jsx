  import React from 'react';
  import ReactDOM from 'react-dom/client';

  // 1. Import the Browser Router
  import { BrowserRouter } from 'react-router-dom';

  // 2. Import your global CSS
  import './index.css';

  // 3. Import your main App component
  import App from './App';

  // 4. Render the app!
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      {/* We wrap the *entire* App in BrowserRouter.
        This gives all components inside App access to the router.
      */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );