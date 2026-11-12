import { getLocalChatbotResponse } from "./chatbotEngine";

const API_BASE = import.meta.env.VITE_API_URL || "";

export const sendChatMessage = async (message) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(`${API_BASE}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      return {
        reply: data.reply,
        suggestedQuestions: data.suggested_questions || []
      };
    }
  } catch (err) {
    // Graceful fallback to verified client knowledge engine
    console.info("Using embedded verified knowledge engine (backend offline or standalone):", err.message);
  }

  return getLocalChatbotResponse(message);
};

export const sendContactMessage = async (formData) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(`${API_BASE}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      return await res.json();
    } else {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "Failed to submit message to server.");
    }
  } catch (err) {
    // If backend is not running, handle gracefully by saving to browser storage and providing direct mailto option
    if (err.message.includes("Failed to fetch") || err.name === "AbortError") {
      const localQueue = JSON.parse(localStorage.getItem("portfolio_messages") || "[]");
      localQueue.push({ ...formData, timestamp: new Date().toISOString() });
      localStorage.setItem("portfolio_messages", JSON.stringify(localQueue));

      return {
        success: true,
        message: "Message recorded locally. For an immediate response, feel free to also email directly at 2300039013cse3@gmail.com!"
      };
    }
    throw err;
  }
};
