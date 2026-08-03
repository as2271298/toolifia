"use client";

import { useState } from "react";
import { Copy, Check, Code2, ChevronDown } from "lucide-react";

type SchemaType =
  | "Article"
  | "FAQPage"
  | "Product"
  | "LocalBusiness"
  | "BreadcrumbList"
  | "Event"
  | "HowTo"
  | "SoftwareApplication";

const SCHEMA_TYPES: { value: SchemaType; label: string; emoji: string; desc: string }[] = [
  { value: "Article", label: "Article", emoji: "📰", desc: "Blog post, news article, or web content" },
  { value: "FAQPage", label: "FAQ Page", emoji: "❓", desc: "Frequently Asked Questions rich snippet" },
  { value: "Product", label: "Product", emoji: "🛒", desc: "E-commerce product with ratings & price" },
  { value: "LocalBusiness", label: "Local Business", emoji: "🏪", desc: "Store, restaurant, service business" },
  { value: "BreadcrumbList", label: "Breadcrumbs", emoji: "🔗", desc: "Breadcrumb navigation path" },
  { value: "Event", label: "Event", emoji: "📅", desc: "Conference, concert, or online event" },
  { value: "HowTo", label: "HowTo", emoji: "📋", desc: "Step-by-step guide or tutorial" },
  { value: "SoftwareApplication", label: "Software App", emoji: "💻", desc: "Web app, plugin, or software tool" },
];

interface FAQ { question: string; answer: string }
interface Step { name: string; text: string }
interface BreadcrumbItem { name: string; url: string }

