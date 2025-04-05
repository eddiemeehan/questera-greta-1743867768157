import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

export default function Matches() {
  const { user } = useUser();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Your Matches</h1>
      
      <div className="grid gap-4">
        {user.matches.length === 0 ? (
          <p className="text-gray-500 text-center">
            No matches yet. Start liking profiles to get matches!
          </p>
        ) : (
          user.matches.map((match) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-4 rounded-lg shadow-lg flex items-center gap-4 hover:shadow-xl transition"
            >
              <img
                src={match.photo}
                alt={match.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h2 className="font-semibold">{match.name}</h2>
                <p className="text-gray-500 text-sm">
                  {match.messages.length > 0
                    ? `${match.messages[match.messages.length - 1].text.substring(0, 30)}...`
                    : 'No messages yet'}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {match.messages.length > 0
                    ? format(new Date(match.messages[match.messages.length - 1].timestamp), 'PP')
                    : 'New match'}
                </p>
              </div>
              <Link
                to={`/chat/${match.id}`}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition"
              >
                Chat
              </Link>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}