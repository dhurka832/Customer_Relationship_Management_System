import json
from django.conf import settings
from crm_app.models import Customer, Lead, FollowUp


def call_gemini_api(prompt, api_key):
    try:
        from google import genai
        client = genai.Client(api_key=api_key)
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
        )
        return response.text
    except Exception:
        import urllib.request
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
        headers = {"Content-Type": "application/json"}
        data = json.dumps({
            "contents": [{"parts": [{"text": prompt}]}]
        }).encode("utf-8")
        
        req = urllib.request.Request(url, data=data, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as response:
            res_data = json.loads(response.read().decode("utf-8"))
            return res_data["candidates"][0]["content"]["parts"][0]["text"]


def generate_personalized_email(user, customer_id=None, lead_id=None, goal="Follow-up", tone="Professional", extra_notes=""):
    customer = None
    lead = None
    
    if lead_id:
        try:
            lead = Lead.objects.select_related('customer', 'assigned_to').get(id=lead_id)
            customer = lead.customer
        except Lead.DoesNotExist:
            pass
            
    if not customer and customer_id:
        try:
            customer = Customer.objects.get(id=customer_id)
        except Customer.DoesNotExist:
            pass

    if not customer:
        return {
            "subject": "Follow-up regarding our services",
            "body": f"Hi,\n\nI wanted to follow up with you regarding our potential collaboration. Please let us know when you are available for a quick chat.\n\nBest regards,\n{user.get_full_name() or user.username}"
        }

    recent_followup = FollowUp.objects.filter(lead__customer=customer).order_by('-created_at').first()
    followup_notes = recent_followup.notes if recent_followup else "No prior notes recorded."

    api_key = getattr(settings, 'GEMINI_API_KEY', '') or getattr(settings, 'LLM_API_KEY', '')
    
    if api_key:
        prompt = f"""
            Write a personalized business email to a client/lead based on the following CRM details.

            Recipient Details:
            - Name: {customer.name}
            - Company: {customer.company}
            - Email: {customer.email}
            - Status: {customer.status}
            - Lead Status: {lead.status if lead else 'N/A'}
            - Pipeline Expected Value: ${lead.expected_value if lead else 'N/A'}
            - Recent Interaction Notes: {followup_notes}

            Email Objective/Goal: {goal}
            Desired Tone: {tone}
            Additional Instructions from Sales Rep: {extra_notes or 'None'}
            Sender Name: {user.first_name or user.username}

            OUTPUT FORMAT: Return strict valid JSON with two keys: "subject" and "body". Do NOT wrap in extra code block formatting if possible.
            {{"subject": "...", "body": "..."}}
        """

        try:
            raw = call_gemini_api(prompt, api_key)
            cleaned = raw.strip()
            if cleaned.startswith("```json"):
                cleaned = cleaned[7:]
            if cleaned.startswith("```"):
                cleaned = cleaned[3:]
            if cleaned.endswith("```"):
                cleaned = cleaned[:-3]
            parsed = json.loads(cleaned.strip())
            return {
                "subject": parsed.get("subject", f"Follow-up with {customer.company}"),
                "body": parsed.get("body", "")
            }
        except Exception:
            pass

    sender_name = user.get_full_name() or user.username
    subject = f"Following up: {goal} - {customer.company}"
    
    body = (
        f"Hi {customer.name},\n\n"
        f"I hope this message finds you well at {customer.company}.\n\n"
    )

    if "proposal" in goal.lower():
        body += f"I'm reaching out to check if you've had a chance to review our proposal for {customer.company}. We're excited about the opportunity to partner with you and help achieve your goals.\n\n"
    elif "meeting" in goal.lower() or "demo" in goal.lower():
        body += f"I would love to schedule a brief 15-minute call with you to discuss how our solutions can support {customer.company}'s current initiatives.\n\n"
    elif "re-engage" in goal.lower() or "check-in" in goal.lower():
        body += f"It's been a little while since our last conversation. I wanted to touch base and see how things are progressing at {customer.company}.\n\n"
    else:
        body += f"I am writing to follow up regarding our ongoing discussion with {customer.company}.\n\n"

    if extra_notes:
        body += f"Note: {extra_notes}\n\n"

    body += (
        f"Please let me know a day and time that works best for you, or feel free to reply directly to this email.\n\n"
        f"Best regards,\n\n"
        f"{sender_name}\n"
        f"CRM Sales Team"
    )

    return {
        "subject": subject,
        "body": body
    }
