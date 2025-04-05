import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { FaHeart, FaUser, FaCreditCard } from 'react-icons/fa';

export default function Navbar() {
  const { user } = useUser();
  
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-primary">
            ScoreDate
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/credits" className="flex items-center text-dark">
              <FaCreditCard className="mr-1" />
              {user.credits} Credits
            </Link>
            <Link to="/matches" className="text-dark">
              <FaHeart />
            </Link>
            <Link to="/profile" className="text-dark">
              <FaUser />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}