import { Home } from "./Home/Home";
import ErrorBoundary from "ErrorBoundary";
function App():JSX.Element {
  return (
    <ErrorBoundary>
      <Home />
    </ErrorBoundary>
  );
}

export default App;
