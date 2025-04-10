export const getTokenFromCookie = () => {
  if (typeof document === "undefined") return null;

  const match = document.cookie.match(/token=([^;]+)/);

  return match ? match[1] : null;
};

export const getUserFromLocalStorage = () => {
  if (typeof window === "undefined") return null;

  try {
    const storedUser = localStorage.getItem("user");

    return storedUser ? JSON.parse(storedUser) : null;
  } catch (err) {
    console.error("Error parsing user from localStorage:", err);

    return null;
  }
};
