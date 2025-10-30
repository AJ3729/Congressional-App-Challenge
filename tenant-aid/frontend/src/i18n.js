import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  EN: {
    translation: {
      home: "Home",
        homeText: "<div className=\"image\"><h1>TenantAid - an NYC Housing Legal Help App</h1></div><h2>Overview</h2><p>TenantAid is a bilingual mobile and web app designed to help NYC tenants understand and protect their housing rights. It combines an AI legal-chatbot, forms, and connections to legal aid.</p><h2>Why it matters to tenants:</h2><br><p>Many New Yorkers face confusing legal notices, potential eviction, or unsafe living conditions. TenantAid puts knowledge and action directly in their hands. TenantAid allows users to:</p><ul><li>Understand their rights in plain language.</li><li>Get quick legal guidance through an AI chatbot.</li><li>Generate and submit official documents like repair requests or complaints.</li><li>Connect instantly with NYC legal aid organizations.</li></ul><br><br><h2>Features:</h2><br><ul><li>Features: AI Chatbot Triage: Ask questions about rent, evictions, repairs, or disputes, and receive immediate, understandable guidance.</li><li>Legal Jargon Simplifier: Convert complex notices and legal terms into plain English or Spanish.</li><li>Rights Library: Access curated, up-to-date information about NYC and NYS tenant protections.</li><li>Referral Network: Connect directly to vetted legal aid organizations.</li><li>Fillable Legal Templates: Generate letters, requests, and forms automatically.</li></ul><br><br><h2>Social Impact</h2><br><p>TenantAid will reduce barriers blocking tenants from justice. It will prevent unlawful evictions and unsafe living condiitons. Additionally, TenantAid provides anonymized insights to policymakers to improve housing interventions.</p><h2>Our goal:</h2><br><p>To empower NYC tenants with knowledge, tools, and connections, turning legal complexity into simple steps, therefore making housing justice practical, accessible, and fair.</p>",
      chat: "Bot Chat",
        fetchFail: "Failed to fetch messages",
        sendFail: "Failed to send message",
        backendRun: "Make sure your backend is running on ",
      rights: "Know Your Rights",
      form: "Help Form",
        emailInput: "Email",
        messageInput: "Your Message",
        submitButton: "Submit",
      language: "Language",
    },
  },
  ES: {
    translation: {
      home: "Inicio",
        homeText: "<div className=\"image\"><h1>TenantAid - una aplicación de ayuda legal de vivienda en NYC</h1><h2>Resumen</h2></div><p>TenantAid es una aplicación móvil y web bilingüe diseñada para ayudar a los inquilinos de NYC a comprender y proteger sus derechos de vivienda. Combina un chatbot legal con IA, formularios y conexiones con asistencia legal.</p><h2>Por qué es importante para los inquilinos:</h2><br><p>Muchos neoyorquinos se enfrentan a avisos legales confusos, posibles desalojos o condiciones de vivienda inseguras. TenantAid pone el conocimiento y la acción directamente en sus manos. TenantAid permite a los usuarios:</p><ul><li>Comprender sus derechos en un lenguaje claro.</li><li>Obtener orientación legal rápida a través de un chatbot con IA.</li><li>Generar y enviar documentos oficiales como solicitudes de reparación o quejas.</li><li>Conectarse instantáneamente con organizaciones de asistencia legal de NYC.</li></ul><br><br><h2>Características:</h2><br><ul><li>Triaje con Chatbot de IA: Hacer preguntas sobre alquileres, desalojos, reparaciones o disputas y recibir orientación inmediata y comprensible.</li><li>Simplificador de jerga legal: Convertir avisos complejos y términos legales en español o inglés claro.</li><li>Biblioteca de derechos: Acceder a información actualizada y seleccionada sobre las protecciones para inquilinos en NYC y NYS.</li><li>Red de referencias: Conectarse directamente con organizaciones de asistencia legal verificadas.</li><li>Plantillas legales rellenables: Generar cartas, solicitudes y formularios automáticamente.</li></ul><br><br><h2>Impacto social</h2><br><p>TenantAid reducirá las barreras que impiden a los inquilinos acceder a la justicia. Evitará desalojos ilegales y condiciones de vivienda inseguras. Además, TenantAid proporciona información anonimizada a los responsables de políticas para mejorar las intervenciones de vivienda.</p><h2>Nuestro objetivo:</h2><br><p>Empoderar a los inquilinos de NYC con conocimiento, herramientas y conexiones, transformando la complejidad legal en pasos simples, haciendo que la justicia en vivienda sea práctica, accesible y justa.</p>",
      chat: "Chat del Bot",
        fetchFail: "Error al obtener los mensajes",
        sendFail: "Error al enviar el mensaje",
        backendRun: "Asegúrese de que su backend esté ejecutándose en ",
      rights: "Conoce Tus Derechos",
      form: "Formulario de Ayuda",
        emailInput: "Correo Electrónico",
        messageInput: "Tu Mensaje",
        submitButton: "Enviar",
      language: "Idioma",
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "EN", // default language
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;