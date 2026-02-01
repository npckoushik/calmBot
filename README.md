# 🌿 calmBot - Your Compassionate Mental Health Companion



## ✨ Features

💬 **AI-Powered Emotional Support** - Engage in compassionate conversations with our AI assistant
📊 **Mood Tracking** - Monitor your emotional state over time
🧘 **Mindfulness & Meditation** - Access guided exercises for relaxation
📚 **Mental Health Resources** - Discover articles, guides, and videos
📝 **Daily Check-In** - Track your mental well-being with journaling
🎧 **Breathing Exercises** - Learn and practice calming breathing techniques
💡 **Positive Affirmations** - Boost your mood with uplifting statements
📅 **Chat History** - Review your conversations for patterns and insights

---

## 🛠️ Tech Stack

**Core Technologies:**
- 📜 TypeScript
- 🚀 Next.js (App Router)
- 🎨 Tailwind CSS
- 🔧 shadcn/ui (Radix UI components)
- 🤖 AI Integration (Groq, OpenRouter)

**Database:**
- 🗄️ MongoDB

**Authentication:**
- 🔑 JWT Authentication

**Additional Tools:**
- 📦 pnpm
- 📦 Vercel (Deployment)
- 📦 MongoDB Atlas

---

## 📦 Installation

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- pnpm (v8 or higher)
- MongoDB (local or Atlas account)
- Environment variables (see Configuration section)

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/calmbot.git
   cd calmbot
Install dependencies:

pnpm install
Set up environment variables: Create a .env.local file in the root directory and add the following variables:

DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
HUGGINGFACE_API_KEY=your_huggingface_api_key
GROQ_API_KEY=your_groq_api_key
Run the development server:

pnpm dev
Open your browser: Visit http://localhost:3000 to see calmBot in action!

🎯 Usage
Basic Usage
Starting a Chat Session
// Example of how to use the chat interface
import { ChatInterface } from "@/components/chat-interface";

function HomePage() {
  return (
    <div className="container mx-auto p-4">
      <ChatInterface />
    </div>
  );
}
Accessing Mood Detection
// Example of detecting user mood
import { detectEmotion } from "@/lib/emotion-detection";

async function handleUserMessage(message: string) {
  const emotion = await detectEmotion(message);
  console.log(`Detected emotion: ${emotion}`);

  // Use emotion to tailor the response
  const tailoredResponse = await getResponseForEmotion(message, emotion);
  return tailoredResponse;
}
Using the Daily Check-In
// Example of submitting a daily check-in
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";

function DailyCheckIn() {
  const { user } = useAuth();
  const [mood, setMood] = useState(5);
  const [journalEntry, setJournalEntry] = useState("");

  const handleSubmit = async () => {
    if (!user) return;

    const response = await fetch("/api/daily-check-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        mood,
        journal: journalEntry,
        userId: user.userId
      })
    });

    const data = await response.json();
    console.log("Check-in submitted:", data);
  };

  return (
    // Your form UI here
  );
}
📁 Project Structure
calmbot/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts
│   │   │   ├── me/route.ts
│   │   │   └── register/route.ts
│   │   ├── chat-history/route.ts
│   │   ├── chat/route.ts
│   │   ├── emotion/route.ts
│   │   ├── resources/route.ts
│   │   └── fallback-responses.ts
│   ├── (auth)/
│   ├── (main)/
│   │   ├── breathing/page.tsx
│   │   ├── chat-history/page.tsx
│   │   ├── daily-check-in/page.tsx
│   │   ├── meditation/page.tsx
│   │   ├── mindfulness/page.tsx
│   │   ├── page.tsx
│   │   ├── positive-affirmations/page.tsx
│   │   ├── profile/page.tsx
│   │   ├── resources/page.tsx
│   │   ├── self-care/page.tsx
│   │   └── youtube-resources/page.tsx
│   ├── layout.tsx
│   ├── globals.css
│   └── providers.tsx
├── components/
│   ├── app-sidebar.tsx
│   ├── breathing-exercise.tsx
│   ├── chat-header.tsx
│   ├── chat-input.tsx
│   ├── chat-interface.tsx
│   ├── chat-messages.tsx
│   ├── login-modal.tsx
│   ├── meditation-player.tsx
│   ├── mood-selector.tsx
│   ├── register-modal.tsx
│   ├── resources-list.tsx
│   ├── ui/ (shadcn components)
│   └── youtube-embed.tsx
├── hooks/
│   └── use-auth.tsx
├── lib/
│   ├── auth.ts
│   ├── emotion-detection.ts
│   ├── generateReply.ts
│   ├── groq-chat.ts
│   ├── mongodb.ts
│   ├── moderation.ts
│   ├── openrouter-chat.ts
│   └── utils.ts
├── public/
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
🔧 Configuration
Environment Variables
Create a .env.local file in the root directory with the following variables:

