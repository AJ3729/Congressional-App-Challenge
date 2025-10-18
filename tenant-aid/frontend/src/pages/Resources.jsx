import React, { useState, useEffect } from "react";
import "../css/Resources.css";

function Resources() {
  const [items, setItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const res = await fetch("GET-FROM-API-SOMEHOW" + new Date().getTime()); // Modify this to your correct path
        if (!res.ok) {
          throw new Error(`Failed to fetch, status: ${res.status}`);
        }
        const data = await res.json();
        console.log("Fetched data:", data); // Debugging: log the fetched data
        setItems(data);  // Store fetched data
      } catch (error) {
        console.error("Failed to fetch items:", error);
        setError(error.message);  // Store error message
      }
      setLoading(false);
    };

    fetchItems();
  }, []);

  if (loading) return <p>Loading items...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="resources">
      <h2>Tenant Rights & Resources</h2>
      <ul>
        {Object.keys(items).map((question, index) => (
          <li key={index} className="resource-item">
            <h3>{question}</h3>
            <p>{items[question]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Resources;