export function SchemaGenerator() {
  const [schemaType, setSchemaType] = useState<SchemaType>("Article");
  const [copied, setCopied] = useState(false);

  // Article fields
  const [articleTitle, setArticleTitle] = useState("How to Improve Your Website's SEO in 2025");
  const [articleAuthor, setArticleAuthor] = useState("John Smith");
  const [articlePublisher, setArticlePublisher] = useState("My Website");
  const [articleDate, setArticleDate] = useState("2025-01-01");
  const [articleDesc, setArticleDesc] = useState("A comprehensive guide to SEO best practices for 2025.");
  const [articleUrl, setArticleUrl] = useState("https://example.com/seo-guide-2025");

  // FAQ fields
  const [faqs, setFaqs] = useState<FAQ[]>([
    { question: "What is JSON-LD?", answer: "JSON-LD is a lightweight linked data format used for structured data markup." },
    { question: "Is this tool free?", answer: "Yes, this JSON-LD schema generator is completely free to use." },
  ]);

  // Product fields
  const [productName, setProductName] = useState("Premium Widget Pro");
  const [productDesc, setProductDesc] = useState("High-quality widget for all your needs.");
  const [productBrand, setProductBrand] = useState("MyBrand");
  const [productPrice, setProductPrice] = useState("29.99");
  const [productCurrency, setProductCurrency] = useState("USD");
  const [productRating, setProductRating] = useState("4.8");
  const [productReviews, setProductReviews] = useState("124");
  const [productUrl, setProductUrl] = useState("https://example.com/product");

  // LocalBusiness fields
  const [bizName, setBizName] = useState("My Local Business");
  const [bizType, setBizType] = useState("Restaurant");
  const [bizPhone, setBizPhone] = useState("+1-555-123-4567");
  const [bizAddress, setBizAddress] = useState("123 Main Street");
  const [bizCity, setBizCity] = useState("New York");
  const [bizState, setBizState] = useState("NY");
  const [bizPostal, setBizPostal] = useState("10001");
  const [bizCountry, setBizCountry] = useState("US");
  const [bizUrl, setBizUrl] = useState("https://example.com");

  // Breadcrumb fields
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([
    { name: "Home", url: "https://example.com" },
    { name: "Blog", url: "https://example.com/blog" },
    { name: "SEO Guide", url: "https://example.com/blog/seo-guide" },
  ]);

  // Event fields
  const [eventName, setEventName] = useState("SEO Conference 2025");
  const [eventStartDate, setEventStartDate] = useState("2025-06-15T09:00");
  const [eventEndDate, setEventEndDate] = useState("2025-06-16T18:00");
  const [eventLocation, setEventLocation] = useState("New York Convention Center");
  const [eventDesc, setEventDesc] = useState("Annual SEO conference for digital marketers.");
  const [eventUrl, setEventUrl] = useState("https://example.com/event");
  const [eventMode, setEventMode] = useState("OfflineEventAttendanceMode");

  // HowTo fields
  const [howToName, setHowToName] = useState("How to Add JSON-LD Schema to Your Website");
  const [howToDesc, setHowToDesc] = useState("Follow these steps to add structured data markup.");
  const [steps, setSteps] = useState<Step[]>([
    { name: "Generate the Schema", text: "Use a JSON-LD generator tool to create your schema markup." },
    { name: "Copy the Code", text: "Copy the generated <script type=\"application/ld+json\"> code." },
    { name: "Paste in HTML", text: "Paste the code inside your page's <head> section." },
    { name: "Test with Google", text: "Use Google's Rich Results Test to verify the markup." },
  ]);

  // Software fields
  const [appName, setAppName] = useState("My Web Application");
  const [appDesc, setAppDesc] = useState("A powerful web-based tool for productivity.");
  const [appCategory, setAppCategory] = useState("WebApplication");
  const [appOS, setAppOS] = useState("All");
  const [appPrice, setAppPrice] = useState("0");
  const [appRating, setAppRating] = useState("4.9");
  const [appReviews, setAppReviews] = useState("500");
  const [appUrl, setAppUrl] = useState("https://example.com/app");

  const generateSchema = (): object => {
    switch (schemaType) {
      case "Article":
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: articleTitle,
          description: articleDesc,
          url: articleUrl,
          datePublished: articleDate,
          author: { "@type": "Person", name: articleAuthor },
          publisher: { "@type": "Organization", name: articlePublisher, logo: { "@type": "ImageObject", url: `${articleUrl}/logo.png` } },
        };

      case "FAQPage":
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        };

      case "Product":
        return {
          "@context": "https://schema.org",
          "@type": "Product",
          name: productName,
          description: productDesc,
          url: productUrl,
          brand: { "@type": "Brand", name: productBrand },
          offers: { "@type": "Offer", price: productPrice, priceCurrency: productCurrency, availability: "https://schema.org/InStock" },
          aggregateRating: { "@type": "AggregateRating", ratingValue: productRating, reviewCount: productReviews },
        };

      case "LocalBusiness":
        return {
          "@context": "https://schema.org",
          "@type": bizType || "LocalBusiness",
          name: bizName,
          telephone: bizPhone,
          url: bizUrl,
          address: {
            "@type": "PostalAddress",
            streetAddress: bizAddress,
            addressLocality: bizCity,
            addressRegion: bizState,
            postalCode: bizPostal,
            addressCountry: bizCountry,
          },
        };

      case "BreadcrumbList":
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbs.map((item, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            name: item.name,
            item: item.url,
          })),
        };

      case "Event":
        return {
          "@context": "https://schema.org",
          "@type": "Event",
          name: eventName,
          startDate: eventStartDate,
          endDate: eventEndDate,
          description: eventDesc,
          url: eventUrl,
          eventAttendanceMode: `https://schema.org/${eventMode}`,
          location: { "@type": "Place", name: eventLocation },
          organizer: { "@type": "Organization", name: eventLocation },
        };

      case "HowTo":
        return {
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: howToName,
          description: howToDesc,
          step: steps.map((s, idx) => ({
            "@type": "HowToStep",
            position: idx + 1,
            name: s.name,
            text: s.text,
          })),
        };

      case "SoftwareApplication":
        return {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: appName,
          description: appDesc,
          applicationCategory: appCategory,
          operatingSystem: appOS,
          url: appUrl,
          offers: { "@type": "Offer", price: appPrice, priceCurrency: "USD" },
          aggregateRating: { "@type": "AggregateRating", ratingValue: appRating, reviewCount: appReviews },
        };
    }
  };

  const getOutput = () => {
    const schema = generateSchema();
    return `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
  };

  const copySchema = () => {
    navigator.clipboard.writeText(getOutput());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addFaq = () => setFaqs([...faqs, { question: "", answer: "" }]);
  const updateFaq = (i: number, field: keyof FAQ, val: string) => setFaqs(faqs.map((f, idx) => idx === i ? { ...f, [field]: val } : f));
  const removeFaq = (i: number) => setFaqs(faqs.filter((_, idx) => idx !== i));

  const addStep = () => setSteps([...steps, { name: "", text: "" }]);
  const updateStep = (i: number, field: keyof Step, val: string) => setSteps(steps.map((s, idx) => idx === i ? { ...s, [field]: val } : s));
  const removeStep = (i: number) => setSteps(steps.filter((_, idx) => idx !== i));

  const addBreadcrumb = () => setBreadcrumbs([...breadcrumbs, { name: "", url: "" }]);
  const updateBreadcrumb = (i: number, field: keyof BreadcrumbItem, val: string) => setBreadcrumbs(breadcrumbs.map((b, idx) => idx === i ? { ...b, [field]: val } : b));
  const removeBreadcrumb = (i: number) => setBreadcrumbs(breadcrumbs.filter((_, idx) => idx !== i));

  const input = (label: string, value: string, setter: (v: string) => void, type = "text", placeholder?: string) => (
    <div>
      <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => setter(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 text-slate-900 dark:text-white transition"
      />
    </div>
  );

  const textarea = (label: string, value: string, setter: (v: string) => void, rows = 2) => (
    <div>
      <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">{label}</label>
      <textarea
        value={value}
        onChange={(e) => setter(e.target.value)}
        rows={rows}
        className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 text-slate-900 dark:text-white transition resize-none"
      />
    </div>
  );

  const renderFields = () => {
    switch (schemaType) {
      case "Article": return (
        <div className="space-y-3">
          {input("Headline / Title", articleTitle, setArticleTitle, "text", "Your article title")}
          {textarea("Description", articleDesc, setArticleDesc)}
          {input("Author Name", articleAuthor, setArticleAuthor)}
          {input("Publisher / Site Name", articlePublisher, setArticlePublisher)}
          {input("Date Published", articleDate, setArticleDate, "date")}
          {input("Article URL", articleUrl, setArticleUrl, "url")}
        </div>
      );
      case "FAQPage": return (
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-violet-500 uppercase">FAQ #{i + 1}</span>
                {faqs.length > 1 && <button onClick={() => removeFaq(i)} className="text-xs text-red-400 hover:text-red-600">Remove</button>}
              </div>
              {input("Question", faq.question, (v) => updateFaq(i, "question", v))}
              {textarea("Answer", faq.answer, (v) => updateFaq(i, "answer", v))}
            </div>
          ))}
          <button onClick={addFaq} className="w-full py-2 text-sm font-semibold text-violet-600 border-2 border-dashed border-violet-300 dark:border-violet-700 rounded-xl hover:bg-violet-50 dark:hover:bg-violet-900/20 transition">
            + Add FAQ
          </button>
        </div>
      );
      case "Product": return (
        <div className="space-y-3">
          {input("Product Name", productName, setProductName)}
          {textarea("Description", productDesc, setProductDesc)}
          {input("Brand Name", productBrand, setProductBrand)}
          <div className="grid grid-cols-2 gap-3">
            {input("Price", productPrice, setProductPrice)}
            {input("Currency (USD, EUR...)", productCurrency, setProductCurrency)}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {input("Rating (0-5)", productRating, setProductRating)}
            {input("Review Count", productReviews, setProductReviews)}
          </div>
          {input("Product URL", productUrl, setProductUrl, "url")}
        </div>
      );
      case "LocalBusiness": return (
        <div className="space-y-3">
          {input("Business Name", bizName, setBizName)}
          {input("Business Type (Restaurant, Store...)", bizType, setBizType)}
          {input("Phone Number", bizPhone, setBizPhone, "tel")}
          {input("Street Address", bizAddress, setBizAddress)}
          <div className="grid grid-cols-2 gap-3">
            {input("City", bizCity, setBizCity)}
            {input("State/Region", bizState, setBizState)}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {input("Postal Code", bizPostal, setBizPostal)}
            {input("Country Code (US, GB...)", bizCountry, setBizCountry)}
          </div>
          {input("Website URL", bizUrl, setBizUrl, "url")}
        </div>
      );
      case "BreadcrumbList": return (
        <div className="space-y-3">
          {breadcrumbs.map((b, i) => (
            <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-violet-500 uppercase">Item #{i + 1}</span>
                {breadcrumbs.length > 1 && <button onClick={() => removeBreadcrumb(i)} className="text-xs text-red-400 hover:text-red-600">Remove</button>}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {input("Name", b.name, (v) => updateBreadcrumb(i, "name", v))}
                {input("URL", b.url, (v) => updateBreadcrumb(i, "url", v), "url")}
              </div>
            </div>
          ))}
          <button onClick={addBreadcrumb} className="w-full py-2 text-sm font-semibold text-violet-600 border-2 border-dashed border-violet-300 dark:border-violet-700 rounded-xl hover:bg-violet-50 dark:hover:bg-violet-900/20 transition">
            + Add Breadcrumb
          </button>
        </div>
      );
      case "Event": return (
        <div className="space-y-3">
          {input("Event Name", eventName, setEventName)}
          {textarea("Description", eventDesc, setEventDesc)}
          <div className="grid grid-cols-2 gap-3">
            {input("Start Date & Time", eventStartDate, setEventStartDate, "datetime-local")}
            {input("End Date & Time", eventEndDate, setEventEndDate, "datetime-local")}
          </div>
          {input("Location / Venue", eventLocation, setEventLocation)}
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Attendance Mode</label>
            <select value={eventMode} onChange={(e) => setEventMode(e.target.value)} className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 text-slate-900 dark:text-white">
              <option value="OfflineEventAttendanceMode">In-Person</option>
              <option value="OnlineEventAttendanceMode">Online</option>
              <option value="MixedEventAttendanceMode">Mixed (Hybrid)</option>
            </select>
          </div>
          {input("Event URL", eventUrl, setEventUrl, "url")}
        </div>
      );
      case "HowTo": return (
        <div className="space-y-3">
          {input("Guide Title", howToName, setHowToName)}
          {textarea("Description", howToDesc, setHowToDesc)}
          {steps.map((s, i) => (
            <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-violet-500 uppercase">Step {i + 1}</span>
                {steps.length > 1 && <button onClick={() => removeStep(i)} className="text-xs text-red-400 hover:text-red-600">Remove</button>}
              </div>
              {input("Step Name", s.name, (v) => updateStep(i, "name", v))}
              {textarea("Step Description", s.text, (v) => updateStep(i, "text", v))}
            </div>
          ))}
          <button onClick={addStep} className="w-full py-2 text-sm font-semibold text-violet-600 border-2 border-dashed border-violet-300 dark:border-violet-700 rounded-xl hover:bg-violet-50 dark:hover:bg-violet-900/20 transition">
            + Add Step
          </button>
        </div>
      );
      case "SoftwareApplication": return (
        <div className="space-y-3">
          {input("App / Tool Name", appName, setAppName)}
          {textarea("Description", appDesc, setAppDesc)}
          {input("App Category (WebApplication, MobileApplication...)", appCategory, setAppCategory)}
          {input("Operating System (All, iOS, Android, Windows...)", appOS, setAppOS)}
          {input("App URL", appUrl, setAppUrl, "url")}
          <div className="grid grid-cols-2 gap-3">
            {input("Price (0 for free)", appPrice, setAppPrice)}
            {input("Rating (0-5)", appRating, setAppRating)}
          </div>
          {input("Review Count", appReviews, setAppReviews)}
        </div>
      );
    }
  };

  const selectedType = SCHEMA_TYPES.find((t) => t.value === schemaType)!;

  return (
    <div className="space-y-6">
      {/* Schema Type Selector */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">Select Schema Type</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {SCHEMA_TYPES.map((t) => (
            <button
              key={t.value}
              onClick={() => setSchemaType(t.value)}
              className={`flex flex-col items-start gap-1 p-3 rounded-xl border text-left transition-all ${
                schemaType === t.value
                  ? "bg-violet-600 border-violet-600 text-white shadow-lg shadow-violet-500/20"
                  : "bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20"
              }`}
            >
              <span className="text-lg">{t.emoji}</span>
              <span className="text-xs font-bold leading-tight">{t.label}</span>
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-slate-400">{selectedType.desc}</p>
      </div>

      {/* Main Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Fields */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">📝 Fill in the fields</h3>
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
            {renderFields()}
          </div>
        </div>

        {/* JSON-LD Output */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">⚡ JSON-LD Output</h3>
            <button
              onClick={copySchema}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                copied
                  ? "bg-green-500 text-white"
                  : "bg-violet-600 hover:bg-violet-700 text-white"
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied!" : "Copy JSON-LD"}
            </button>
          </div>
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 h-full min-h-[300px] max-h-[500px] overflow-auto">
            <pre className="text-xs font-mono text-slate-300 whitespace-pre-wrap break-words leading-relaxed">
              {getOutput()}
            </pre>
          </div>
        </div>
      </div>

      {/* Info Footer */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { icon: "✅", title: "Google Approved", desc: "Follows Schema.org spec and Google Rich Results guidelines" },
          { icon: "⚡", title: "Real-time Preview", desc: "JSON-LD updates instantly as you type" },
          { icon: "🔗", title: "Free & No Signup", desc: "100% free JSON-LD schema generator, no account needed" },
        ].map((item) => (
          <div key={item.title} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700">
            <span className="text-xl">{item.icon}</span>
            <div>
              <div className="text-xs font-bold text-slate-700 dark:text-slate-200">{item.title}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
