import { BrowserRouter as Router } from "react-router-dom";
import { AllRoutes } from "./routes";

import { CartProvider } from "./context";
import { BackToTop, Header } from "./components";

/**
 * Main application component that sets up global providers and routing.
 */
function App() {
  return (
    // Provide cart state across the app
    <CartProvider>
      {/* Set up routing using React Router */}
      <Router>
        <div className="min-h-screen bg-gray-50">
          {/* Persistent header/navigation */}
          <Header />

          {/* Application routes */}
          <AllRoutes />

          {/* BackToTop icon */}
          <BackToTop />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
