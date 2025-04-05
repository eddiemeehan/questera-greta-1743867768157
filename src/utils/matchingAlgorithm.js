// Scoring weights for different matching criteria
const WEIGHTS = {
  agePreference: 0.3,
  interests: 0.4,
  location: 0.3
};

export function calculateMatchScore(user1, user2) {
  let totalScore = 0;

  // Age preference matching
  const ageDiff = Math.abs(user1.age - user2.age);
  const ageScore = Math.max(0, 1 - (ageDiff / 10)); // Normalize age difference
  
  // Interests matching
  const commonInterests = user1.interests.filter(interest => 
    user2.interests.includes(interest)
  );
  const interestScore = commonInterests.length / Math.max(user1.interests.length, user2.interests.length);
  
  // Location matching (using distance in km)
  const locationScore = calculateLocationScore(user1.location, user2.location);
  
  // Calculate weighted score
  totalScore = (ageScore * WEIGHTS.agePreference) +
               (interestScore * WEIGHTS.interests) +
               (locationScore * WEIGHTS.location);
               
  return Math.round(totalScore * 100);
}

function calculateLocationScore(loc1, loc2) {
  if (!loc1 || !loc2) return 0;
  
  // Simplified distance calculation
  const distance = Math.sqrt(
    Math.pow(loc1.latitude - loc2.latitude, 2) +
    Math.pow(loc1.longitude - loc2.longitude, 2)
  ) * 111; // Rough conversion to kilometers
  
  return Math.max(0, 1 - (distance / 100)); // Normalize to 0-1 scale
}