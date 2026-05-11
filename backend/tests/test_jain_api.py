"""Backend API tests for Jain Associates - health, leads CRUD, validation."""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
if not BASE_URL:
    # Fallback: read from frontend/.env
    with open('/app/frontend/.env') as f:
        for line in f:
            if line.startswith('REACT_APP_BACKEND_URL='):
                BASE_URL = line.split('=', 1)[1].strip().strip('"').rstrip('/')
                break


@pytest.fixture(scope="session")
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------------- Health ----------------
class TestHealth:
    def test_health_status(self, api):
        r = api.get(f"{BASE_URL}/api/health", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert data["status"] == "healthy"
        assert "email_configured" in data
        assert isinstance(data["email_configured"], bool)
        # Per design RESEND_API_KEY is empty
        assert data["email_configured"] is False

    def test_root(self, api):
        r = api.get(f"{BASE_URL}/api/", timeout=15)
        assert r.status_code == 200
        assert r.json().get("status") == "ok"


# ---------------- Leads ----------------
class TestLeads:
    def test_create_lead_success_email_disabled(self, api):
        payload = {
            "name": "TEST_Sambhav",
            "email": "TEST_sambhav@example.com",
            "phone": "9876543210",
            "service_interest": "SIP",
            "message": "Interested in starting a SIP",
            "source": "contact_form",
        }
        r = api.post(f"{BASE_URL}/api/leads", json=payload, timeout=20)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["success"] is True
        assert isinstance(data["lead_id"], str) and len(data["lead_id"]) > 0
        # When RESEND_API_KEY is empty, email_sent must be False (graceful no-op)
        assert data["email_sent"] is False
        assert "message" in data
        # Save id for next test via class attr
        TestLeads._created_id = data["lead_id"]
        TestLeads._created_email = payload["email"]

    def test_get_leads_returns_created_no_objectid(self, api):
        r = api.get(f"{BASE_URL}/api/leads", timeout=15)
        assert r.status_code == 200
        leads = r.json()
        assert isinstance(leads, list)
        # No mongo _id leakage
        for lead in leads:
            assert "_id" not in lead
            assert "id" in lead
            # datetime should serialize as ISO string
            assert "created_at" in lead
        # Find the one we created
        created_id = getattr(TestLeads, "_created_id", None)
        assert created_id is not None
        match = [l for l in leads if l["id"] == created_id]
        assert len(match) == 1
        m = match[0]
        assert m["email"] == TestLeads._created_email
        assert m["name"] == "TEST_Sambhav"
        assert m["service_interest"] == "SIP"
        assert m["email_sent"] is False

    def test_leads_sorted_desc(self, api):
        # Create two more, ensure sorted desc by created_at
        for i in range(2):
            api.post(f"{BASE_URL}/api/leads", json={
                "name": f"TEST_Sort{i}",
                "email": f"TEST_sort{i}@example.com",
                "phone": "9999999999",
            }, timeout=15)
        r = api.get(f"{BASE_URL}/api/leads", timeout=15)
        leads = r.json()
        # parse created_at ISO strings
        from datetime import datetime
        times = []
        for l in leads:
            try:
                times.append(datetime.fromisoformat(l["created_at"].replace("Z", "+00:00")))
            except Exception:
                pass
        assert times == sorted(times, reverse=True)

    def test_invalid_email_returns_422(self, api):
        r = api.post(f"{BASE_URL}/api/leads", json={
            "name": "TEST_Bad",
            "email": "not-an-email",
            "phone": "9876543210",
        }, timeout=15)
        assert r.status_code == 422

    def test_missing_required_fields_returns_422(self, api):
        r = api.post(f"{BASE_URL}/api/leads", json={"name": "TEST_X"}, timeout=15)
        assert r.status_code == 422

    def test_short_name_returns_422(self, api):
        r = api.post(f"{BASE_URL}/api/leads", json={
            "name": "A",
            "email": "ok@example.com",
            "phone": "9876543210",
        }, timeout=15)
        assert r.status_code == 422
