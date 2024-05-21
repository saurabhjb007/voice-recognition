import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { FaCopy, FaMicrophoneAlt } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { IoSearch } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(transcript);
    toast.success("Text copied to clipboard!");
  };

  const handleSearch = () => {
    const query = encodeURIComponent(transcript);
    const url = `https://www.google.com/search?q=${query}`;
    window.open(url, "_blank");
    toast.info("Search initiated!");
  };

  const handleStartListening = () => {
    SpeechRecognition.startListening();
    toast.info("Listening started!");
  };

  const handleReset = () => {
    resetTranscript();
    toast.warning("Transcript reset!");
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  return (
    <>
      <ToastContainer position="top-right" theme="dark" autoClose={3000} />
      <nav className="bg-gray-800 text-white font-bold p-5 w-full">
        <div className="container mx-auto gap-3 flex items-center">
          <div className="text-3xl">Voice Recognition App </div>
          <FaMicrophoneAlt size={30} />
        </div>
      </nav>
      <div className="h-[700px] flex flex-col justify-center items-center mt-2 md:mt-10">
        <textarea
          value={transcript}
          className="border-2 border-slate-600 text-2xl my-10 p-4 h-[300px] w-3/4"
          onChange={handleOnChange}
          name="TextSearch"
          placeholder="Your Text Here"
          id="TextSearch"
        ></textarea>
        <div className="flex flex-col md:flex-row gap-10 xl:gap-20 my-5">
          <div className="flex gap-10 xl:gap-20">
            <button
              onClick={handleStartListening}
              className="h-28 w-28 xl:h-48 xl:w-48 flex justify-center items-center bg-green-600 rounded-full"
            >
              <FaMicrophoneAlt size={70} />
            </button>
            <button
              onClick={handleCopy}
              className="h-28 w-28 xl:h-48 xl:w-48 flex justify-center items-center bg-blue-600 rounded-full"
            >
              <FaCopy size={70} />
            </button>
          </div>
          <div className="flex gap-10 xl:gap-20">
            <button
              onClick={handleSearch}
              className="h-28 w-28 xl:h-48 xl:w-48 flex justify-center items-center bg-red-600 rounded-full"
            >
              <IoSearch size={80} />
            </button>
            <button
              onClick={handleReset}
              className="h-28 w-28 xl:h-48 xl:w-48 flex justify-center items-center bg-red-600 rounded-full"
            >
              <GrPowerReset size={70} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
