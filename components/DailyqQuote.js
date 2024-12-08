import React, { useState, useEffect } from "react";
import axios from "axios";

export default function DailyQuote() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    // Use API to fetch the quote
    axios
      .get("https://v2.jokeapi.dev/joke/Any")
      .then((response) => {
        console.log(response.data); // print the API return data

        // Handle both single and two-part jokes
        if (response.data.type === "single") {
          setQuote(response.data.joke); // Set the single joke
        } else if (response.data.type === "twopart") {
          setQuote(response.data.setup); // Set the setup for two-part jokes
          setAuthor(response.data.delivery); // Set the delivery as the 'author'
        }
      })
      .catch((error) => {
        console.error("Error fetching the quote: ", error);
      });
  }, []);

  return (
    <div className="daily-quote, text-center">
      <p className="quote text-center">"{quote}"</p>
      {author && <p className="author text-center">- {author}</p>}{" "}
      {/* Show the author if it's available */}
    </div>
  );
}
