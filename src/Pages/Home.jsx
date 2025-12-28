import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import "./Home.css";

function Home() {
  const [loggedInUser, setLogeedInUser] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setLogeedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Logged Out");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const quotes = [
    {
      text: "The only limit to our realization of tomorrow is our doubts of today.",
      author: "Franklin D. Roosevelt",
    },
    {
      text: "In the middle of every difficulty lies opportunity.",
      author: "Albert Einstein",
    },
    {
      text: "Do not wait to strike till the iron is hot; but make it hot by striking.",
      author: "William Butler Yeats",
    },
    {
      text: "The best way to predict the future is to create it.",
      author: "Peter Drucker",
    },
    {
      text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
      author: "Winston Churchill",
    },
    {
      text: "Happiness is not something ready made. It comes from your own actions.",
      author: "Dalai Lama",
    },
    {
      text: "Dream, dream, dream. Dreams transform into thoughts and thoughts result in action.",
      author: "APJ Abdul Kalam",
    },
    {
      text: "I don't believe in taking right decisions. I take decisions and then make them right.",
      author: "Ratan Tata",
    },
  ];

  return (
    <div>
      <h2> Welcome, {loggedInUser}!</h2><br></br>
      <p className="subtitle">
        Glad to see you here. Explore some wisdom from the greatest minds in
        history.
      </p>

      <div className="home-wrapper">
        <header className="home-header text-center">
          <h1>🌟 Inspiring Quotes</h1>
          <p className="subtitle">
            Wisdom from some of the greatest minds in history
          </p>
        </header>

        <div className="quotes-grid">
          {quotes.map((quote, index) => (
            <div key={index} className="quote-card">
              <p className="quote-text">"{quote.text}"</p>
              <p className="quote-author">— {quote.author}</p>
            </div>
          ))}
        </div>
      </div> <br></br>
      <button className="btn btn-danger " type="submit" onClick={handleLogout}>
        Logout
      </button>
      <ToastContainer />
    </div>
  );
}

export default Home;
