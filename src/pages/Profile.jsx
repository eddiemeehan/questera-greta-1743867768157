import { useUser } from '../context/UserContext';
import { motion } from 'framer-motion';
import { FaStar, FaBolt, FaCrown, FaCheck } from 'react-icons/fa';

export default function Profile() {
  const { user, activateBoost } = useUser();

  const boostOptions = [
    {
      id: 'superLike',
      name: 'Super Like',
      description: 'Stand out with a Super Like to get 3x more matches',
      icon: FaStar,
      cost: 25,
      current: user.profile.boosts.superLike,
      color: 'blue'
    },
    {
      id: 'spotlight',
      name: 'Spotlight',
      description: 'Get featured at the top of discover for 30 minutes',
      icon: FaBolt,
      cost: 50,
      current: user.profile.boosts.spotlight,
      color: 'yellow'
    },
    {
      id: 'priorityMatch',
      name: 'Priority Match',
      description: 'Your profile gets priority in matching algorithm for 7 days',
      icon: FaCrown,
      cost: 100,
      current: user.profile.boosts.priorityMatchUntil,
      color: 'purple'
    },
    {
      id: 'verifiedBadge',
      name: 'Verified Badge',
      description: 'Get a verified badge to build trust and get more matches',
      icon: FaCheck,
      cost: 200,
      current: user.profile.boosts.verifiedBadge,
      color: 'green'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Info */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative">
          <img
            src={user.profile.photos[0]}
            alt={user.profile.name}
            className="w-full h-64 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold text-white">
                {user.profile.name}, {user.profile.age}
              </h1>
              {user.profile.boosts.verifiedBadge && (
                <FaCheck className="text-green-400 text-xl" />
              )}
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">About Me</h2>
            <p className="text-gray-600">{user.profile.bio}</p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">Credits</p>
                <p className="text-2xl font-bold">{user.credits}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">Matches</p>
                <p className="text-2xl font-bold">{user.matches.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Boost Options */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Premium Boosts</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {boostOptions.map((boost) => (
            <motion.div
              key={boost.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border rounded-lg p-4 relative overflow-hidden"
            >
              <div className={`absolute top-0 right-0 p-2 text-white bg-${boost.color}-500 rounded-bl-lg`}>
                {boost.cost} Credits
              </div>
              
              <div className="flex items-center gap-3 mb-2">
                <boost.icon className={`text-${boost.color}-500 text-2xl`} />
                <h3 className="text-lg font-semibold">{boost.name}</h3>
              </div>
              
              <p className="text-gray-600 mb-4">{boost.description}</p>
              
              {typeof boost.current === 'number' && (
                <p className="text-sm text-gray-500 mb-2">
                  Available: {boost.current}
                </p>
              )}
              
              {boost.current instanceof Date && (
                <p className="text-sm text-gray-500 mb-2">
                  Active until: {boost.current.toLocaleDateString()}
                </p>
              )}
              
              {typeof boost.current === 'boolean' ? (
                boost.current ? (
                  <button
                    disabled
                    className="w-full bg-green-500 text-white py-2 rounded-lg opacity-50"
                  >
                    Active
                  </button>
                ) : (
                  <button
                    onClick={() => activateBoost(boost.id)}
                    className="w-full bg-primary text-white py-2 rounded-lg hover:bg-opacity-90 transition"
                  >
                    Activate
                  </button>
                )
              ) : (
                <button
                  onClick={() => activateBoost(boost.id)}
                  className="w-full bg-primary text-white py-2 rounded-lg hover:bg-opacity-90 transition"
                >
                  Purchase
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}