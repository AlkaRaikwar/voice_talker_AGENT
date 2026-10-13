# Voice Talker Agent — MVP

A minimal voice agent that:

1. Listens through the microphone.
2. Converts speech to text using the browser's Speech Recognition API.
3. Extracts product + color.
4. Generates a short response.
5. Speaks the response using browser Text-to-Speech.

## Example

Say:

> I want a yellow shirt

The agent responds:

> 6000 rupees, yellow color, should I book?

## Requirements

- Google Chrome recommended
- Microphone
- Internet connection may be required by Chrome's speech recognition
- No API key
- No Node.js
- No Python
- No database

## Run

Because microphone permissions work more reliably from a local web server, run one of these:

### Option 1 — Python

Open a terminal inside this folder:

```bash
python -m http.server 5500
```

Then open:

http://localhost:5500

### Option 2 — VS Code

Install the Live Server extension, right-click `index.html`, and choose:

Open with Live Server

## Change the product

Open `app.js` and edit:

```js
const catalog = [
  { type: "shirt", color: "yellow", price: 6000 },
  { type: "shirt", color: "black", price: 4500 }
];
```

## Important

This is intentionally a small MVP. It does NOT use an LLM yet.

The next version can replace `makeAgentResponse()` with a real AI agent and connect a real product database/API.
