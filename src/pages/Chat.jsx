import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { FaArrowLeft, FaPaperPlane } from 'react-icons/fa';

export default function Chat() {
  const { matchId } = useParams();
  const { user, sendMessage } = useUser();
  const [newMessage, setNewMessage] = useState('');

  const match = user.matches.find(m => m.id === parseInt(matchId));
  if (!match) return <div>Match not found</div>;

  const handleSend = (e) => {
    e.preventDefault();
    if (newMessage.trim() && sendMessage(match.id, newMessage.trim())) {
      setNewMessage('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden h-[calc(100vh-7rem)]">
      {/* Chat Header */}
      <div className="bg-primary p-4 flex items-center gap-4">
        <Link to="/matches" className="text-white">
          <FaArrowLeft size={20} />
        </Link>
        <img
          src={match.photo}
          alt={match.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="text-white">
          <h2 className="font-semibold">{match.name}</h2>
          <p className="text-sm opacity-80">
            Last active {format(new Date(match.lastActive), 'PP')}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="p-4 h-[calc(100%-8rem)] overflow-y-auto">
        {match.messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-primary text-white rounded-br-none'
                  : 'bg-gray-100 rounded-bl-none'
              }`}
            >
              <p>{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
              }`}>
                {format(new Date(message.timestamp), 'p')}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Message Input */}
      <form onSubmit={handleSend} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message (5 credits)"
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-primary"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="bg-primary text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaPaperPlane />
          </button>
        </div>
      </form>
    </div>
  );
}