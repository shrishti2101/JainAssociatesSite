from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import resend

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend setup
RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
LEAD_NOTIFICATION_EMAIL = os.environ.get('LEAD_NOTIFICATION_EMAIL', 'Jainasambhav@gmail.com')
if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# App
app = FastAPI(title="Jain Associates API")
api_router = APIRouter(prefix="/api")


# ---------------- Models ----------------
class LeadCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=6, max_length=20)
    service_interest: Optional[str] = Field(default="General Enquiry")
    message: Optional[str] = Field(default="")
    source: Optional[str] = Field(default="contact_form")


class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    service_interest: str = "General Enquiry"
    message: str = ""
    source: str = "contact_form"
    email_sent: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class LeadResponse(BaseModel):
    success: bool
    message: str
    lead_id: str
    email_sent: bool


# ---------------- Helpers ----------------
def build_lead_email_html(lead: Lead) -> str:
    return f"""
    <table width="100%" cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif; background:#f8f9fa; padding:24px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden; border:1px solid #e5e7eb;">
            <tr>
              <td style="background:#0A2540; padding:24px; color:#ffffff;">
                <h2 style="margin:0; font-size:22px;">New Lead — Jain Associates</h2>
                <p style="margin:6px 0 0; font-size:13px; opacity:.85;">Source: {lead.source}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px; color:#111827;">
                <p style="margin:0 0 12px;"><strong>Name:</strong> {lead.name}</p>
                <p style="margin:0 0 12px;"><strong>Email:</strong> {lead.email}</p>
                <p style="margin:0 0 12px;"><strong>Phone:</strong> {lead.phone}</p>
                <p style="margin:0 0 12px;"><strong>Service Interest:</strong> {lead.service_interest}</p>
                <p style="margin:0 0 8px;"><strong>Message:</strong></p>
                <div style="padding:12px; background:#f3f4f6; border-radius:6px; white-space:pre-wrap;">{lead.message or '—'}</div>
                <p style="margin:18px 0 0; font-size:12px; color:#6B7280;">Received: {lead.created_at.isoformat()}</p>
              </td>
            </tr>
            <tr>
              <td style="background:#F8F9FA; padding:14px; text-align:center; font-size:12px; color:#6B7280;">
                Jain Associates · Building Generational Wealth with Integrity & Expertise
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    """


async def send_lead_email(lead: Lead) -> bool:
    if not RESEND_API_KEY:
        logger.warning("RESEND_API_KEY not configured — skipping email notification")
        return False
    try:
        params = {
            "from": SENDER_EMAIL,
            "to": [LEAD_NOTIFICATION_EMAIL],
            "subject": f"New Lead: {lead.name} — {lead.service_interest}",
            "html": build_lead_email_html(lead),
            "reply_to": lead.email,
        }
        result = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Lead email sent: {result.get('id') if isinstance(result, dict) else result}")
        return True
    except Exception as e:
        logger.error(f"Failed to send lead email: {e}")
        return False


# ---------------- Routes ----------------
@api_router.get("/")
async def root():
    return {"message": "Jain Associates API", "status": "ok"}


@api_router.get("/health")
async def health():
    return {"status": "healthy", "email_configured": bool(RESEND_API_KEY)}


@api_router.post("/leads", response_model=LeadResponse)
async def create_lead(input: LeadCreate):
    lead = Lead(**input.model_dump())
    email_ok = await send_lead_email(lead)
    lead.email_sent = email_ok

    doc = lead.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    try:
        await db.leads.insert_one(doc)
    except Exception as e:
        logger.error(f"DB insert failed: {e}")
        raise HTTPException(status_code=500, detail="Could not save lead")

    return LeadResponse(
        success=True,
        message="Thanks! We'll reach out within 1 business day.",
        lead_id=lead.id,
        email_sent=email_ok,
    )


@api_router.get("/leads", response_model=List[Lead])
async def list_leads(limit: int = 100):
    docs = await db.leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    for d in docs:
        if isinstance(d.get('created_at'), str):
            try:
                d['created_at'] = datetime.fromisoformat(d['created_at'])
            except Exception:
                d['created_at'] = datetime.now(timezone.utc)
    return docs


# Register router & middleware
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
