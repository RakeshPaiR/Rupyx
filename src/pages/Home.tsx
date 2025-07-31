import React, { useEffect, useState } from "react";
// import "./Home.scss";

type Props = {
  initialData: { message: string };
};

const Home: React.FC<Props> = ({ initialData }) => {
  const [message, setMessage] = useState(initialData.message);

  useEffect(() => {
    // Simulate client-side update after hydration
    setMessage("Hello from Client");
  }, []);

  return <h1 className="text-3xl font-bold heading underline">{message}</h1>;
};

export default Home;
