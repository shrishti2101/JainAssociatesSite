import React from "react";
import axios from "axios";
import { toast } from "sonner";
import { Send, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const SERVICE_OPTIONS = [
  "Mutual Fund SIP",
  "Lumpsum Investment",
  "Health Insurance",
  "Term/Life Insurance",
  "Motor Insurance",
  "Government & Corporate Bonds",
  "Loan Against Securities",
  "Retirement Planning",
  "General Enquiry",
];

export default function LeadForm({ source = "contact_form", compact = false }) {
  const [form, setForm] = React.useState({
    name: "", email: "", phone: "", service_interest: "General Enquiry", message: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      toast.error("Please fill name, email and phone.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${API}/leads`, { ...form, source });
      if (res.data?.success) {
        setSuccess(true);
        toast.success(res.data.message || "Thank you! We'll be in touch.");
        setForm({ name: "", email: "", phone: "", service_interest: "General Enquiry", message: "" });
      } else {
        toast.error("Could not send your enquiry. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error. Please try calling us directly.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white border border-border rounded-lg p-8 text-center" data-testid="lead-form-success">
        <CheckCircle2 className="h-12 w-12 mx-auto text-brand-blue" />
        <h3 className="mt-4 heading-display text-2xl text-brand-navy">Thank you.</h3>
        <p className="mt-2 text-muted-foreground">A Jain Associates advisor will reach out within 1 business day.</p>
        <button
          className="mt-6 text-sm text-brand-blue underline-offset-4 underline"
          onClick={() => setSuccess(false)}
          data-testid="lead-form-reset"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className={`bg-white border border-border rounded-lg ${compact ? "p-6" : "p-7 md:p-9"} space-y-5`}
      data-testid="lead-form"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="lf-name">Full Name</Label>
          <Input
            id="lf-name"
            data-testid="lead-form-name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Your full name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lf-phone">Phone</Label>
          <Input
            id="lf-phone"
            data-testid="lead-form-phone"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+91 9XXXXXXXXX"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="lf-email">Email</Label>
        <Input
          id="lf-email"
          type="email"
          data-testid="lead-form-email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="you@example.com"
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Service of Interest</Label>
        <Select value={form.service_interest} onValueChange={(v) => update("service_interest", v)}>
          <SelectTrigger data-testid="lead-form-service">
            <SelectValue placeholder="Choose a service" />
          </SelectTrigger>
          <SelectContent>
            {SERVICE_OPTIONS.map((s) => (
              <SelectItem key={s} value={s} data-testid={`lead-form-service-option-${s.replace(/\s+/g,'-').toLowerCase()}`}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="lf-msg">Message <span className="text-muted-foreground">(optional)</span></Label>
        <Textarea
          id="lf-msg"
          data-testid="lead-form-message"
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Tell us about your goals…"
          rows={4}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        data-testid="lead-form-submit"
        className="w-full inline-flex items-center justify-center gap-2 bg-brand-navy text-white px-6 py-3.5 rounded-sm font-semibold hover:bg-brand-blue transition-colors ring-focus disabled:opacity-60"
      >
        {loading ? "Sending…" : (<>Send Enquiry <Send className="h-4 w-4" /></>)}
      </button>
      <p className="text-xs text-muted-foreground">
        By submitting this form you consent to be contacted by a Jain Associates advisor regarding your enquiry.
      </p>
    </form>
  );
}
