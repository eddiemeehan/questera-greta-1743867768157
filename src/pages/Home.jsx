import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { useState } from 'react';
import { FaStar, FaBolt, FaCheck } from 'react-icons/fa';

const profiles = [
  {
    id: 1,
    name: 'Sarah Johnson',
    age: 24,
    bio: 'Adventure seeker and coffee lover',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    interests: ['hiking', 'coffee', 'travel', 'yoga'],
    location: {
      latitude: 40.7282,
      longitude: -73.9942
    },
    verified: true
  },
  {
    id: 2,
    name: 'Michael Chen',
    age: 28,
    bio: 'Tech enthusiast and foodie',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    interests: ['technology', 'cooking', 'photography', 'gaming'],
    location: {
      latitude: 40.7305,
      longitude: -73.9091
    },
    verified: false
  }
];

export default function Home() {
  const { user, spendCredits, getMatchingScore } = useUser();
  const [currentProfile, setCurrentProfile] = useState(0);

  const handleLike = () => {
    if (spendCredits(10)) {
      setCurrentProfile(prev => (prev + 1) % profiles.length);
    }
  };

  const handleSkip = () => {
    setCurrentProfile(prev => (prev + 1) % profiles.length);
  };

  const handleSuperLike = () => {
    if (user.profile.boosts.superLike > 0) {
      setCurrentProfile(prev => (prev + 1) % profiles.length);
    }
  };

  const matchScore = getMatchingScore(profiles[currentProfile]);

  return (
    <div className="max-w-md mx-auto">
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-lg shadow-xl overflow-hidden"
      >
        <div className="relative">
          <img 
            src={profiles[currentProfile].photo}
            alt={profiles[currentProfile].name}
            className="w-full h-96 object-cover"
          />
          <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full">
            {matchScore}% Match
          </div>
          {profiles[currentProfile].verified && (
            <div className="absolute top-4 left-4 bg-green-500 text-white p-2 rounded-full">
              <FaCheck size={16} />
            </div>
          )}
        </div>
        
        <div className="p-6">
          <h2 className="text-2xl font-bold">
            {profiles[currentProfile].name}, {profiles[currentProfile].age}
          </h2>
          <p className="text-gray-600 mt-2">{profiles[currentProfile].bio}</p>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {profiles[currentProfile].interests.map((interest, index) => (
              <span 
                key={index}
                className="bg-secondary bg-opacity-20 text-primary px-3 py-1 rounded-full text-sm"
              >
                {interest}
              </span>
            ))}
          </div>
          
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handleSkip}
              className="px-6 py-3 bg-gray-200 rounded-full hover:bg-gray-300 transition"
            >
              Skip
            </button>
            {user.profile.boosts.superLike > 0 && (
              <button
                onClick={handleSuperLike}
                className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-opacity-90 transition flex items-center gap-2"
              >
                <FaStar />
                Super Like
              </button>
            )}
            <button
              onClick={handleLike}
              className="px-6 py-3 bg-primary text-white rounded-full hover:bg-opacity-90 transition"
            >
              Like (10 Credits)
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}