import React, { useContext } from "react";
import ai from "../assets/AI.png";
import { useNavigate } from "react-router-dom";
import { ShopDataContext } from "../Context/ShopContext";
import { toast } from "react-toastify";

export const Ai = () => {
  let { showSearch, setShowSearch } = useContext(ShopDataContext);
  let navigate = useNavigate();

  // 🔊 Speak function
  function speak(message) {
    let utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
  }

  // 🎤 Setup speech recognition
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  if (!recognition) {
    console.log("Speech Recognition not supported in this browser");
  }
  recognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript.trim().toLowerCase();
    // 🔍 Open search
    if (
      transcript.toLowerCase().includes("search") &&
      transcript.toLowerCase().includes("open") &&
      !showSearch
    ) {
      speak("opening search");
      setShowSearch(true);
      navigate("/collection");
    }

    // 🔍 Close search
    else if (
      transcript.toLowerCase().includes("search") &&
      transcript.toLowerCase().includes("close") &&
      showSearch
    ) {
      speak("closing search");
      setShowSearch(false);
    }

    // 📦 Collection / Product page
    else if (
      transcript.toLowerCase().includes("collection") ||
      transcript.toLowerCase().includes("collections") ||
      transcript.toLowerCase().includes("product") ||
      transcript.toLowerCase().includes("products")
    ) {
      speak("opening collection page");
      navigate("/collection");
    }

    // ℹ️ About page
    else if (
      transcript.toLowerCase().includes("about") ||
      transcript.toLowerCase().includes("about page")
    ) {
      speak("opening about page");
      navigate("/about");
      setShowSearch(false);
    } else if (
      transcript.toLowerCase().includes("home") ||
      transcript.toLowerCase().includes("home page")
    ) {
      speak("opening home page");
      navigate("/");
      setShowSearch(false);
    } else if (
      transcript.toLowerCase().includes("cart") ||
      transcript.toLowerCase().includes("caat")
    ) {
      speak("opening cart page");
      navigate("/cart");
      setShowSearch(false);
    }

    // 🔎 Default: Perform search
    else {
      speak(`searching for ${transcript}`);
      navigate(`/search?query=${transcript}`);
      toast.error("try again");
    }
  };

  // ▶️ Start listening
  const startListening = () => {
    recognition.start();
  };

  return (
    <div
      className="fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%]"
      onClick={startListening}
    >
      <img src={ai} alt="ai" className="w-[100px] cursor-pointer" />
    </div>
  );
};
