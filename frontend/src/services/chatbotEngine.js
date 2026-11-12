import { PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES, EXPERIENCE, EDUCATION, ACHIEVEMENTS, CODING_PROFILES } from "../data/profileData";
const STRENGTHS = [];

export const getLocalChatbotResponse = (query) => {
  if (!query || !query.trim()) {
    return {
      reply: "Hi! I'm Vijaya's AI portfolio assistant. You can ask me about her AI projects, technical skills, academic background, internship, or how to contact her.",
      suggestedQuestions: getSuggestedQuestions()
    };
  }

  const q = query.toLowerCase().trim();

  // 1. Projects
  if (q.includes("kirana") || q.includes("shelf") || q.includes("product detection")) {
    const p = PROJECTS.find(x => x.id === "kiranasightai");
    return {
      reply: `**${p.title}**: ${p.description}\n\n• **Tech Stack**: ${p.technologies.join(", ")}\n• **Key Features**: Shelf image analysis, CV item localization, OCR text extraction, real-time inventory monitoring & business insights.\n• **GitHub**: ${p.github}\n• **Live Hugging Face Space**: ${p.demo}`,
      suggestedQuestions: getSuggestedQuestions()
    };
  }

  if (q.includes("deadline") || q.includes("guardian") || q.includes("productivity")) {
    const p = PROJECTS.find(x => x.id === "deadline-guardian-ai");
    return {
      reply: `**${p.title}**: ${p.description}\n\n• **Tech Stack**: ${p.technologies.join(", ")}\n• **Key Features**: Intelligent task prioritization, personalized recommendations, dynamic deadline tracking, automated scheduling support.\n• **GitHub**: ${p.github}\n• **Live Demo**: ${p.demo}`,
      suggestedQuestions: getSuggestedQuestions()
    };
  }

  if (q.includes("world cup") || q.includes("cricket") || q.includes("analyst")) {
    const p = PROJECTS.find(x => x.id === "worldcup-ai-analyst");
    return {
      reply: `**${p.title}**: ${p.description}\n\n• **Tech Stack**: ${p.technologies.join(", ")}\n• **Key Features**: In-depth player performance insights, match outcome predictive modeling, tournament trend visualizations.\n• **GitHub**: ${p.github}\n• **Live Demo**: ${p.demo}`,
      suggestedQuestions: getSuggestedQuestions()
    };
  }

  if (q.includes("farmer") || q.includes("produce") || q.includes("agricultural")) {
    const p = PROJECTS.find(x => x.id === "farmerfriendly-webapp");
    return {
      reply: `**${p.title}**: ${p.description}\n\n• **Tech Stack**: ${p.technologies.join(", ")}\n• **Key Features**: Dedicated workflows for farmers & consumers, Spring Boot REST APIs, MySQL relational database, responsive UI.\n• **GitHub**: ${p.github}`,
      suggestedQuestions: getSuggestedQuestions()
    };
  }

  if (q.includes("hostel") || q.includes("accommodation") || q.includes("room allocation")) {
    const p = PROJECTS.find(x => x.id === "hostel-management-system");
    return {
      reply: `**${p.title}**: ${p.description}\n\n• **Tech Stack**: ${p.technologies.join(", ")}\n• **Key Features**: Student records management, role-based authentication, room allocation tracking, full administrative CRUD operations.`,
      suggestedQuestions: getSuggestedQuestions()
    };
  }

  if (q.includes("project") || q.includes("creations") || q.includes("built") || q.includes("developed")) {
    const list = PROJECTS.map((p, i) => `${i + 1}. **${p.title}** (${p.technologies.join(", ")}) — ${p.description}`).join("\n\n");
    return {
      reply: `Here are the 5 core software and AI projects developed by Vijaya:\n\n${list}`,
      suggestedQuestions: getSuggestedQuestions()
    };
  }

  // 2. Skills
  if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("language") || q.includes("framework")) {
    const lines = SKILL_CATEGORIES.map(cat => `• **${cat.name}**: ${cat.skills.map(s => s.name).join(", ")}`).join("\n");
    return {
      reply: `**Technical Skills Overview:**\n\n${lines}`,
      suggestedQuestions: getSuggestedQuestions()
    };
  }

  // 3. Experience / Internship
  if (q.includes("experience") || q.includes("intern") || q.includes("codeon") || q.includes("work")) {
    const exp = EXPERIENCE[0];
    const points = exp.highlights.map(h => `• ${h}`).join("\n");
    return {
      reply: `**${exp.role} at ${exp.company}** (${exp.period}):\n\n${points}`,
      suggestedQuestions: getSuggestedQuestions()
    };
  }

  // 4. Achievements
  if (q.includes("achievement") || q.includes("award") || q.includes("leadership") || q.includes("hackathon") || q.includes("certificate") || q.includes("smart coder") || q.includes("event")) {
    const lines = ACHIEVEMENTS.map(a => `• **${a.title}** (${a.role}): ${a.description}`).join("\n");
    return {
      reply: `**Key Achievements & Leadership Roles:**\n\n${lines}`,
      suggestedQuestions: getSuggestedQuestions()
    };
  }

  // 5. Education / Academics
  if (q.includes("education") || q.includes("college") || q.includes("university") || q.includes("degree") || q.includes("cgpa") || q.includes("school") || q.includes("b.tech") || q.includes("diploma") || q.includes("academic") || q.includes("gpa")) {
    const lines = EDUCATION.map(e => `• **${e.degree}** — ${e.institution} (${e.period}) | **${e.score}**`).join("\n");
    return {
      reply: `**Academic Qualifications:**\n\n${lines}`,
      suggestedQuestions: getSuggestedQuestions()
    };
  }

  // 6. Coding Profiles
  if (q.includes("coding") || q.includes("leetcode") || q.includes("codechef") || q.includes("hackerrank") || q.includes("profile")) {
    const lines = CODING_PROFILES.map(cp => {
      const link = cp.url ? ` (${cp.url})` : "";
      return `• **${cp.platform}**${link}: ${cp.description}`;
    }).join("\n");
    return {
      reply: `**Competitive Coding & Practice Profiles:**\n\n${lines}`,
      suggestedQuestions: getSuggestedQuestions()
    };
  }

  // 7. Strengths
  if (q.includes("strength") || q.includes("hire") || q.includes("value") || q.includes("growth") || q.includes("learning")) {
    const lines = STRENGTHS.map(s => `• **${s.title}**: ${s.description}`).join("\n");
    return {
      reply: `**Core Strengths & Mindset:**\n\n${lines}\n\nVijaya is actively expanding her mastery of Data Structures, Algorithms, and production software architecture.`,
      suggestedQuestions: getSuggestedQuestions()
    };
  }

  // 8. Contact
  if (q.includes("contact") || q.includes("email") || q.includes("reach") || q.includes("message") || q.includes("hire")) {
    return {
      reply: `You can reach Mayakuntla Lakshmi Vijaya via:\n• **Email**: ${PERSONAL_INFO.email}\n• **LinkedIn**: ${PERSONAL_INFO.linkedin}\n• **GitHub**: ${PERSONAL_INFO.github}\n• **Location**: ${PERSONAL_INFO.location}\n\nYou can also use the contact form at the bottom of the page!`,
      suggestedQuestions: getSuggestedQuestions()
    };
  }

  // 9. Greetings
  if (q.includes("hi") || q.includes("hello") || q.includes("hey") || q.includes("who are you")) {
    return {
      reply: `Hello! I am Vijaya's AI portfolio assistant. I can answer questions regarding her technical skills in AI and Full-Stack development, her 5 showcased projects (including KiranaSightAI and Deadline Guardian AI), her internship at CodeOn Technologies, academics (9.46 CGPA in B.Tech), and contact details.`,
      suggestedQuestions: getSuggestedQuestions()
    };
  }

  // 10. General Bio
  if (q.includes("about") || q.includes("who is") || q.includes("bio") || q.includes("summary")) {
    return {
      reply: `**${PERSONAL_INFO.name}** is an ${PERSONAL_INFO.roles.join(" | ")} based in ${PERSONAL_INFO.location}.\n\n${PERSONAL_INFO.bio}\n\nShe holds a **9.46 CGPA** in B.Tech CSE at KL University and **95%** in Diploma Computer Engineering.`,
      suggestedQuestions: getSuggestedQuestions()
    };
  }

  // Fallback
  return {
    reply: "I only provide verified information based on Mayakuntla Lakshmi Vijaya's authentic academic, technical, and project profile. I don't have verified details about that specific inquiry, but feel free to ask about her AI projects (KiranaSightAI, Deadline Guardian AI), skills (Python, React, Machine Learning, Computer Vision), education (9.46 CGPA), or internship at CodeOn Technologies!",
    suggestedQuestions: getSuggestedQuestions()
  };
};

export const getSuggestedQuestions = () => [
  "Tell me about Vijaya.",
  "What AI projects has she developed?",
  "What are her technical skills?",
  "Tell me about her internship.",
  "What are her coding profiles?",
  "What are her academic achievements?",
  "How can I contact her?"
];
