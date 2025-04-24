// Friendly responses when AI service is unavailable
export const AI_FALLBACK_RESPONSES = [
  "I'm here to listen and support you. How can I help today?",
  "It sounds like you're going through a challenge. Want to talk more?",
  "Remember to be kind to yourself. What's one thing you appreciate about yourself?",
  "Let's focus on what we can control right now. How can I help?",
  "Would you like to try a grounding exercise together?",
]

// Technical error messages for server/client issues
export const TECHNICAL_ERRORS = [
  // "503 Service Temporarily Unavailable - Load balancer timeout",
  "Upstream API request failed - internal service not responding",
  // "Environment configuration error - service restart in progress",
  // "CORS policy error - request blocked by browser security settings",
];

export function getRandomAIFallback(): string {
  return AI_FALLBACK_RESPONSES[Math.floor(Math.random() * AI_FALLBACK_RESPONSES.length)]
}

export function getRandomTechnicalError(): string {
  return TECHNICAL_ERRORS[Math.floor(Math.random() * TECHNICAL_ERRORS.length)]
}



// fallback-responses.ts
export const crisisResponses = {
  self_harm: `I'm deeply concerned. Please contact the National Suicide Prevention Lifeline at 988 immediately. You're not alone.`,
  urgent_help: `This sounds serious. I strongly recommend reaching out to a licensed professional. Would you like help finding resources?`,
};

// export function getRandomAIFallback() {
//   const fallbacks = [
//     "Upstream API request failed - internal service not responding"
//   ];
//   return fallbacks[0];
// }