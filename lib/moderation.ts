export async function analyzeTextSafety(text: string) {
    try {
      const response = await fetch("https://api-inference.huggingface.co/models/unitary/toxic-bert", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: text }),
      });
  
      if (!response.ok) {
        console.error("Moderation API error:", await response.text());
        return { toxic: false, score: 0 };
      }
  
      const data = await response.json();
  
      const toxicLabel = data.find((d: any) => d.label.toLowerCase() === "toxic");
  
      return {
        toxic: toxicLabel ? toxicLabel.score > 0.5 : false,
        score: toxicLabel ? toxicLabel.score : 0,
      };
    } catch (error) {
      console.error("Error in moderation:", error);
      return { toxic: false, score: 0 };
    }
  }
  