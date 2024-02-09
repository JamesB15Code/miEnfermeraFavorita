import React from "react";
import { useEffect, useState } from "react";

const Home = () => {
  const [greeting, setGreeting] = useState("");
  useEffect(() => {
    const getCurrentTime = () => {
      const currentDate = new Date();
      const currentHour = currentDate.getHours();

      if (currentHour >= 6 && currentHour < 12) {
        setGreeting("Buenos días");
      } else if (currentHour >= 12 && currentHour < 18) {
        setGreeting("Buenas tardes");
      } else {
        setGreeting("Buenas noches");
      }
    };

    getCurrentTime();
  }, []);

  return (
    <div className="text-center">
      <div className="mt-4">
        <h2>{greeting}</h2>
        <h3>Bienvenido</h3>
      </div>
    </div>
  );
};

export default Home;
