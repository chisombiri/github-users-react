import { useState, useEffect } from "react";

//Pass parameter of url, pass as argument in receiving component
const useFetch = (url) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  //request for github user data
  const getUsers = async () => {
    setIsLoading(true);
    setError(false);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Something went Wrong...");
      }
      const data = await res.json();
      setUsers(data);
      setIsLoading(false);
    } catch (error) {
      setError(true);
      setIsLoading(false);
    }
  };

  //avoid infinite re-render
  useEffect(() => {
    getUsers();
  }, [url]);

  //things to pass to receiving component that will use custom hook
  return { users, isLoading, error };
};

export default useFetch;
