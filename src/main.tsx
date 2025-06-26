// Import React's StrictMode for highlighting potential problems in development
import { StrictMode } from 'react';

// Import createRoot for rendering the app using React 18's concurrent features
import { createRoot } from 'react-dom/client';

// Import the root App component
import App from './App.tsx';

// Import Tailwind CSS styles (this file includes @tailwind directives)
import './index.css';

// Get the root element from the HTML (assumes <div id="root"></div> exists)
const rootElement = document.getElementById('root')!;

// Create and render the app into the root element
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
