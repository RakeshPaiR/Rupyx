import React, { useEffect, useState } from "react";

type Props = {
  initialData: { message: string };
};

const Home: React.FC<Props> = ({ initialData }) => {
  const [message, setMessage] = useState(initialData.message);

  useEffect(() => {
    // Simulate client-side update after hydration
    setTimeout(() => {
      setMessage("Hello from Client");
    }, 5000);
  }, []);

  return <h1>{message}</h1>;
};

export default Home;
