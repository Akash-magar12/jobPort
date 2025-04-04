/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const EmailContext = createContext();

export const EmailProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [data, setData] = useState(null);
  const userId = localStorage.getItem("id");
  const userData = async () => {
    try {
      const user = await axios.get(`https://jobport-kvn5.onrender.com/api/user/${userId}`);
      setData(user.data.userData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    userData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <EmailContext.Provider value={{ email, setEmail, data, setData }}>
      {children}
    </EmailContext.Provider>
  );
};