# Database Configuration
DATABASE_URL=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_jwt_secret_key

# AI Services
HUGGINGFACE_API_KEY=your_huggingface_api_key
GROQ_API_KEY=your_groq_api_key

# Optional: For emotion detection
HUGGINGFACE_API_URL=https://api-inference.huggingface.co/models/your_emotion_model
HUGGINGFACE_MODEL=your_emotion_model_name
Customization Options
Tailwind CSS Theme: Edit tailwind.config.ts to customize colors, fonts, and other styles.

Component Library: Modify components.json to change the default component styles and behavior.

AI Model Configuration: Update the AI service integrations in lib/groq-chat.ts and lib/openrouter-chat.ts to use different models.

🤝 Contributing
We welcome contributions from the community! Here's how you can help:

Development Setup
Fork the repository
Clone your fork locally:
git clone https://github.com/yourusername/calmbot.git
cd calmbot
Install dependencies:
pnpm install
Create a new branch:
git checkout -b feature/your-feature-name
Code Style Guidelines
Use TypeScript for all code
Follow the existing code style and formatting
Write clear, concise commit messages
Add tests for new features
Pull Request Process
Write your code and ensure it passes all tests
Update the documentation if necessary
Submit a pull request with a clear description of your changes
Address any feedback from maintainers
📝 License
This project is licensed under the MIT License. See the LICENSE file for details.

👥 Authors & Contributors
Maintainers:

Your Name - Creator and Lead Developer
Contributors:

Contributor Name - Contributor Name
Another Contributor - Another Contributor
🐛 Issues & Support
Reporting Issues
If you encounter a bug or have a feature request, please:

Check the GitHub Issues page for existing issues
If your issue doesn't exist, create a new issue with:
A clear title
A detailed description
Steps to reproduce the issue
Any relevant screenshots or code snippets
Getting Help
For questions or support, please:

Open an issue on GitHub
Join our Discord Community
Email us at support@calmbot.com
🗺️ Roadmap
Planned Features
Enhanced AI Models:

Integration with more advanced mental health AI models
Personalization based on user history
Community Features:

User forums and discussion groups
Peer support groups
Advanced Analytics:

Mood trend visualization
Personalized insights and recommendations
Mobile App:

iOS and Android applications
Offline functionality
Professional Integration:

API for therapists and mental health professionals
HIPAA compliance for sensitive data
Known Issues
Issue #1: Emotion detection accuracy in certain scenarios
Issue #2: Chat history synchronization across devices
Future Improvements
Implement a more sophisticated mood tracking system
Add voice and video chat options
Integrate with wearables for biometric data collection
Expand resource library with more diverse content
🌟 Star and Share
If you find calmBot helpful, please consider:

⭐ Star this repository to show your support
📢 Share with friends and colleagues who might benefit
💬 Spread the word on social media
Together, we can help more people find calm and support in their mental health journey!

📢 Join Our Community
Stay updated with the latest developments and join our community:

GitHub Repository
Discord Server
Twitter
Email Newsletter
