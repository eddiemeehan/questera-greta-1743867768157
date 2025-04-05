import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Matches from './pages/Matches';
import Credits from './pages/Credits';
import Chat from './pages/Chat';
import { UserProvider } from './context/UserContext';

export default function App() {
  return (
    <UserProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/credits" element={<Credits />} />
            <Route path="/chat/:matchId" element={<Chat />} />
          </Routes>
        </main>
      </div>
    </UserProvider>
  );
}