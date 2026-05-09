"use client";

import { FormEvent, useMemo, useState } from "react";

const VALID_ZIPS = ["10451", "10452", "10453", "10454", "10455"];

type Lang = "en" | "es";

type Copy = {
  eyebrow: string;
  title: string;
  lede: string;
  primary: string;
  secondary: string;
  noPayment: string;
  privacy: string;
  formTitle: string;
  firstName: string;
  phone: string;
  zip: string;
  medicaid: string;
  foodNeed: string;
  callback: string;
  language: string;
  consent: string;
  submit: string;
  footer: string;
  success: string;
  error: string;
};

const COPY: Record<Lang, Copy> = {
  en: {
    eyebrow: "Bronx food-support routing",
    title: "Bronx Food Help May Be Available",
    lede: "Check available food support options in 60 seconds. No payment required to check.",
    primary: "Check Food Help Options",
    secondary: "Request a Callback",
    noPayment: "No payment required to check. Screening does not guarantee eligibility, enrollment, delivery, meal quantity, duration, Medicaid approval, SNAP approval, or any specific service.",
    privacy: "We do not ask for SSNs, Medicaid IDs, case numbers, immigration status, diagnoses, or private documents.",
    formTitle: "Food Help Check",
    firstName: "First name",
    phone: "Phone number",
    zip: "Bronx ZIP code",
    medicaid: "Medicaid / health plan status",
    foodNeed: "Do you need help getting groceries, meals, or cooking?",
    callback: "Best callback time",
    language: "Preferred language",
    consent: "I consent to be contacted by phone or text about my food-support screening request.",
    submit: "Submit Request",
    footer: "Bronx Nourish Access is a routing and callback support funnel. Do not submit sensitive information.",
    success: "Your request was received. A team member may contact you to review available food support options.",
    error: "Please check the form and try again."
  },
  es: {
    eyebrow: "Ruta de apoyo alimentario en el Bronx",
    title: "Ayuda de comida en el Bronx puede estar disponible",
    lede: "Revise opciones disponibles de apoyo alimentario en 60 segundos. No se requiere pago para revisar.",
    primary: "Revisar opciones de comida",
    secondary: "Solicitar llamada",
    noPayment: "No se requiere pago para revisar. La evaluación no garantiza elegibilidad, inscripción, entrega, cantidad de comidas, duración, aprobación de Medicaid, aprobación de SNAP ni ningún servicio específico.",
    privacy: "No pedimos números de Seguro Social, ID de Medicaid, número de caso, estatus migratorio, diagnósticos ni documentos privados.",
    formTitle: "Revisión de ayuda de comida",
    firstName: "Nombre",
    phone: "Número de teléfono",
    zip: "Código postal del Bronx",
    medicaid: "Estado de Medicaid / plan de salud",
    foodNeed: "¿Necesita ayuda con groceries, comidas o cocinar?",
    callback: "Mejor hora para llamar",
    language: "Idioma preferido",
    consent: "Acepto que me contacten por teléfono o texto sobre mi solicitud de revisión de apoyo alimentario.",
    submit: "Enviar solicitud",
    footer: "Bronx Nourish Access es una ruta de apoyo y devolución de llamadas. No envíe información sensible.",
    success: "Su solicitud fue recibida. Un miembro del equipo puede contactarle para revisar opciones disponibles de apoyo alimentario.",
    error: "Revise el formulario e inténtelo otra vez."
  }
};

