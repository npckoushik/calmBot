// export async function generateReply(prompt: string) {
//     try {
//       const model = "microsoft/DialoGPT-large";  // new model here
  
//       const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           inputs: prompt,
//           parameters: {
//             max_new_tokens: 100,
//             do_sample: true,
//             temperature: 0.7,
//             repetition_penalty: 1.1,
//             return_full_text: false,
//           },
//           options: { wait_for_model: true },
//         }),
//       });
  
//       if (!response.ok) {
//         console.error("Text generation API error:", await response.text());
//         return "Sorry, I couldn't generate a response.";
//       }
  
//       const data = await response.json();
  
//       if (Array.isArray(data) && data.length > 0 && data[0].generated_text) {
//         const fullText = data[0].generated_text;
//         // const reply = fullText;
//         const reply = fullText.startsWith(prompt) ? fullText.slice(prompt.length).trim() : fullText.trim();
//         return reply.length > 0 ? reply : "Hmm, I don't know what to say.";
//       }
  
//       return "Hmm, I don't know what to say.";
//     } catch (error) {
//       console.error("Error generating reply:", error);
//       return "Sorry, something went wrong while generating a reply.";
//     }
//   }
  