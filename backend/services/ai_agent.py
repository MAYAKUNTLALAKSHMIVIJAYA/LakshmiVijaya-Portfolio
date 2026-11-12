import json
import os
import re
from pathlib import Path

KNOWLEDGE_PATH = Path(__file__).resolve().parent.parent / "knowledge_base" / "profile_knowledge.json"

class PortfolioAIAssistant:
    def __init__(self):
        self.knowledge = self._load_knowledge()

    def _load_knowledge(self):
        try:
            with open(KNOWLEDGE_PATH, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            print(f"Error loading knowledge base: {e}")
            return {}

    def respond(self, query: str) -> dict:
        if not query or not query.strip():
            return {
                "reply": "Hi! I'm Vijaya's AI portfolio assistant. You can ask me about her AI projects, technical skills, academic background, internship, or how to contact her.",
                "confidence": 1.0,
                "suggested_questions": self.get_suggested_questions()
            }

        q = query.lower().strip()

        # Try optional external LLM if configured
        llm_reply = self._try_llm_response(query)
        if llm_reply:
            return {
                "reply": llm_reply,
                "confidence": 0.95,
                "suggested_questions": self.get_suggested_questions()
            }

        # Deterministic Grounded Engine
        return self._rule_based_response(q)

    def _try_llm_response(self, user_prompt: str) -> str | None:
        gemini_api_key = os.getenv("GEMINI_API_KEY")
        if not gemini_api_key:
            return None

        try:
            import requests
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={gemini_api_key}"
            
            system_instruction = (
                "You are 'Ask Vijaya AI', the official AI portfolio assistant for Mayakuntla Lakshmi Vijaya. "
                "Your role is to answer questions from recruiters and engineering leaders strictly using her verified background. "
                "RULES: "
                "1. Only state facts from the provided profile data. "
                "2. If asked about something not in her profile, politely respond that you do not have verified information on that. "
                "3. Never fabricate skills, percentages, companies, or credentials. "
                "4. Be professional, concise, articulate, and welcoming. "
                f"VERIFIED PROFILE DATA: {json.dumps(self.knowledge)}"
            )

            payload = {
                "contents": [
                    {
                        "role": "user",
                        "parts": [
                            {"text": f"{system_instruction}\n\nUser Question: {user_prompt}"}
                        ]
                    }
                ],
                "generationConfig": {
                    "temperature": 0.2,
                    "maxOutputTokens": 350
                }
            }

            resp = requests.post(url, json=payload, timeout=5)
            if resp.status_code == 200:
                data = resp.json()
                text = data["candidates"][0]["content"]["parts"][0]["text"]
                return text.strip()
        except Exception as e:
            print(f"LLM call fallback: {e}")

        return None

    def _rule_based_response(self, q: str) -> dict:
        k = self.knowledge
        reply = ""
        suggested = self.get_suggested_questions()

        # Specific Projects First
        if re.search(r"(kirana|shelf|product detection)", q):
            p = next((x for x in k.get("projects", []) if x["id"] == "kiranasightai"), None)
            reply = (
                f"**{p['title']}**: {p['description']}\n\n"
                f"• **Tech Stack**: {', '.join(p['technologies'])}\n"
                f"• **Key Features**: Shelf image analysis, CV item localization, OCR text extraction, real-time inventory monitoring & business insights.\n"
                f"• **GitHub**: {p['github']}\n"
                f"• **Live Hugging Face Space**: {p['demo']}"
            )

        # Deadline Guardian AI
        elif re.search(r"(deadline|guardian)", q):
            p = next((x for x in k.get("projects", []) if x["id"] == "deadline-guardian-ai"), None)
            reply = (
                f"**{p['title']}**: {p['description']}\n\n"
                f"• **Tech Stack**: {', '.join(p['technologies'])}\n"
                f"• **Key Features**: Intelligent task prioritization, personalized recommendations, dynamic deadline tracking, automated scheduling support.\n"
                f"• **GitHub**: {p['github']}\n"
                f"• **Live Demo**: {p['demo']}"
            )

        # World Cup AI Analyst
        elif re.search(r"(world\s*cup|cricket)", q):
            p = next((x for x in k.get("projects", []) if x["id"] == "worldcup-ai-analyst"), None)
            reply = (
                f"**{p['title']}**: {p['description']}\n\n"
                f"• **Tech Stack**: {', '.join(p['technologies'])}\n"
                f"• **Key Features**: In-depth player performance insights, match outcome predictive modeling, tournament trend visualizations.\n"
                f"• **GitHub**: {p['github']}\n"
                f"• **Live Demo**: {p['demo']}"
            )

        # FarmerFriendly
        elif re.search(r"(farmer|produce|agricultural)", q):
            p = next((x for x in k.get("projects", []) if x["id"] == "farmerfriendly-webapp"), None)
            reply = (
                f"**{p['title']}**: {p['description']}\n\n"
                f"• **Tech Stack**: {', '.join(p['technologies'])}\n"
                f"• **Key Features**: Dedicated workflows for farmers & consumers, Spring Boot REST APIs, MySQL relational database, responsive UI.\n"
                f"• **GitHub**: {p['github']}"
            )

        # Hostel Management
        elif re.search(r"(hostel|room allocation|accommodation)", q):
            p = next((x for x in k.get("projects", []) if x["id"] == "hostel-management-system"), None)
            reply = (
                f"**{p['title']}**: {p['description']}\n\n"
                f"• **Tech Stack**: {', '.join(p['technologies'])}\n"
                f"• **Key Features**: Student records management, role-based authentication, room allocation tracking, full administrative CRUD operations."
            )

        # All Projects
        elif re.search(r"\b(all projects|what projects|list projects|developed projects|creations)\b", q) or (re.search(r"\b(project|projects)\b", q) and not re.search(r"\b(who|about|tell me about vijaya)\b", q)):
            projs = [f"1. **{p['title']}** ({', '.join(p['technologies'])}) - {p['description']}" for p in k.get("projects", [])]
            reply = "Here are the 5 core software and AI projects developed by Vijaya:\n\n" + "\n\n".join(projs)

        # Skills / Tech stack
        elif re.search(r"\b(skill|skills|technologies|tech stack|programming|languages|frameworks|tools|stack)\b", q):
            s = k.get("skills", {})
            reply = (
                "**Technical Skills Overview:**\n"
                f"• **Programming**: {', '.join(s.get('programming', []))}\n"
                f"• **Web Development**: {', '.join(s.get('web_development', []))}\n"
                f"• **AI & Machine Learning**: {', '.join(s.get('ai_and_ml', []))}\n"
                f"• **Databases**: {', '.join(s.get('databases', []))}\n"
                f"• **Tools**: {', '.join(s.get('tools', []))}\n"
                f"• **Core CS**: {', '.join(s.get('core_cs', []))}"
            )

        # Experience / Internship
        elif re.search(r"\b(experience|intern|internship|work|job|codeon)\b", q):
            exp = k.get("experience", [{}])[0]
            resp_list = "\n".join([f"• {r}" for r in exp.get("responsibilities", [])])
            reply = (
                f"**{exp.get('role')} at {exp.get('company')}** ({exp.get('period')}):\n\n"
                f"{resp_list}"
            )

        # Achievements / Leadership / Events
        elif re.search(r"\b(achievement|achievements|leadership|event|events|hackathon|contest|competition|award|certificate|smart coder)\b", q):
            ach_lines = "\n".join([f"• {a}" for a in k.get("achievements", [])])
            reply = "**Key Achievements & Leadership Roles:**\n\n" + ach_lines

        # Education / College / Degree / School / CGPA
        elif re.search(r"\b(education|college|university|b\.tech|diploma|school|cgpa|percentage|study|studies|degree|academic|gpa)\b", q):
            edu_lines = []
            for e in k.get("education", []):
                edu_lines.append(f"• **{e['degree']}** — {e['institution']} ({e['period']}) | **{e['score']}**")
            reply = "**Academic Qualifications:**\n\n" + "\n\n".join(edu_lines)

        # Coding Profiles / LeetCode / CodeChef / HackerRank
        elif re.search(r"\b(coding|leetcode|codechef|hackerrank|competitive programming|profiles|rank)\b", q):
            profiles = []
            for cp in k.get("coding_profiles", []):
                link = f" ({cp['url']})" if cp.get("url") else ""
                profiles.append(f"• **{cp['platform']}**{link}: {cp.get('description', '')}")
            reply = "**Competitive Coding & Practice Profiles:**\n\n" + "\n".join(profiles)

        # Strengths / Growth
        elif re.search(r"\b(strength|strengths|why hire|growth|learning|soft skills|value)\b", q):
            s_lines = "\n".join([f"• {s}" for s in k.get("strengths", [])])
            reply = (
                "**Core Strengths & Professional Mindset:**\n\n"
                f"{s_lines}\n\n"
                "Vijaya embodies a dedicated growth mindset, continuously refining her skills in Data Structures, Algorithms, and production software engineering."
            )

        # Contact / Reach out / Email
        elif re.search(r"\b(contact|email|phone|reach|hire|touch|call|message)\b", q):
            reply = (
                f"You can reach Mayakuntla Lakshmi Vijaya via:\n"
                f"• Email: {k.get('email')}\n"
                f"• LinkedIn: {k.get('linkedin')}\n"
                f"• GitHub: {k.get('github')}\n"
                f"• Location: {k.get('location')}\n\n"
                "You can also use the interactive contact form right below on this website!"
            )

        # Greetings
        elif re.search(r"\b(hi|hello|hey|greetings|who are you|what can you do)\b", q):
            reply = (
                "Hello! I am Vijaya's AI portfolio assistant. "
                "I can answer questions regarding her technical skills in AI and Full-Stack development, "
                "her 5 showcased projects (including KiranaSightAI and Deadline Guardian AI), "
                "her internship at CodeOn Technologies, academics (9.46 CGPA in B.Tech), and contact details."
            )

        # General Bio / About
        elif re.search(r"\b(about|who is|bio|summary|tell me about|background)\b", q):
            reply = (
                f"**{k.get('name')}** is a {k.get('title')} based in {k.get('location')}.\n\n"
                f"{k.get('summary')}\n\n"
                "Her academic track record includes a **9.46 CGPA** in B.Tech CSE and **95%** in Diploma Computer Engineering."
            )

        # Fallback for out-of-scope or unverified questions
        else:
            reply = (
                "I only provide verified information based on Mayakuntla Lakshmi Vijaya's authentic academic, technical, and project profile. "
                "I don't have verified details about that specific inquiry, but feel free to ask about her AI projects (KiranaSightAI, Deadline Guardian AI), "
                "skills (Python, React, Machine Learning, Computer Vision), education (9.46 CGPA), or internship at CodeOn Technologies!"
            )

        return {
            "reply": reply,
            "confidence": 0.9,
            "suggested_questions": suggested
        }

        return {
            "reply": reply,
            "confidence": 0.9,
            "suggested_questions": suggested
        }

    def get_suggested_questions(self) -> list:
        return [
            "Tell me about Vijaya.",
            "What AI projects has she developed?",
            "What are her technical skills?",
            "Tell me about her internship.",
            "What are her coding profiles?",
            "What are her academic achievements?",
            "How can I contact her?"
        ]
