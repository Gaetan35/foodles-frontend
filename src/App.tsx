import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toast";
import { Home } from "./pages/home/Home";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
      <ToastContainer position="top-right" />
    </QueryClientProvider>
  );
}

export default App;
