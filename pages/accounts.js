import React from "react";
import { useState, useEffect } from "react";

import { getStaticProps } from "./posts/[id]";

export default function Accounts() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://testnet.dragonglass.me/api/accounts/0.0.1245")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <div>
      <h1>{data.id}</h1>
      <p>{data.createdOn}</p>
    </div>
  );
}
