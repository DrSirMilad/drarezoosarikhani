var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_dotenv = __toESM(require("dotenv"), 1);
var import_genai = require("@google/genai");

// src/utils/aiAssistant.ts
var CLINIC_PHONE = "\u06F0\u06F9\u06F3\u06F8\u06F0\u06F4\u06F5\u06F4\u06F5\u06F4\u06F7";
var CLINIC_PHONE_EN = "+98 938 045 4547";
function generateClientAiResponse(userInput, language = "fa") {
  const q = userInput.toLowerCase().trim();
  const isEnglishSite = language === "en";
  const isArabicSite = language === "ar";
  const isPriceQuery = q.includes("\u0642\u06CC\u0645\u062A") || q.includes("\u0647\u0632\u06CC\u0646\u0647") || q.includes("\u0686\u0642\u062F\u0631") || q.includes("\u062A\u0639\u0631\u0641\u0647") || q.includes("\u0627\u0642\u0633\u0627\u0637") || q.includes("\u0642\u0633\u0637") || q.includes("\u0627\u0631\u0632\u0648\u0646") || q.includes("\u0627\u0631\u0632\u0627\u0646") || q.includes("\u0627\u0631\u0632\u0648\u0646\u06CC") || q.includes("\u06AF\u0631\u0627\u0646") || q.includes("\u06AF\u0631\u0648\u0646") || q.includes("\u0645\u06CC\u0644\u06CC\u0648\u0646") || q.includes("\u062A\u0648\u0645\u0627\u0646") || q.includes("\u062A\u0648\u0645\u0646") || q.includes("\u0645\u0628\u0644\u063A") || q.includes("\u0686\u0646\u062F\u0647") || q.includes("\u0686\u0646\u062F") || q.includes("\u067E\u0648\u0644") || q.includes("\u062A\u062E\u0641\u06CC\u0641") || // Finglish price terms
  q.includes("gheymat") || q.includes("gheimat") || q.includes("ghimat") || q.includes("hazine") || q.includes("hazineh") || q.includes("hazinh") || q.includes("arzan") || q.includes("arzoni") || q.includes("ezan") || q.includes("ezani") || q.includes("chande") || q.includes("chand") || q.includes("aghsat") || q.includes("ghist") || q.includes("toman") || q.includes("tomen") || q.includes("price") || q.includes("cost") || q.includes("fee") || q.includes("cheap") || q.includes("expensive") || q.includes("discount");
  if (isPriceQuery) {
    if (isEnglishSite) {
      return {
        text: `Exact treatment costs can NEVER be determined without a personal clinical examination.

Dr. Arezou Sarikhani must examine your teeth in person or review your OPG X-ray to determine the treatment plan.

Please contact our clinic advisors directly on WhatsApp at ${CLINIC_PHONE_EN} to send your photo and speak with an advisor.`
      };
    }
    if (isArabicSite) {
      return {
        text: `\u0628\u0631\u0622\u0648\u0631\u062F \u0648 \u0627\u0639\u0644\u0627\u0645 \u0647\u0632\u06CC\u0646\u0647 \u062F\u0642\u06CC\u0642 \u0628\u062F\u0648\u0646 \u0645\u0639\u0627\u06CC\u0646\u0647 \u062D\u0636\u0648\u0631\u06CC \u0627\u0645\u06A9\u0627\u0646\u200C\u067E\u0630\u06CC\u0631 \u0646\u06CC\u0633\u062A.

\u062A\u0634\u062E\u06CC\u0635 \u0646\u0647\u0627\u06CC\u06CC \u0648 \u0637\u0631\u062D \u062F\u0631\u0645\u0627\u0646 \u062D\u062A\u0645\u0627\u064B \u0628\u0627\u06CC\u062F \u062A\u0648\u0633\u0637 \u062E\u0627\u0646\u0645 \u062F\u06A9\u062A\u0631 \u0622\u0631\u0632\u0648 \u0633\u0627\u0631\u06CC\u062E\u0627\u0646\u06CC \u067E\u0633 \u0627\u0632 \u0645\u0639\u0627\u06CC\u0646\u0647 \u062D\u0636\u0648\u0631\u06CC \u0627\u0646\u062C\u0627\u0645 \u0628\u0634\u0647.

\u062C\u0647\u062A \u0627\u0631\u0633\u0627\u0644 \u0639\u06A9\u0633 \u062F\u0646\u062F\u0627\u0646 \u0648 \u0645\u0634\u0627\u0648\u0631\u0647 \u0628\u0627 \u0645\u0634\u0627\u0648\u0631\u06CC\u0646 \u0645\u0637\u0628\u060C \u062F\u0631 \u0648\u0627\u062A\u0633\u200C\u0627\u067E \u0628\u0647 \u0634\u0645\u0627\u0631\u0647 ${CLINIC_PHONE} \u067E\u06CC\u0627\u0645 \u0628\u062F\u06CC\u062F.`
      };
    }
    return {
      text: `\u0633\u0644\u0627\u0645 \u0639\u0632\u06CC\u0632\u0645 \u{1F338}

\u0628\u0631\u0622\u0648\u0631\u062F \u0648 \u0627\u0639\u0644\u0627\u0645 \u0647\u0632\u06CC\u0646\u0647 \u062F\u0642\u06CC\u0642 \u0628\u062F\u0648\u0646 \u0645\u0639\u0627\u06CC\u0646\u0647 \u062D\u0636\u0648\u0631\u06CC \u0628\u0647 \u0647\u06CC\u0686 \u0648\u062C\u0647 \u0627\u0645\u06A9\u0627\u0646\u200C\u067E\u0630\u06CC\u0631 \u0646\u06CC\u0633\u062A.

\u062A\u0634\u062E\u06CC\u0635 \u0646\u0647\u0627\u06CC\u06CC \u0648 \u062A\u0639\u06CC\u06CC\u0646 \u0637\u0631\u062D \u062F\u0631\u0645\u0627\u0646 \u062D\u062A\u0645\u0627\u064B \u0628\u0627\u06CC\u062F \u062A\u0648\u0633\u0637 \u062E\u0627\u0646\u0645 \u062F\u06A9\u062A\u0631 \u0622\u0631\u0632\u0648 \u0633\u0627\u0631\u06CC\u062E\u0627\u0646\u06CC \u067E\u0633 \u0627\u0632 \u0645\u0639\u0627\u06CC\u0646\u0647 \u062F\u0646\u062F\u0627\u0646 \u0627\u0632 \u0646\u0632\u062F\u06CC\u06A9 \u0627\u0646\u062C\u0627\u0645 \u0628\u0634\u0647.

\u062C\u0647\u062A \u0627\u0631\u062A\u0628\u0627\u0637 \u0645\u0633\u062A\u0642\u06CC\u0645 \u0628\u0627 \u0645\u0634\u0627\u0648\u0631\u06CC\u0646 \u0645\u0637\u0628 \u0648 \u0627\u0631\u0633\u0627\u0644 \u0639\u06A9\u0633 \u062F\u0646\u062F\u0648\u0646\u200C\u0647\u0627\u062A\u0648\u0646\u060C \u0644\u0637\u0641\u0627\u064B \u062F\u0631 \u0648\u0627\u062A\u0633\u200C\u0627\u067E \u0628\u0647 \u0634\u0645\u0627\u0631\u0647 ${CLINIC_PHONE} \u067E\u06CC\u0627\u0645 \u0628\u062F\u06CC\u062F \u062A\u0627 \u0645\u0634\u0627\u0648\u0631\u06CC\u0646 \u0633\u0631\u06CC\u0639\u0627\u064B \u0631\u0627\u0647\u0646\u0645\u0627\u06CC\u06CC\u062A\u0648\u0646 \u06A9\u0646\u0646.`
    };
  }
  const isExplicitlyOffTopic = q.includes("\u0647\u0648\u0627") || q.includes("\u0628\u0627\u0631\u0648\u0646") || q.includes("\u067E\u06CC\u062A\u0632\u0627") || q.includes("\u063A\u0630\u0627") || q.includes("\u0641\u0648\u062A\u0628\u0627\u0644") || q.includes("\u0627\u0633\u062A\u0642\u0644\u0627\u0644") || q.includes("\u067E\u0631\u0633\u067E\u0648\u0644\u06CC\u0633") || q.includes("\u0645\u0627\u0634\u06CC\u0646") || q.includes("\u0628\u0631\u0646\u0627\u0645\u0647 \u0646\u0648\u06CC\u0633\u06CC") || q.includes("\u06A9\u0627\u0645\u067E\u06CC\u0648\u062A\u0631") || q.includes("\u06AF\u0648\u0634\u06CC") || q.includes("\u0645\u0648\u0633\u06CC\u0642\u06CC") || q.includes("\u0641\u06CC\u0644\u0645") || q.includes("weather") || q.includes("football") || q.includes("movie");
  if (isExplicitlyOffTopic) {
    if (isEnglishSite) {
      return {
        text: `I am the AI assistant for Dr. Arezou Sarikhani Dental Clinic.

I can only assist with dental services, location details, and appointments.

How can I help you regarding your dental health or connecting with our clinic advisors?`
      };
    }
    return {
      text: `\u0645\u0646 \u062F\u0633\u062A\u06CC\u0627\u0631 \u0645\u0637\u0628 \u062F\u0646\u062F\u0627\u0646\u067E\u0632\u0634\u06A9\u06CC \u062E\u0627\u0646\u0645 \u062F\u06A9\u062A\u0631 \u0622\u0631\u0632\u0648 \u0633\u0627\u0631\u06CC\u062E\u0627\u0646\u06CC \u0647\u0633\u062A\u0645. \u{1F60A}

\u0645\u0646 \u0641\u0642\u0637 \u0645\u06CC\u200C\u062A\u0648\u0646\u0645 \u062F\u0631 \u0632\u0645\u06CC\u0646\u0647 \u062E\u062F\u0645\u0627\u062A \u062F\u0646\u062F\u0627\u0646\u067E\u0632\u0634\u06A9\u06CC\u060C \u0622\u062F\u0631\u0633 \u0645\u0637\u0628\u060C \u0645\u0634\u0627\u0648\u0631\u0647 \u062F\u0631\u0645\u0627\u0646 \u0648 \u0646\u0648\u0628\u062A\u200C\u062F\u0647\u06CC \u0631\u0627\u0647\u0646\u0645\u0627\u06CC\u06CC\u062A\u0648\u0646 \u06A9\u0646\u0645.

\u0686\u0637\u0648\u0631 \u0645\u06CC\u200C\u062A\u0648\u0646\u0645 \u062F\u0631 \u0632\u0645\u06CC\u0646\u0647 \u0633\u0644\u0627\u0645\u062A \u06CC\u0627 \u0632\u06CC\u0628\u0627\u06CC\u06CC \u062F\u0646\u062F\u0627\u0646\u200C\u0647\u0627\u062A\u0648\u0646 \u06CC\u0627 \u0627\u0631\u062A\u0628\u0627\u0637 \u0628\u0627 \u0645\u0634\u0627\u0648\u0631\u06CC\u0646 \u0645\u0637\u0628 \u06A9\u0645\u06A9\u062A\u0648\u0646 \u06A9\u0646\u0645\u061F`
    };
  }
  if (isEnglishSite) {
    if (q.includes("hello") || q.includes("hi") || q.includes("hey")) {
      return {
        text: `Hello! Welcome to Dr. Arezou Sarikhani Dental Clinic.

I am here to guide you and connect you with our expert clinic advisors.

How can we help you with your dental care or booking today?`
      };
    }
    if (q.includes("address") || q.includes("location") || q.includes("where") || q.includes("map")) {
      return {
        text: `\u{1F4CD} Clinic Address:
Tehranpars, Shahd Blvd, Between 208th & 210th St, No. 301, 4th Floor, Unit 8, Tehran.

\u{1F4DE} Direct Phone & WhatsApp for Advisors:
${CLINIC_PHONE_EN}`
      };
    }
    if (q.includes("time") || q.includes("hour") || q.includes("open") || q.includes("day")) {
      return {
        text: `\u23F0 Working Hours:
Saturday to Thursday: 9:00 AM \u2013 8:00 PM.

All visits require prior examination and appointment with Dr. Sarikhani.`
      };
    }
    return {
      text: `Thank you for reaching out to Dr. Arezou Sarikhani Dental Clinic.

Please note that clinical diagnosis must be conducted in person by Dr. Sarikhani.

To speak directly with our clinic advisors or book a consultation, please call or WhatsApp ${CLINIC_PHONE_EN}.`
    };
  }
  if (isArabicSite) {
    return {
      text: `\u0623\u0647\u0644\u0627\u064B \u0648\u0633\u0647\u0644\u0627\u064B \u0628\u0643 \u0641\u064A \u0639\u064A\u0627\u062F\u0629 \u0627\u0644\u062F\u0643\u062A\u0648\u0631\u0629 \u0622\u0631\u0632\u0648 \u0633\u0627\u0631\u064A\u062E\u0627\u0646\u064A \u0644\u0637\u0628 \u0648\u062A\u062C\u0645\u064A\u0644 \u0627\u0644\u0623\u0633\u0646\u0627\u0646.

\u064A\u0631\u062C\u0649 \u0627\u0644\u0639\u0644\u0645 \u0623\u0646 \u0627\u0644\u062A\u0634\u062E\u064A\u0635 \u0627\u0644\u0646\u0647\u0627\u0626\u064A \u064A\u062A\u0637\u0644\u0628 \u0645\u0639\u0627\u064A\u0646\u0629 \u062D\u0636\u0648\u0631\u064A\u0629 \u0645\u0646 \u0642\u0628\u0644 \u0627\u0644\u062F\u0643\u062A\u0648\u0631\u0629 \u0622\u0631\u0632\u0648 \u0633\u0627\u0631\u064A\u062E\u0627\u0646\u064A.

\u0644\u0644\u062A\u0648\u0627\u0635\u0644 \u0627\u0644\u0645\u0628\u0627\u0634\u0631 \u0645\u0639 \u0645\u0633\u062A\u0634\u0627\u0631\u064A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0623\u0648 \u062D\u062C\u0632 \u0645\u0648\u0639\u062F\u060C \u064A\u0631\u062C\u0649 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0623\u0648 \u0627\u0644\u0645\u0631\u0627\u0633\u0644\u0629 \u0639\u0628\u0631 \u0627\u0644\u0648\u0627\u062A\u0633\u0627\u0628 \u0639\u0644\u0649 \u0627\u0644\u0631\u0642\u0645 09380454547.`
    };
  }
  if (q.includes("\u0633\u0644\u0627\u0645") || q.includes("\u062F\u0631\u0648\u062F") || q.includes("\u0631\u0648\u0632 \u0628\u062E\u06CC\u0631") || q.includes("\u0635\u0628\u062D \u0628\u062E\u06CC\u0631") || q.includes("\u0639\u0635\u0631 \u0628\u062E\u06CC\u0631") || q.includes("\u062E\u0648\u0628\u06CC") || q.includes("\u0686\u0637\u0648\u0631\u06CC") || q.includes("\u0648\u0642\u062A \u0628\u062E\u06CC\u0631") || q.includes("salam") || q.includes("slm") || q.includes("dorood") || q.includes("khobi") || q.includes("chetori")) {
    return {
      text: `\u0633\u0644\u0627\u0645! \u0648\u0642\u062A \u0634\u0645\u0627 \u0628\u062E\u06CC\u0631 \u{1F338}

\u062E\u0648\u0634 \u0622\u0645\u062F\u06CC\u062F \u0628\u0647 \u0633\u06CC\u0633\u062A\u0645 \u067E\u0627\u0633\u062E\u06AF\u0648\u06CC\u06CC \u0645\u0637\u0628 \u062F\u0646\u062F\u0627\u0646\u067E\u0632\u0634\u06A9\u06CC \u062F\u06A9\u062A\u0631 \u0622\u0631\u0632\u0648 \u0633\u0627\u0631\u06CC\u062E\u0627\u0646\u06CC.

\u0645\u0646 \u0627\u06CC\u0646\u062C\u0645 \u062A\u0627 \u0634\u0645\u0627 \u0631\u0648 \u0628\u0647 \u0645\u0634\u0627\u0648\u0631\u06CC\u0646 \u0645\u062A\u062E\u0635\u0635 \u0645\u0637\u0628 \u0648\u0635\u0644 \u06A9\u0646\u0645.

\u0686\u0637\u0648\u0631 \u0645\u06CC\u200C\u062A\u0648\u0646\u0645 \u0631\u0627\u0647\u0646\u0645\u0627\u06CC\u06CC\u062A\u0648\u0646 \u06A9\u0646\u0645\u061F`
    };
  }
  if (q.includes("\u0622\u062F\u0631\u0633") || q.includes("\u06A9\u062C\u0627\u0633\u062A") || q.includes("\u06A9\u062C\u0627") || q.includes("\u0644\u0648\u06A9\u06CC\u0634\u0646") || q.includes("\u0645\u06A9\u0627\u0646") || q.includes("\u0645\u0633\u06CC\u0631") || q.includes("\u0645\u062A\u0631\u0648") || q.includes("\u062A\u0647\u0631\u0627\u0646\u067E\u0627\u0631\u0633") || q.includes("\u0634\u0627\u0647\u062F") || q.includes("\u062A\u0644\u0641\u0646") || q.includes("\u0634\u0645\u0627\u0631\u0647") || q.includes("\u062A\u0645\u0627\u0633") || q.includes("\u0648\u0627\u062A\u0633") || q.includes("\u0648\u0627\u062A\u0633\u0627\u067E") || q.includes("address") || q.includes("location") || q.includes("kojast") || q.includes("koja") || q.includes("tehranpars") || q.includes("shomare") || q.includes("tamas")) {
    return {
      text: `\u{1F4CD} \u0622\u062F\u0631\u0633 \u0645\u0637\u0628 \u062E\u0627\u0646\u0645 \u062F\u06A9\u062A\u0631 \u0622\u0631\u0632\u0648 \u0633\u0627\u0631\u06CC\u062E\u0627\u0646\u06CC:
\u062A\u0647\u0631\u0627\u0646\u067E\u0627\u0631\u0633\u060C \u0628\u0644\u0648\u0627\u0631 \u0634\u0627\u0647\u062F\u060C \u0628\u06CC\u0646 \u062E\u06CC\u0627\u0628\u0627\u0646\u200C\u0647\u0627\u06CC \u06F2\u06F0\u06F8 \u0648 \u06F2\u06F1\u06F0\u060C \u067E\u0644\u0627\u06A9 \u06F3\u06F0\u06F1\u060C \u0637\u0628\u0642\u0647 \u06F4\u060C \u0648\u0627\u062D\u062F \u06F8.

\u{1F687} \u0646\u0632\u062F\u06CC\u06A9 \u0628\u0647 \u0627\u06CC\u0633\u062A\u06AF\u0627\u0647 \u0645\u062A\u0631\u0648 \u062A\u0647\u0631\u0627\u0646\u067E\u0627\u0631\u0633.

\u{1F4DE} \u062A\u0644\u0641\u0646 \u0645\u0633\u062A\u0642\u06CC\u0645 \u0648 \u0648\u0627\u062A\u0633\u200C\u0627\u067E \u0645\u0634\u0627\u0648\u0631\u06CC\u0646 \u0645\u0637\u0628:
${CLINIC_PHONE}

\u062C\u0647\u062A \u0647\u0645\u0627\u0647\u0646\u06AF\u06CC \u0632\u0645\u0627\u0646 \u0645\u0639\u0627\u06CC\u0646\u0647 \u062D\u062A\u0645\u0627\u064B \u0642\u0628\u0644 \u0627\u0632 \u0645\u0631\u0627\u062C\u0639\u0647 \u0628\u0627 \u0645\u0634\u0627\u0648\u0631\u06CC\u0646 \u062A\u0645\u0627\u0633 \u0628\u06AF\u06CC\u0631\u06CC\u062F.`
    };
  }
  if (q.includes("\u0633\u0627\u0639\u062A") || q.includes("\u0632\u0645\u0627\u0646") || q.includes("\u0686\u0647 \u0631\u0648\u0632\u0647\u0627\u06CC") || q.includes("\u0631\u0648\u0632\u0647\u0627") || q.includes("\u0627\u0645\u0631\u0648\u0632") || q.includes("\u062C\u0645\u0639\u0647") || q.includes("\u062A\u0639\u0637\u06CC\u0644") || q.includes("\u0628\u0627\u0632") || q.includes("\u0633\u0627\u0639\u0627\u062A \u06A9\u0627\u0631\u06CC") || q.includes("saat") || q.includes("zamani") || q.includes("roz") || q.includes("ruz")) {
    return {
      text: `\u23F0 \u0633\u0627\u0639\u0627\u062A \u06A9\u0627\u0631\u06CC \u0645\u0637\u0628:
\u0634\u0646\u0628\u0647 \u062A\u0627 \u067E\u0646\u062C\u200C\u0634\u0646\u0628\u0647 \u0627\u0632 \u0633\u0627\u0639\u062A \u06F9:\u06F0\u06F0 \u0635\u0628\u062D \u0627\u0644\u06CC \u06F2\u06F0:\u06F0\u06F0 \u0634\u0628.

\u0645\u0639\u0627\u06CC\u0646\u0647 \u0648 \u0648\u06CC\u0632\u06CC\u062A \u0641\u0642\u0637 \u0628\u0627 \u0648\u0642\u062A \u0642\u0628\u0644\u06CC \u062A\u0648\u0633\u0637 \u062E\u0627\u0646\u0645 \u062F\u06A9\u062A\u0631 \u0627\u0646\u062C\u0627\u0645 \u0645\u06CC\u0634\u0647.

\u0628\u0631\u0627\u06CC \u0631\u0632\u0631\u0648 \u0646\u0648\u0628\u062A \u0645\u0639\u0627\u06CC\u0646\u0647 \u062D\u0636\u0648\u0631\u06CC \u0645\u06CC\u200C\u062A\u0648\u0646\u06CC\u062F \u0628\u0627 \u0634\u0645\u0627\u0631\u0647 ${CLINIC_PHONE} \u062A\u0645\u0627\u0633 \u0628\u06AF\u06CC\u0631\u06CC\u062F \u06CC\u0627 \u062F\u0631 \u0648\u0627\u062A\u0633\u200C\u0627\u067E \u067E\u06CC\u0627\u0645 \u0628\u062F\u06CC\u062F.`
    };
  }
  if (q.includes("\u0646\u0648\u0628\u062A") || q.includes("\u0648\u0642\u062A") || q.includes("\u0631\u0632\u0631\u0648") || q.includes("\u0628\u06CC\u0627\u0645") || q.includes("\u0648\u06CC\u0632\u06CC\u062A") || q.includes("\u0645\u0639\u0627\u06CC\u0646\u0647") || q.includes("\u062B\u0628\u062A") || q.includes("\u0645\u06CC\u062E\u0648\u0627\u0645 \u0628\u06CC\u0627\u0645") || q.includes("nobat") || q.includes("vaght") || q.includes("rezerv") || q.includes("visite") || q.includes("moayene")) {
    return {
      text: `\u062C\u0647\u062A \u062F\u0631\u06CC\u0627\u0641\u062A \u0646\u0648\u0628\u062A \u0645\u0639\u0627\u06CC\u0646\u0647 \u062D\u0636\u0648\u0631\u06CC \u062A\u0648\u0633\u0637 \u062E\u0627\u0646\u0645 \u062F\u06A9\u062A\u0631 \u0622\u0631\u0632\u0648 \u0633\u0627\u0631\u06CC\u062E\u0627\u0646\u06CC:

\u06F1. \u0645\u06CC\u200C\u062A\u0648\u0646\u06CC\u062F \u0627\u0632 \u062F\u06A9\u0645\u0647 \xAB\u062F\u0631\u06CC\u0627\u0641\u062A \u0646\u0648\u0628\u062A \u0622\u0646\u0644\u0627\u06CC\u0646\xBB \u0628\u0627\u0644\u0627\u06CC \u0635\u0641\u062D\u0647 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0646\u06CC\u062F.

\u06F2. \u06CC\u0627 \u0647\u0645\u06CC\u0646 \u0627\u0644\u0627\u0646 \u062F\u0631 \u0648\u0627\u062A\u0633\u200C\u0627\u067E \u0628\u0647 \u0634\u0645\u0627\u0631\u0647 ${CLINIC_PHONE} \u067E\u06CC\u0627\u0645 \u0628\u062F\u06CC\u062F \u062A\u0627 \u0645\u0634\u0627\u0648\u0631\u06CC\u0646 \u0645\u0637\u0628 \u0633\u0631\u06CC\u0639\u0627\u064B \u0646\u0648\u0628\u062A\u062A\u0648\u0646 \u0631\u0648 \u062B\u0628\u062A \u06A9\u0646\u0646.`
    };
  }
  if (q.includes("\u0644\u0645\u06CC\u0646\u062A") || q.includes("\u06A9\u0627\u0645\u067E\u0648\u0632\u06CC\u062A") || q.includes("\u0632\u06CC\u0628\u0627\u06CC\u06CC") || q.includes("\u0644\u0628\u062E\u0646\u062F") || q.includes("\u0633\u0641\u06CC\u062F") || q.includes("\u0628\u0644\u06CC\u0686\u06CC\u0646\u06AF") || q.includes("dsd") || q.includes("\u0648\u0646\u06CC\u0631") || q.includes("\u062C\u0631\u0645\u06AF\u06CC\u0631\u06CC") || q.includes("\u062A\u0631\u0627\u0634") || q.includes("laminate") || q.includes("laminat") || q.includes("composite") || q.includes("kompozit") || q.includes("zibayi") || q.includes("zibai") || q.includes("bleaching")) {
    return {
      text: `\u062F\u0631 \u0645\u0637\u0628 \u062E\u0627\u0646\u0645 \u062F\u06A9\u062A\u0631 \u0622\u0631\u0632\u0648 \u0633\u0627\u0631\u06CC\u062E\u0627\u0646\u06CC \u062E\u062F\u0645\u0627\u062A \u062A\u062E\u0635\u0635\u06CC \u0632\u06CC\u0628\u0627\u06CC\u06CC (\u0644\u0645\u06CC\u0646\u062A\u060C \u06A9\u0627\u0645\u067E\u0648\u0632\u06CC\u062A\u060C \u0628\u0644\u06CC\u0686\u06CC\u0646\u06AF \u0648 DSD) \u0627\u0646\u062C\u0627\u0645 \u0645\u06CC\u0634\u0647.

\u0627\u0646\u062A\u062E\u0627\u0628 \u0628\u0647\u062A\u0631\u06CC\u0646 \u0631\u0648\u0634 \u0632\u06CC\u0628\u0627\u06CC\u06CC \u06A9\u0627\u0645\u0644\u0627\u064B \u0628\u0633\u062A\u06AF\u06CC \u0628\u0647 \u0641\u0631\u0645 \u062F\u0646\u062F\u0627\u0646\u060C \u0641\u06A9 \u0648 \u062A\u0634\u062E\u06CC\u0635 \u0634\u062E\u0635\u06CC \u062E\u0627\u0646\u0645 \u062F\u06A9\u062A\u0631 \u062F\u0627\u0631\u0647.

\u062F\u06A9\u062A\u0631 \u062D\u062A\u0645\u0627\u064B \u0628\u0627\u06CC\u062F \u062F\u0646\u062F\u0627\u0646\u200C\u0647\u0627\u06CC \u0634\u0645\u0627 \u0631\u0648 \u0627\u0632 \u0646\u0632\u062F\u06CC\u06A9 \u0645\u0639\u0627\u06CC\u0646\u0647 \u06A9\u0646\u0646 \u062A\u0627 \u0646\u0638\u0631 \u062F\u0642\u06CC\u0642 \u0628\u062F\u0646\u062F.

\u0644\u0637\u0641\u0627\u064B \u0628\u0631\u0627\u06CC \u0645\u0634\u0627\u0648\u0631\u0647 \u0627\u0648\u0644\u06CC\u0647 \u0648 \u0627\u0631\u0633\u0627\u0644 \u0639\u06A9\u0633 \u062F\u0646\u062F\u0627\u0646 \u0628\u0647 \u0645\u0634\u0627\u0648\u0631\u06CC\u0646 \u0645\u0637\u0628\u060C \u062F\u0631 \u0648\u0627\u062A\u0633\u200C\u0627\u067E \u0628\u0647 \u0634\u0645\u0627\u0631\u0647 ${CLINIC_PHONE} \u067E\u06CC\u0627\u0645 \u0628\u062F\u06CC\u062F.`
    };
  }
  if (q.includes("\u062F\u0631\u062F") || q.includes("\u0628\u06CC \u062D\u0633\u06CC") || q.includes("\u0628\u06CC\u200C\u062D\u0633\u06CC") || q.includes("\u0622\u0645\u067E\u0648\u0644") || q.includes("\u0633\u0648\u0632\u0646") || q.includes("\u062A\u0631\u0633") || q.includes("\u0627\u0633\u062A\u0631\u0633") || q.includes("dard") || q.includes("bihesi") || q.includes("bihisi") || q.includes("ampool") || q.includes("tars")) {
    return {
      text: `\u062F\u0631 \u0645\u0637\u0628 \u062F\u06A9\u062A\u0631 \u0633\u0627\u0631\u06CC\u062E\u0627\u0646\u06CC \u062A\u0632\u0631\u06CC\u0642 \u0628\u06CC\u200C\u062D\u0633\u06CC \u0628\u0627 \u062F\u0633\u062A\u06AF\u0627\u0647 \u062F\u06CC\u062C\u06CC\u062A\u0627\u0644 \u0648 \u0628\u062F\u0648\u0646 \u062F\u0631\u062F \u0627\u0646\u062C\u0627\u0645 \u0645\u06CC\u0634\u0647.

\u0627\u0635\u0644\u0627\u064B \u0646\u06AF\u0631\u0627\u0646 \u062F\u0631\u062F \u06CC\u0627 \u0627\u0633\u062A\u0631\u0633 \u062F\u0631\u0645\u0627\u0646 \u0646\u0628\u0627\u0634\u06CC\u062F.

\u0628\u0631\u0627\u06CC \u0635\u062D\u0628\u062A \u0628\u0627 \u0645\u0634\u0627\u0648\u0631\u06CC\u0646 \u0645\u0637\u0628 \u0648 \u062F\u0631\u06CC\u0627\u0641\u062A \u0631\u0627\u0647\u0646\u0645\u0627\u06CC\u06CC \u0628\u06CC\u0634\u062A\u0631 \u0645\u06CC\u200C\u062A\u0648\u0646\u06CC\u062F \u0628\u0627 \u0634\u0645\u0627\u0631\u0647 ${CLINIC_PHONE} \u062A\u0645\u0627\u0633 \u0628\u06AF\u06CC\u0631\u06CC\u062F.`
    };
  }
  if (q.includes("\u0627\u06CC\u0645\u067E\u0644\u0646\u062A") || q.includes("\u06A9\u0627\u0634\u062A") || q.includes("\u0631\u0648\u06A9\u0634") || q.includes("\u0639\u0635\u0628") || q.includes("\u0644\u062B\u0647") || q.includes("\u067E\u0631\u06A9\u0631\u062F\u0646") || q.includes("\u067E\u064F\u0631") || q.includes("\u062A\u0631\u0645\u06CC\u0645") || q.includes("\u062F\u0646\u062F\u0648\u0646") || q.includes("\u062F\u0646\u062F\u0627\u0646") || q.includes("\u062E\u0631\u0627\u0628") || q.includes("\u0634\u06A9\u0633\u062A\u0647") || q.includes("implant") || q.includes("rokesh") || q.includes("asab") || q.includes("dandun") || q.includes("dandan")) {
    return {
      text: `\u062A\u0634\u062E\u06CC\u0635 \u0648 \u0646\u062D\u0648\u0647 \u062F\u0631\u0645\u0627\u0646 \u0627\u06CC\u0646 \u0645\u0648\u0631\u062F \u0641\u0642\u0637 \u0648 \u0641\u0642\u0637 \u0628\u0627\u06CC\u062F \u062A\u0648\u0633\u0637 \u062E\u0627\u0646\u0645 \u062F\u06A9\u062A\u0631 \u0622\u0631\u0632\u0648 \u0633\u0627\u0631\u06CC\u062E\u0627\u0646\u06CC \u067E\u0633 \u0627\u0632 \u0645\u0639\u0627\u06CC\u0646\u0647 \u062D\u0636\u0648\u0631\u06CC \u06CC\u0627 \u0628\u0631\u0631\u0633\u06CC \u0639\u06A9\u0633 \u0631\u0627\u062F\u06CC\u0648\u0644\u0648\u0698\u06CC \u0627\u0639\u0644\u0627\u0645 \u0628\u0634\u0647.

\u0647\u06CC\u0686 \u0646\u0638\u0631\u06CC \u0628\u062F\u0648\u0646 \u0645\u0639\u0627\u06CC\u0646\u0647 \u0645\u0633\u062A\u0642\u06CC\u0645 \u062F\u06A9\u062A\u0631 \u0635\u0627\u062F\u0631 \u0646\u0645\u06CC\u0634\u0647.

\u062C\u0647\u062A \u0627\u0631\u0633\u0627\u0644 \u0639\u06A9\u0633 \u062F\u0646\u062F\u0627\u0646 \u06CC\u0627 \u0647\u0645\u0627\u0647\u0646\u06AF\u06CC \u0648\u0642\u062A \u0645\u0639\u0627\u06CC\u0646\u0647 \u062D\u0636\u0648\u0631\u06CC\u060C \u062F\u0631 \u0648\u0627\u062A\u0633\u200C\u0627\u067E \u0628\u0647 \u0634\u0645\u0627\u0631\u0647 ${CLINIC_PHONE} \u067E\u06CC\u0627\u0645 \u0628\u062F\u06CC\u062F \u062A\u0627 \u0645\u0634\u0627\u0648\u0631\u06CC\u0646 \u0645\u0637\u0628 \u0634\u0645\u0627 \u0631\u0648 \u0631\u0627\u0647\u0646\u0645\u0627\u06CC\u06CC \u06A9\u0646\u0646.`
    };
  }
  if (q.includes("\u062F\u06A9\u062A\u0631") || q.includes("\u0633\u0627\u0631\u06CC\u062E\u0627\u0646\u06CC") || q.includes("\u0622\u0631\u0632\u0648") || q.includes("\u0633\u0627\u0628\u0642\u0647") || q.includes("\u0631\u0632\u0648\u0645\u0647") || q.includes("\u062F\u0627\u0646\u0634\u06AF\u0627\u0647") || q.includes("dr") || q.includes("doctor") || q.includes("sarikhani") || q.includes("arezou") || q.includes("arezoo")) {
    return {
      text: `\u062E\u0627\u0646\u0645 \u062F\u06A9\u062A\u0631 \u0622\u0631\u0632\u0648 \u0633\u0627\u0631\u06CC\u062E\u0627\u0646\u06CC \u062C\u0631\u0627\u062D \u0648 \u062F\u0646\u062F\u0627\u0646\u067E\u0632\u0634\u06A9\u060C \u0641\u0627\u0631\u063A\u200C\u0627\u0644\u062A\u062D\u0635\u06CC\u0644 \u062F\u0627\u0646\u0634\u06AF\u0627\u0647 \u0639\u0644\u0648\u0645 \u067E\u0632\u0634\u06A9\u06CC \u0634\u0647\u06CC\u062F \u0628\u0647\u0634\u062A\u06CC \u0628\u0627 \u0628\u06CC\u0634 \u0627\u0632 \u06F1\u06F0 \u0633\u0627\u0644 \u0633\u0627\u0628\u0642\u0647 \u062A\u062E\u0635\u0635\u06CC \u0647\u0633\u062A\u0646\u062F.

\u062A\u0645\u0627\u0645\u06CC \u0645\u0631\u0627\u062D\u0644 \u062F\u0631\u0645\u0627\u0646 \u0632\u06CC\u0631 \u0646\u0638\u0631 \u0645\u0633\u062A\u0642\u06CC\u0645 \u0627\u06CC\u0634\u0648\u0646 \u0627\u0646\u062C\u0627\u0645 \u0645\u06CC\u0634\u0647.

\u0628\u0631\u0627\u06CC \u0647\u0645\u0627\u0647\u0646\u06AF\u06CC \u0648\u0642\u062A \u0648\u06CC\u0632\u06CC\u062A \u062D\u0636\u0648\u0631\u06CC \u0628\u0627 \u0634\u0645\u0627\u0631\u0647 ${CLINIC_PHONE} \u062A\u0645\u0627\u0633 \u0628\u06AF\u06CC\u0631\u06CC\u062F.`
    };
  }
  if (q.includes("\u0628\u06CC\u0645\u0647") || q.includes("\u062A\u06A9\u0645\u06CC\u0644\u06CC") || q.includes("\u0641\u0627\u06A9\u062A\u0648\u0631") || q.includes("\u062F\u0641\u062A\u0631\u0686\u0647") || q.includes("bimeh") || q.includes("bime")) {
    return {
      text: `\u0628\u0631\u0627\u06CC \u062A\u0645\u0627\u0645\u06CC \u062E\u062F\u0645\u0627\u062A \u0627\u0646\u062C\u0627\u0645 \u0634\u062F\u0647 \u062F\u0631 \u0645\u0637\u0628\u060C \u06AF\u0648\u0627\u0647\u06CC \u0645\u0639\u062A\u0628\u0631 \u062C\u0647\u062A \u062F\u0631\u06CC\u0627\u0641\u062A \u0647\u0632\u06CC\u0646\u0647 \u0627\u0632 \u0628\u06CC\u0645\u0647\u200C\u0647\u0627\u06CC \u062A\u06A9\u0645\u06CC\u0644\u06CC \u0627\u0631\u0627\u0626\u0647 \u0645\u06CC\u0634\u0647.

\u062C\u0647\u062A \u06A9\u0633\u0628 \u0627\u0637\u0644\u0627\u0639\u0627\u062A \u0628\u06CC\u0634\u062A\u0631 \u0645\u06CC\u200C\u062A\u0648\u0646\u06CC\u062F \u0628\u0627 \u0645\u0634\u0627\u0648\u0631\u06CC\u0646 \u0645\u0637\u0628 \u0628\u0647 \u0634\u0645\u0627\u0631\u0647 ${CLINIC_PHONE} \u062A\u0645\u0627\u0633 \u0628\u06AF\u06CC\u0631\u06CC\u062F.`
    };
  }
  return {
    text: `\u062A\u0634\u062E\u06CC\u0635 \u062F\u0642\u06CC\u0642 \u0648 \u0627\u0631\u0627\u0626\u0647 \u0646\u0638\u0631 \u062A\u062E\u0635\u0635\u06CC \u0635\u0631\u0641\u0627\u064B \u067E\u0633 \u0627\u0632 \u0645\u0639\u0627\u06CC\u0646\u0647 \u062D\u0636\u0648\u0631\u06CC \u062A\u0648\u0633\u0637 \u062E\u0627\u0646\u0645 \u062F\u06A9\u062A\u0631 \u0622\u0631\u0632\u0648 \u0633\u0627\u0631\u06CC\u062E\u0627\u0646\u06CC \u0627\u0645\u06A9\u0627\u0646\u200C\u067E\u0630\u06CC\u0631 \u0627\u0633\u062A.

\u0644\u0637\u0641\u0627\u064B \u062C\u0647\u062A \u0645\u0634\u0627\u0648\u0631\u0647 \u0628\u0627 \u0645\u0634\u0627\u0648\u0631\u06CC\u0646 \u0645\u0637\u0628 \u0648 \u0631\u0632\u0631\u0648 \u0648\u0642\u062A \u0645\u0639\u0627\u06CC\u0646\u0647\u060C \u0639\u06A9\u0633 \u062F\u0646\u062F\u0627\u0646 \u06CC\u0627 \u062F\u0631\u062E\u0648\u0627\u0633\u062A \u062E\u0648\u062F\u062A\u0648\u0646 \u0631\u0648 \u062F\u0631 \u0648\u0627\u062A\u0633\u200C\u0627\u067E \u0628\u0647 \u0634\u0645\u0627\u0631\u0647 ${CLINIC_PHONE} \u0627\u0631\u0633\u0627\u0644 \u0641\u0631\u0645\u0627\u06CC\u06CC\u062F.

\u0647\u0645\u0686\u0646\u06CC\u0646 \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u06CC\u062F \u0628\u0627 \u0647\u0645\u06CC\u0646 \u0634\u0645\u0627\u0631\u0647 \u062A\u0645\u0627\u0633 \u0645\u0633\u062A\u0642\u06CC\u0645 \u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u06CC\u062F.`
  };
}

