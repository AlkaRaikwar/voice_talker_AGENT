const talkBtn = document.getElementById("talkBtn");
const buttonText = document.getElementById("buttonText");
const statusEl = document.getElementById("status");
const transcriptEl = document.getElementById("transcript");
const responseEl = document.getElementById("response");

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  statusEl.textContent = "Speech recognition is not supported. Use Google Chrome.";
  talkBtn.disabled = true;
  talkBtn.style.opacity = ".5";
}

const recognition = SpeechRecognition ? new SpeechRecognition() : null;

if (recognition) {
  recognition.lang = "en-IN";
  recognition.interimResults = false;
  recognition.continuous = false;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    talkBtn.classList.add("listening");
    buttonText.textContent = "Listening...";
    statusEl.textContent = "Speak now...";
  };

  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;
    transcriptEl.textContent = text;
    transcriptEl.classList.remove("muted");

    const reply = makeAgentResponse(text);
    responseEl.textContent = reply;
    responseEl.classList.remove("muted");

    speak(reply);
  };

  recognition.onerror = (event) => {
    statusEl.textContent =
      event.error === "not-allowed"
        ? "Microphone permission was denied."
        : "Could not understand the request. Try again.";
  };

  recognition.onend = () => {
    talkBtn.classList.remove("listening");
    buttonText.textContent = "Start Talking";
    if (statusEl.textContent === "Speak now...") statusEl.textContent = "Ready";
  };
}

talkBtn.addEventListener("click", () => {
  if (!recognition) return;
  window.speechSynthesis.cancel();
  recognition.start();
});

function makeAgentResponse(text) {
  const lower = text.toLowerCase();

  // Demo product catalog. Change these values in one place.
  const catalog = [
    { type: "shirt", color: "yellow", price: 6000 },
    { type: "shirt", color: "black", price: 4500 },
    { type: "shirt", color: "white", price: 3500 },
    { type: "shirt", color: "blue", price: 5000 }
  ];

  const colors = ["yellow", "black", "white", "blue", "red", "green", "pink"];
  const types = ["shirt", "t-shirt", "tshirt", "dress", "jeans", "shoes"];

  const color = colors.find(c => lower.includes(c));
  let type = types.find(t => lower.includes(t));

  if (type === "t-shirt" || type === "tshirt") type = "shirt";

  // Specific demo request: "yellow shirt"
  if (color && type) {
    const product = catalog.find(p => p.color === color && p.type === type);

    if (product) {
      return `6000 rupees, ${product.color} color, should I book?`;
    }

    return `I found a ${color} ${type}, but its price is not available. Should I continue?`;
  }

  if (color) {
    return `I found a ${color} product. Please tell me the product type.`;
  }

  if (type) {
    return `I found a ${type}. Please tell me the color.`;
  }

  return "Please tell me the product and color you want.";
}

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-IN";
  utterance.rate = 1.0;
  utterance.pitch = 1.0;

  utterance.onstart = () => {
    statusEl.textContent = "Agent is speaking...";
  };

  utterance.onend = () => {
    statusEl.textContent = "Ready";
  };

  window.speechSynthesis.speak(utterance);
}