function getParams() {
  if (typeof window === "undefined") return new URLSearchParams();
  return new URLSearchParams(window.location.search);
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const c = COPY[lang];
  const zipOptions = useMemo(() => VALID_ZIPS.map((zip) => <option key={zip} value={zip}>{zip}</option>), []);

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    setIsError(false);

    const form = new FormData(event.currentTarget);
    const params = getParams();
    const payload = {
      firstName: String(form.get("firstName") || ""),
      phone: String(form.get("phone") || ""),
      zipCode: String(form.get("zipCode") || ""),
      medicaidStatus: String(form.get("medicaidStatus") || ""),
      foodNeed: String(form.get("foodNeed") || ""),
      bestCallbackTime: String(form.get("bestCallbackTime") || ""),
      language: String(form.get("language") || lang),
      consent: form.get("consent") === "on",
      website: String(form.get("website") || ""),
      utmSource: params.get("utm_source") || "direct",
      utmMedium: params.get("utm_medium") || "web",
      utmCampaign: params.get("utm_campaign") || "production_launch",
      utmContent: params.get("utm_content") || "homepage",
      pageUrl: window.location.href
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.message || c.error);
      setMessage(c.success);
      event.currentTarget.reset();
    } catch (err) {
      setIsError(true);
      setMessage(err instanceof Error ? err.message : c.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <header className="topbar">
        <div className="brand"><span className="leaf">●</span><strong>Bronx Nourish Access</strong></div>
        <div className="lang" aria-label="Language selector">
          <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>English</button>
          <button className={lang === "es" ? "active" : ""} onClick={() => setLang("es")}>Español</button>
        </div>
      </header>

      <section className="hero">
        <div className="heroCopy">
          <p className="eyebrow">{c.eyebrow}</p>
          <h1>{c.title}</h1>
          <p className="lede">{c.lede}</p>
          <div className="badges">
            <span>10451</span><span>10452</span><span>10453</span><span>10454</span><span>10455</span>
          </div>
          <p className="notice">{c.noPayment}</p>
          <p className="privacy">{c.privacy}</p>
        </div>

        <form className="card" onSubmit={submitLead}>
          <h2>{c.formTitle}</h2>
          <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: "none" }} />
          <label>{c.firstName}<input name="firstName" autoComplete="given-name" required /></label>
          <label>{c.phone}<input name="phone" type="tel" autoComplete="tel" required /></label>
          <label>{c.zip}<select name="zipCode" required><option value="">Select ZIP</option>{zipOptions}</select></label>
          <label>{c.medicaid}<select name="medicaidStatus" required><option value="">Select one</option><option>I have Medicaid / Tengo Medicaid</option><option>I have a health plan / Tengo plan de salud</option><option>Not sure / No estoy seguro</option><option>No Medicaid / No tengo Medicaid</option></select></label>
          <label>{c.foodNeed}<select name="foodNeed" required><option value="">Select one</option><option>Yes / Sí</option><option>No</option><option>Not sure / No estoy seguro</option></select></label>
          <label>{c.callback}<select name="bestCallbackTime" required><option value="">Select one</option><option>Morning / Mañana</option><option>Afternoon / Tarde</option><option>Evening / Noche</option></select></label>
          <label>{c.language}<select name="language" defaultValue={lang} required><option value="en">English</option><option value="es">Español</option><option value="other">Other / Otro</option></select></label>
          <label className="consent"><input name="consent" type="checkbox" required /> <span>{c.consent}</span></label>
          <button className="submit" disabled={loading}>{loading ? "Sending..." : c.submit}</button>
          {message ? <p className={isError ? "formMsg error" : "formMsg ok"}>{message}</p> : null}
        </form>
      </section>

      <section className="infoGrid">
        <article><h3>{lang === "en" ? "How it works" : "Cómo funciona"}</h3><p>{lang === "en" ? "Submit the short form. The callback team reviews your request and may route you to available options." : "Envíe el formulario corto. El equipo revisa su solicitud y puede ayudarle con opciones disponibles."}</p></article>
        <article><h3>{lang === "en" ? "Partner sharing" : "Compartir con socios"}</h3><p>{lang === "en" ? "Churches, laundromats, bodegas, pharmacies, clinics, and pantries can share this app link or QR flyer." : "Iglesias, lavanderías, bodegas, farmacias, clínicas y despensas pueden compartir este enlace o volante QR."}</p></article>
        <article><h3>{lang === "en" ? "Privacy" : "Privacidad"}</h3><p>{c.privacy}</p></article>
      </section>

      <footer>{c.footer}</footer>
    </main>
  );
}
