export async function detectEmotion(text: string) {
  try {
    const response = await fetch("https://api-inference.huggingface.co/models/bhadresh-savani/bert-base-uncased-emotion", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: text }),
    });

    if (!response.ok) {
      console.error("Emotion API error:", await response.text());
      return "neutral";
    }

    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {
      const sorted = data.sort((a, b) => b.score - a.score);
      return sorted[0].label.toLowerCase();
    }

    return "neutral";
  } catch (error) {
    console.error("Error detecting emotion:", error);
    return "neutral";
  }
}