// server.ts
import_dotenv.default.config();
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json());
var aiClient = null;
function getAiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new import_genai.GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  }
  return aiClient;
}
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
});
app.post("/api/chat", async (req, res) => {
  try {
    const { message, language = "fa", history = [] } = req.body;
    if (!message || typeof message !== "string") {
      res.status(400).json({ error: "Message string is required" });
      return;
    }
    const ai = getAiClient();
    if (!ai) {
      const fallback = generateClientAiResponse(message, language);
      res.json({ text: fallback.text });
      return;
    }
    const systemPrompt = `You are the AI Concierge and Patient Assistant for Dr. Arezou Sarikhani's Dental Clinic (\u0645\u0637\u0628 \u062F\u0646\u062F\u0627\u0646\u067E\u0632\u0634\u06A9\u06CC \u062F\u06A9\u062A\u0631 \u0622\u0631\u0632\u0648 \u0633\u0627\u0631\u06CC\u062E\u0627\u0646\u06CC).
    
    CLINIC DETAILS:
    - Doctor Name: Dr. Arezou Sarikhani (\u062F\u06A9\u062A\u0631 \u0622\u0631\u0632\u0648 \u0633\u0627\u0631\u06CC\u062E\u0627\u0646\u06CC)
    - Specialty: Cosmetic & Restorative Dentistry Specialist (\u062F\u0646\u062F\u0627\u0646\u067E\u0632\u0634\u06A9\u06CC \u0632\u06CC\u0628\u0627\u06CC\u06CC \u0648 \u062A\u0631\u0645\u06CC\u0645\u06CC)
    - Experience: 10+ years of clinical excellence, Graduate of Shahid Beheshti University of Medical Sciences.
    - Address: Tehran, Tehranpars, Shahd Blvd, between Adib (208) & Erfaghi (210) St, No. 301, 4th Floor, Unit 4 West.
    - Phone / WhatsApp for Clinic Advisors: 09380454547 (+989380454547)
    - Working Hours: Saturday to Thursday: 09:00 AM - 08:00 PM.
    
    STRICT MANDATORY RULES (YOU MUST FOLLOW ALL OF THEM):
    1. RESPONSE LANGUAGE: Always respond in Persian (Farsi) by default unless the user explicitly converses in full English or Arabic. Even if the user types Finglish (Persian typed in English alphabet e.g., "ezani", "salam", "nobat", "gheymat"), YOU MUST RESPOND IN PERSIAN (FARSI).
    2. HUMAN CHATTING STYLE WITH SPACING: Write line-by-line like a real human texting in a chat. Put double line breaks (empty line spacing) between lines or thoughts so it looks like short human text messages.
    3. CONNECT TO CLINIC ADVISORS: Constantly guide the patient to connect with clinic advisors via phone or WhatsApp at 09380454547 for consultations and photo submissions.
    4. NO PRICE OPINIONS AT ALL: NEVER give any prices, cost estimates, or fee figures under ANY CIRCUMSTANCES. If asked about prices or costs, politely explain that exact pricing requires an in-person clinical examination by Dr. Sarikhani or sending a photo to clinic advisors at 09380454547.
    5. STRICT DENTAL SCOPE: ONLY discuss dental clinic services, doctor qualifications, location, and booking. Do NOT answer non-dental or general knowledge topics outside dentistry.
    6. NO PERSONAL MEDICAL DIAGNOSIS / DOCTOR MUST EXAMINE: Never express medical opinions or diagnose from yourself. Always emphasize in various ways that "Dr. Arezou Sarikhani must examine you in person to evaluate your teeth and provide a professional diagnosis."`;
    const contents = [
      { role: "user", parts: [{ text: systemPrompt }] },
      { role: "model", parts: [{ text: "Understood. I am ready to assist patients warmly and professionally in Farsi, English, and Arabic." }] }
    ];
    if (Array.isArray(history)) {
      for (const item of history.slice(-6)) {
        if (item.sender === "user" && item.text) {
          contents.push({ role: "user", parts: [{ text: item.text }] });
        } else if (item.sender === "bot" && item.text) {
          contents.push({ role: "model", parts: [{ text: item.text }] });
        }
      }
    }
    contents.push({ role: "user", parts: [{ text: message }] });
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents
    });
    const responseText = response.text || "I'm here to help you with your dental care inquiry. How else may I assist you?";
    res.json({ text: responseText });
  } catch (error) {
    console.error("Gemini Chat API Error:", error);
    res.status(500).json({
      error: "Failed to generate AI response",
      details: error?.message || "Internal server error"
    });
  }
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
