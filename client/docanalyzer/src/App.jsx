import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import { AuthProvider } from './hooks/useAuth';
import Navbar from './components/Navbar';
import './App.css'; 

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen w-full flex flex-col bg-neutral-50">
          <Navbar className="w-full" />

          <main className="w-full flex-1  flex flex-col">
            <AppRoutes />
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}
export default App;