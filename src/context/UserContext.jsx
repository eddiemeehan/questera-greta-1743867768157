import { createContext, useContext, useState, useEffect } from 'react';
import { calculateMatchScore } from '../utils/matchingAlgorithm';
import { fetchUserData, fetchMatches } from '../services/api';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Replace with actual user ID from authentication
        const userId = '123'; // This should come from your auth system
        const userData = await fetchUserData(userId);
        const userMatches = await fetchMatches(userId);
        
        if (userData) {
          setUser({
            ...userData,
            matches: userMatches
          });
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const spendCredits = (amount) => {
    if (user.credits >= amount) {
      setUser(prev => ({
        ...prev,
        credits: prev.credits - amount
      }));
      return true;
    }
    return false;
  };

  const activateBoost = async (boostType) => {
    const boostCosts = {
      superLike: 25,
      spotlight: 50,
      priorityMatch: 100,
      verifiedBadge: 200
    };

    if (spendCredits(boostCosts[boostType])) {
      try {
        // Call your API to activate the boost
        const response = await api.post(`/boosts/${user.id}`, {
          boostType,
          cost: boostCosts[boostType]
        });

        if (response.data.success) {
          setUser(prev => ({
            ...prev,
            profile: {
              ...prev.profile,
              boosts: {
                ...prev.profile.boosts,
                [boostType]: boostType === 'priorityMatch'
                  ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
                  : boostType === 'verifiedBadge'
                    ? true
                    : prev.profile.boosts[boostType] + 1
              }
            }
          }));
          return true;
        }
      } catch (error) {
        console.error('Error activating boost:', error);
      }
    }
    return false;
  };

  const getMatchingScore = (otherProfile) => {
    return calculateMatchScore(user.profile, otherProfile);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      spendCredits,
      activateBoost,
      getMatchingScore
    }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);