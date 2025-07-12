import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Minimize2 } from "lucide-react";
import axios from "axios";
import {type KeyboardEvent } from "react";

const FloatingAIChat = ({
  open = false,
  setOpen,
}: {
  open: boolean;
  setOpen: () => void;
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your AI assistant from GS3. How can I help you today?",
      isAI: true,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      isAI: false,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    await axios
      .post(`${import.meta.env.VITE_SERVER_URL}/ai/chat`, {
        userQuery: inputValue,
      })
      .then((data) => {
        console.log(data.data);

        const aiMessage = {
          text: data.data.data.response,
          isAI: true,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, aiMessage]);
        setIsTyping(false);
      })
      .catch(() => {
        const aiMessage = {
          text: "Somthing went Wrong",
          isAI: true,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, aiMessage]);
        setIsTyping(false);
      });
  };

  const handleKeyPress = (e:KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              height: isMinimized ? "83px" : "500px",
            }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-6 right-6 w-[400px] text-xs font-orbitron bg-white/20 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 z-50 overflow-hidden"
          >
            {/* Header */}
            <div
              className={`w-full h-full flex flex-col ${
                !isMinimized && "overflow-y-auto"
              }  absolute`}
            >
              <div
                className={`p-4 border-b border-white/20 flex items-center justify-between 
                  relative top-0 left-0 right-0
                 `}
              >
                <div className="flex items-center space-x-3">
                  <motion.div
                    animate={{ y: [0, -7, 0] }} // Up → Down → Up
                    transition={{
                      duration: 2, // time to complete one loop
                      repeat: Infinity, // loop forever
                      ease: "easeInOut", // smooth motion
                    }}
                    className="h-full w-[70px] bg-gradient-to-r  rounded-full flex items-center justify-center overflow-hidden"
                  >
                    <img src="/aiFace.png" alt="" />
                  </motion.div>
                  <div>
                    <h3 className="text-white font-semibold text-sm">
                      AI Assistant
                    </h3>
                    <p className="text-white/60 text-xs">Online</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <Minimize2 className="w-4 h-4 text-white/60" />
                  </button>
                  <button
                    onClick={setOpen}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 text-white/60" />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              {!isMinimized && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex-1 h-80 overflow-y-auto p-4 space-y-4"
                >
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${
                        message.isAI ? "justify-start" : "justify-end"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2 text-xs ${
                          message.isAI
                            ? "bg-black text-gray-300 rounded-tl-sm"
                            : "bg-gray-200 text-gray-800 rounded-tr-sm"
                        }`}
                      >
                        <p className="text-xs">{message.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.isAI ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {message.timestamp}
                        </p>
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-black text-white rounded-2xl rounded-tl-sm px-4 py-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          />
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </motion.div>
              )}

              {/* Input Area */}
              {!isMinimized && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-4 border-t border-white/20"
                >
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1 bg-white/10 backdrop-blur-sm border rounded-lg border-white/20  px-4 py-2 text-white placeholder-white text-sm focus:outline-none "
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-shadow"
                    >
                      <Send className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingAIChat;
