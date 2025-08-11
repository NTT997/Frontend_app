import { useState } from 'react';

export default function useAuth() {
  // For now, hardcode login state; later connect to API or Redux
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return {
    isLoggedIn,
    login: () => setIsLoggedIn(true),
    logout: () => setIsLoggedIn(false),
  };
}
