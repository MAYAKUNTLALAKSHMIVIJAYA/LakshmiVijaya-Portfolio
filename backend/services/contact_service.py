import json
import re
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime, timezone
from pathlib import Path

MESSAGES_FILE = Path(__file__).resolve().parent.parent / "messages.json"

EMAIL_REGEX = re.compile(r"^[\w\.-]+@([\w\.-]+\.)+[\w-]{2,4}$")

class ContactService:
    @staticmethod
    def validate_and_save(data: dict) -> tuple[bool, str]:
        name = str(data.get("name", "")).strip()
        email = str(data.get("email", "")).strip()
        subject = str(data.get("subject", "")).strip()
        message = str(data.get("message", "")).strip()

        if not name or len(name) < 2:
            return False, "Please provide a valid name (at least 2 characters)."

        if not email or not EMAIL_REGEX.match(email):
            return False, "Please provide a valid email address."

        if not message or len(message) < 5:
            return False, "Message is too short. Please provide at least 5 characters."

        entry = {
            "id": f"msg_{int(datetime.now(timezone.utc).timestamp())}",
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "name": name,
            "email": email,
            "subject": subject or "Portfolio Inbound Inquiry",
            "message": message
        }

        # Save to persistent file
        try:
            messages = []
            if MESSAGES_FILE.exists():
                try:
                    with open(MESSAGES_FILE, "r", encoding="utf-8") as f:
                        messages = json.load(f)
                except Exception:
                    messages = []
            
            messages.append(entry)

            with open(MESSAGES_FILE, "w", encoding="utf-8") as f:
                json.dump(messages, f, indent=2, ensure_ascii=False)
        except Exception as e:
            print(f"Error persisting contact message: {e}")
            return False, "Server error saving your message. Please reach out directly to 2300039013cse3@gmail.com."

        # Optional Email Dispatch
        ContactService._try_send_email(entry)

        return True, "Your message has been sent successfully! Vijaya will get back to you soon."

    @staticmethod
    def _try_send_email(entry: dict):
        smtp_host = os.getenv("SMTP_HOST")
        smtp_user = os.getenv("SMTP_USER")
        smtp_pass = os.getenv("SMTP_PASS")
        recipient = os.getenv("CONTACT_NOTIFICATION_EMAIL", "2300039013cse3@gmail.com")

        if not smtp_host or not smtp_user or not smtp_pass:
            # SMTP is optional; persistent JSON log is guaranteed
            return

        try:
            smtp_port = int(os.getenv("SMTP_PORT", 587))
            msg = MIMEMultipart()
            msg["From"] = smtp_user
            msg["To"] = recipient
            msg["Subject"] = f"New Portfolio Inquiry from {entry['name']}: {entry['subject']}"

            body = (
                f"You received a new inquiry from your portfolio website:\n\n"
                f"Name: {entry['name']}\n"
                f"Email: {entry['email']}\n"
                f"Subject: {entry['subject']}\n"
                f"Date: {entry['timestamp']}\n\n"
                f"Message:\n{entry['message']}\n"
            )
            msg.attach(MIMEText(body, "plain"))

            with smtplib.SMTP(smtp_host, smtp_port) as server:
                server.starttls()
                server.login(smtp_user, smtp_pass)
                server.send_message(msg)
        except Exception as e:
            print(f"Optional SMTP notification failed: {e}")
