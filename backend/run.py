import os
import sys
from pathlib import Path

# Ensure root backend dir is in sys.path
sys.path.insert(0, str(Path(__file__).resolve().parent))

from app import app

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    print(f"[*] Starting Ask Vijaya AI Backend API on port {port}...")
    print(f"[*] Health Check: http://localhost:{port}/api/health")
    print(f"[*] Chatbot Endpoint: http://localhost:{port}/api/chat")
    print(f"[*] Contact Endpoint: http://localhost:{port}/api/contact")
    app.run(host="0.0.0.0", port=port, debug=False)
