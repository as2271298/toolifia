"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import type html2canvasType from "html2canvas";
import {
  Sparkles, Copy, Check, Printer, Download, FileText,
  User, Briefcase, GraduationCap, Award, Palette, Image as ImageIcon,
  Mail, Phone, MapPin, Globe, Linkedin, Star, RotateCcw,
} from "lucide-react";

// ── CV Data Type ──────────────────────────────────────────────
interface CvContact { email: string; phone: string; location: string; linkedin: string; website: string }
interface CvExperience { title: string; company: string; location: string; dates: string; bullets: string[] }
interface CvEducation { degree: string; school: string; location: string; dates: string }
interface CvLanguage { name: string; level: string; score: number }
interface CvReference { name: string; position: string; phone: string; email: string }
interface CvData {
  name: string; title: string; summary: string; contact: CvContact;
  experience: CvExperience[]; education: CvEducation[];
  skills: string[]; languages: CvLanguage[]; certifications: string[];
  hobbies: string[]; references: CvReference[];
}

// ── Shared Sub-Components ─────────────────────────────────────
function SkillDots({ score, color = "#60a5fa" }: { score: number; color?: string }) {
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map(i => (
        <div key={i} style={{ width:9, height:9, borderRadius:"50%", background: i <= score ? color : "rgba(255,255,255,0.25)" }} />
      ))}
    </div>
  );
}

function SkillBar({ score, color = "#f59e0b" }: { score: number; color?: string }) {
  return (
    <div style={{ background: "rgba(0,0,0,0.15)", borderRadius:4, height:6, flex:1, overflow:"hidden" }}>
      <div style={{ width:`${(score/5)*100}%`, height:"100%", background: color, borderRadius:4 }} />
    </div>
  );
}

function PhotoPlaceholder({ initials, size=80, bg="#1e3a5f", photo }: { initials: string; size?: number; bg?: string; photo?: string | null }) {
  if (photo) {
    return (
      <div style={{
        width:size, height:size, borderRadius:"50%", overflow:"hidden", flexShrink:0,
        border:"3px solid rgba(255,255,255,0.35)",
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} alt="Profile" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
      </div>
    );
  }
  return (
    <div style={{
      width:size, height:size, borderRadius:"50%", background:bg,
      display:"flex", alignItems:"center", justifyContent:"center",
      fontSize:size/3, fontWeight:900, color:"white", letterSpacing:1, flexShrink:0,
      border:"3px solid rgba(255,255,255,0.3)",
    }}>
      {initials.split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase()}
    </div>
  );
}

// ── Template 1: Navy Dark Sidebar (like Image 1 & 2) ─────────
function TemplateNavySidebar({ cv, photo }: { cv: CvData; photo?: string | null }) {
  const NAVY = "#1a2744";
  const ACCENT = "#4a9eff";
  return (
    <div style={{ display:"flex", minHeight:1060, fontFamily:"'Segoe UI',Inter,sans-serif", background:"#fff", borderRadius:8, overflow:"hidden", boxShadow:"0 8px 40px rgba(0,0,0,0.18)" }}>
      {/* LEFT SIDEBAR */}
      <div style={{ width:230, background:NAVY, color:"white", padding:"32px 20px", flexShrink:0 }}>
        {/* Photo */}
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", marginBottom:24, textAlign:"center" }}>
          <PhotoPlaceholder initials={cv.name} size={88} bg="#2a3f6f" photo={photo} />
          <div style={{ marginTop:12, fontSize:17, fontWeight:800, lineHeight:1.2 }}>{cv.name}</div>
          <div style={{ fontSize:10, color:ACCENT, marginTop:4, letterSpacing:1, textTransform:"uppercase" }}>{cv.title}</div>
        </div>
        {/* Contact */}
        <SidebarSection title="Contact" color={ACCENT}>
          {[
            { icon:"📧", val: cv.contact.email },
            { icon:"📞", val: cv.contact.phone },
            { icon:"📍", val: cv.contact.location },
            { icon:"🔗", val: cv.contact.linkedin },
          ].filter(i=>i.val).map((item, i) => (
            <div key={i} style={{ display:"flex", gap:8, alignItems:"flex-start", marginBottom:8 }}>
              <span style={{ fontSize:11, marginTop:1 }}>{item.icon}</span>
              <span style={{ fontSize:10, lineHeight:1.4, wordBreak:"break-all", opacity:0.9 }}>{item.val}</span>
            </div>
          ))}
        </SidebarSection>
        {/* Skills */}
        <SidebarSection title="Skills" color={ACCENT}>
          {cv.skills.map((s, i) => (
            <div key={i} style={{ fontSize:10, marginBottom:5, display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ width:5, height:5, borderRadius:"50%", background:ACCENT, flexShrink:0 }} />
              <span style={{ opacity:0.9 }}>{s}</span>
            </div>
          ))}
        </SidebarSection>
        {/* Languages */}
        {cv.languages.length > 0 && (
          <SidebarSection title="Languages" color={ACCENT}>
            {cv.languages.map((l, i) => (
              <div key={i} style={{ marginBottom:8 }}>
                <div style={{ fontSize:10, marginBottom:3, opacity:0.9 }}>{l.name} – <span style={{ opacity:0.6 }}>{l.level}</span></div>
                <SkillDots score={l.score} color={ACCENT} />
              </div>
            ))}
          </SidebarSection>
        )}
        {/* Hobbies */}
        {cv.hobbies.length > 0 && (
          <SidebarSection title="Hobbies" color={ACCENT}>
            {cv.hobbies.map((h, i) => (
              <div key={i} style={{ fontSize:10, marginBottom:4, opacity:0.85 }}>• {h}</div>
            ))}
          </SidebarSection>
        )}
      </div>
      {/* RIGHT MAIN CONTENT */}
      <div style={{ flex:1, padding:"32px 32px 32px 28px" }}>
        <MainSection title="Professional Summary" accentColor={NAVY}>
          <p style={{ fontSize:12, lineHeight:1.7, color:"#374151" }}>{cv.summary}</p>
        </MainSection>
        <MainSection title="Work Experience" accentColor={NAVY}>
          {cv.experience.map((e, i) => (
            <ExperienceBlock key={i} exp={e} accentColor={NAVY} dotColor={ACCENT} />
          ))}
        </MainSection>
        <MainSection title="Education" accentColor={NAVY}>
          {cv.education.map((e, i) => (
            <div key={i} style={{ marginBottom:14 }}>
              <div style={{ fontWeight:700, fontSize:13, color:"#111827" }}>{e.degree}</div>
              <div style={{ fontSize:11, color:"#6b7280" }}>{e.school}{e.location ? `, ${e.location}` : ""}</div>
              <div style={{ fontSize:11, color:"#9ca3af" }}>{e.dates}</div>
            </div>
          ))}
        </MainSection>
        {cv.certifications.length > 0 && (
          <MainSection title="Certifications" accentColor={NAVY}>
            {cv.certifications.map((c, i) => (
              <div key={i} style={{ fontSize:11, color:"#374151", marginBottom:5 }}>• {c}</div>
            ))}
          </MainSection>
        )}
        {cv.references.length > 0 && (
          <MainSection title="References" accentColor={NAVY}>
            {cv.references.map((r, i) => (
              <div key={i} style={{ marginBottom:10 }}>
                <div style={{ fontWeight:700, fontSize:12, color:"#111827" }}>{r.name}</div>
                <div style={{ fontSize:11, color:"#6b7280" }}>{r.position}</div>
                <div style={{ fontSize:10, color:"#9ca3af" }}>{r.phone} · {r.email}</div>
              </div>
            ))}
          </MainSection>
        )}
      </div>
    </div>
  );
}

// ── Template 2: Yellow/Black Modern (like Image 3) ───────────
function TemplateYellowModern({ cv, photo }: { cv: CvData; photo?: string | null }) {
  const DARK = "#1e1e1e";
  const YELLOW = "#f5a623";
  return (
    <div style={{ display:"flex", minHeight:1060, fontFamily:"'Segoe UI',Inter,sans-serif", background:"#fff", borderRadius:8, overflow:"hidden", boxShadow:"0 8px 40px rgba(0,0,0,0.18)" }}>
      {/* LEFT DARK SIDEBAR */}
      <div style={{ width:240, background:DARK, color:"white", padding:"28px 20px", flexShrink:0 }}>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", marginBottom:24, textAlign:"center" }}>
          <PhotoPlaceholder initials={cv.name} size={90} bg="#2a2a2a" photo={photo} />
          <div style={{ marginTop:14, fontSize:18, fontWeight:900, lineHeight:1.2 }}>{cv.name}</div>
          <div style={{ fontSize:10, color:YELLOW, marginTop:5, letterSpacing:1.5, textTransform:"uppercase" }}>{cv.title}</div>
        </div>
        <SidebarSection title="Contact Me" color={YELLOW} dark>
          {[
            { icon:"📞", val: cv.contact.phone },
            { icon:"📧", val: cv.contact.email },
            { icon:"🌐", val: cv.contact.website },
            { icon:"📍", val: cv.contact.location },
          ].filter(i=>i.val).map((item, i) => (
            <div key={i} style={{ display:"flex", gap:8, alignItems:"flex-start", marginBottom:8 }}>
              <span style={{ fontSize:11 }}>{item.icon}</span>
              <span style={{ fontSize:10, lineHeight:1.4, wordBreak:"break-all", opacity:0.85 }}>{item.val}</span>
            </div>
          ))}
        </SidebarSection>
        <SidebarSection title="Education" color={YELLOW} dark>
          {cv.education.map((e, i) => (
            <div key={i} style={{ marginBottom:12 }}>
              <div style={{ fontSize:11, fontWeight:700, color:YELLOW }}>{e.school}</div>
              <div style={{ fontSize:10, opacity:0.8 }}>{e.degree}</div>
              <div style={{ fontSize:10, opacity:0.5 }}>{e.dates}</div>
            </div>
          ))}
        </SidebarSection>
        {cv.references.length > 0 && (
          <SidebarSection title="References" color={YELLOW} dark>
            {cv.references.map((r, i) => (
              <div key={i} style={{ marginBottom:12 }}>
                <div style={{ fontSize:11, fontWeight:700 }}>{r.name}</div>
                <div style={{ fontSize:10, opacity:0.7 }}>{r.position}</div>
                <div style={{ fontSize:10, opacity:0.55 }}>{r.phone}</div>
                <div style={{ fontSize:10, opacity:0.55 }}>{r.email}</div>
              </div>
            ))}
          </SidebarSection>
        )}
      </div>
      {/* RIGHT CONTENT */}
      <div style={{ flex:1, padding:"28px 28px 28px 24px", background:"#fff" }}>
        <YellowSection title="About Me" color={YELLOW}>
          <p style={{ fontSize:12, lineHeight:1.7, color:"#374151" }}>{cv.summary}</p>
        </YellowSection>
        <YellowSection title="Job Experience" color={YELLOW}>
          {cv.experience.map((e, i) => (
            <div key={i} style={{ marginBottom:18 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                <div>
                  <div style={{ fontWeight:800, fontSize:13, color:"#111" }}>{e.title}</div>
                  <div style={{ fontSize:11, color:"#6b7280" }}>{e.company}{e.location ? ` · ${e.location}` : ""}</div>
                </div>
                <div style={{ fontSize:11, color:YELLOW, fontWeight:700, whiteSpace:"nowrap" }}>{e.dates}</div>
              </div>
              <div style={{ marginTop:8 }}>
                {e.bullets.map((b, bi) => (
                  <div key={bi} style={{ fontSize:11, color:"#374151", lineHeight:1.6, marginBottom:3 }}>
                    <span style={{ color:YELLOW, marginRight:6 }}>▸</span>{b}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </YellowSection>
        <YellowSection title="Skills" color={YELLOW}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px 16px" }}>
            {cv.skills.map((s, i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ fontSize:11, color:"#374151", flex:1 }}>{s}</span>
                <SkillBar score={Math.min(5, 3 + (i % 3))} color={YELLOW} />
              </div>
            ))}
          </div>
        </YellowSection>
        {cv.certifications.length > 0 && (
          <YellowSection title="Certifications" color={YELLOW}>
            {cv.certifications.map((c, i) => (
              <div key={i} style={{ fontSize:11, color:"#374151", marginBottom:5 }}>
                <span style={{ color:YELLOW, marginRight:6 }}>✦</span>{c}
              </div>
            ))}
          </YellowSection>
        )}
      </div>
    </div>
  );
}

// ── Template 3: Teal Two-Column (like Image 4) ────────────────
function TemplateTealProfessional({ cv, photo }: { cv: CvData; photo?: string | null }) {
  const TEAL = "#0e7490";
  const LIGHT = "#f0f9ff";
  return (
    <div style={{ display:"flex", minHeight:1060, fontFamily:"'Segoe UI',Inter,sans-serif", background:"#fff", borderRadius:8, overflow:"hidden", boxShadow:"0 8px 40px rgba(0,0,0,0.15)" }}>
      {/* LEFT 40% */}
      <div style={{ width:280, background:TEAL, color:"white", padding:"36px 22px", flexShrink:0 }}>
        <div style={{ textAlign:"center", marginBottom:20 }}>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:14 }}>
            <PhotoPlaceholder initials={cv.name} size={100} bg="rgba(255,255,255,0.15)" photo={photo} />
          </div>
          <div style={{ fontSize:22, fontWeight:900, lineHeight:1.2 }}>{cv.name}</div>
          <div style={{ fontSize:11, color:"rgba(255,255,255,0.75)", marginTop:6, letterSpacing:1, textTransform:"uppercase" }}>{cv.title}</div>
        </div>
        {/* Divider */}
        <div style={{ height:1, background:"rgba(255,255,255,0.25)", margin:"16px 0" }} />
        {/* Objective / Summary */}
        <div style={{ marginBottom:20 }}>
          <div style={{ fontSize:12, fontWeight:800, letterSpacing:1, textTransform:"uppercase", marginBottom:8, color:"rgba(255,255,255,0.6)" }}>Profile</div>
          <p style={{ fontSize:11, lineHeight:1.7, opacity:0.85 }}>{cv.summary.slice(0, 300)}</p>
        </div>
        {/* Contact */}
        <div style={{ marginBottom:20 }}>
          <div style={{ fontSize:12, fontWeight:800, letterSpacing:1, textTransform:"uppercase", marginBottom:10, color:"rgba(255,255,255,0.6)" }}>Contact</div>
          {[
            { val: cv.contact.phone },
            { val: cv.contact.email },
            { val: cv.contact.location },
            { val: cv.contact.linkedin },
          ].filter(i=>i.val).map((item, i) => (
            <div key={i} style={{ fontSize:10, opacity:0.85, marginBottom:7, wordBreak:"break-all" }}>{item.val}</div>
          ))}
        </div>
        {/* Skills */}
        <div style={{ marginBottom:20 }}>
          <div style={{ fontSize:12, fontWeight:800, letterSpacing:1, textTransform:"uppercase", marginBottom:10, color:"rgba(255,255,255,0.6)" }}>Skills</div>
          {cv.skills.map((s, i) => (
            <div key={i} style={{ fontSize:10, marginBottom:5, display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ width:5, height:5, borderRadius:"50%", background:"rgba(255,255,255,0.6)", flexShrink:0 }} />
              <span style={{ opacity:0.85 }}>{s}</span>
            </div>
          ))}
        </div>
        {/* Languages */}
        {cv.languages.length > 0 && (
          <div style={{ marginBottom:20 }}>
            <div style={{ fontSize:12, fontWeight:800, letterSpacing:1, textTransform:"uppercase", marginBottom:10, color:"rgba(255,255,255,0.6)" }}>Language</div>
            {cv.languages.map((l, i) => (
              <div key={i} style={{ marginBottom:8 }}>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, marginBottom:4 }}>
                  <span>{l.name}</span><span style={{ opacity:0.6 }}>{l.level}</span>
                </div>
                <SkillDots score={l.score} color="rgba(255,255,255,0.9)" />
              </div>
            ))}
          </div>
        )}
        {/* Hobbies */}
        {cv.hobbies.length > 0 && (
          <div>
            <div style={{ fontSize:12, fontWeight:800, letterSpacing:1, textTransform:"uppercase", marginBottom:8, color:"rgba(255,255,255,0.6)" }}>Hobbies</div>
            {cv.hobbies.map((h, i) => (
              <div key={i} style={{ fontSize:10, marginBottom:4, opacity:0.8 }}>◦ {h}</div>
            ))}
          </div>
        )}
      </div>
      {/* RIGHT CONTENT */}
      <div style={{ flex:1, padding:"32px 28px 28px 24px" }}>
        <TealSection title="Work Experience" color={TEAL}>
          {cv.experience.map((e, i) => (
            <ExperienceBlock key={i} exp={e} accentColor={TEAL} dotColor={TEAL} />
          ))}
        </TealSection>
        <TealSection title="Education" color={TEAL}>
          {cv.education.map((e, i) => (
            <div key={i} style={{ marginBottom:14 }}>
              <div style={{ fontWeight:700, fontSize:13, color:"#111827" }}>{e.degree}</div>
              <div style={{ fontSize:11, color:TEAL, fontStyle:"italic" }}>{e.school}{e.location ? `, ${e.location}` : ""}</div>
              <div style={{ fontSize:11, color:"#9ca3af" }}>{e.dates}</div>
            </div>
          ))}
        </TealSection>
        {cv.certifications.length > 0 && (
          <TealSection title="Certifications" color={TEAL}>
            {cv.certifications.map((c, i) => (
              <div key={i} style={{ fontSize:11, color:"#374151", marginBottom:5 }}>• {c}</div>
            ))}
          </TealSection>
        )}
        {cv.hobbies.length > 0 && (
          <TealSection title="Activities" color={TEAL}>
            {cv.hobbies.map((h, i) => (
              <div key={i} style={{ fontSize:11, color:"#374151", marginBottom:4 }}>• {h}</div>
            ))}
          </TealSection>
        )}
      </div>
    </div>
  );
}

// ── Template 4: Clean Gray (like Image 5 – Luna Rodriguez) ────
function TemplateCleanGray({ cv, photo }: { cv: CvData; photo?: string | null }) {
  const GRAY = "#4b5563";
  return (
    <div style={{ display:"flex", minHeight:1060, fontFamily:"'Georgia',serif", background:"#fff", borderRadius:8, overflow:"hidden", boxShadow:"0 8px 40px rgba(0,0,0,0.12)" }}>
      {/* LEFT MAIN CONTENT (wider) */}
      <div style={{ flex:1, padding:"36px 28px 28px 36px", borderRight:"1px solid #e5e7eb" }}>
        {/* Header */}
        <div style={{ borderBottom:"2px solid #111827", paddingBottom:14, marginBottom:22, display:"flex", alignItems:"center", gap:20 }}>
          {photo && (
            <PhotoPlaceholder initials={cv.name} size={76} photo={photo} />
          )}
          <div style={{ flex:1 }}>
            <div role="heading" aria-level={2} style={{ fontSize:32, fontWeight:900, color:"#111827", margin:0, letterSpacing:-0.5 }}>{cv.name}</div>
            <p style={{ fontSize:13, color:GRAY, margin:"6px 0 0", lineHeight:1.6 }}>{cv.summary.slice(0,250)}</p>
          </div>
        </div>
        {/* Work History */}
        <div style={{ marginBottom:24 }}>
          <div style={{ fontSize:15, fontWeight:800, color:"#111827", borderBottom:"1px solid #d1d5db", paddingBottom:6, marginBottom:14 }}>Work History</div>
          {cv.experience.map((e, i) => (
            <div key={i} style={{ marginBottom:20 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:2 }}>
                <span style={{ fontWeight:700, fontSize:13, color:"#111827" }}>{e.title}</span>
                <span style={{ fontSize:11, color:"#9ca3af" }}>{e.dates}</span>
              </div>
              <div style={{ fontSize:11, color:GRAY, fontStyle:"italic", marginBottom:8 }}>{e.company}{e.location ? `, ${e.location}` : ""}</div>
              {e.bullets.map((b, bi) => (
                <div key={bi} style={{ fontSize:11.5, color:"#374151", lineHeight:1.65, marginBottom:4, display:"flex", gap:8 }}>
                  <span style={{ color:GRAY }}>•</span><span>{b}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* Certifications */}
        {cv.certifications.length > 0 && (
          <div style={{ marginBottom:24 }}>
            <div style={{ fontSize:15, fontWeight:800, color:"#111827", borderBottom:"1px solid #d1d5db", paddingBottom:6, marginBottom:14 }}>Certifications</div>
            {cv.certifications.map((c, i) => (
              <div key={i} style={{ fontSize:11.5, color:"#374151", marginBottom:6 }}>• {c}</div>
            ))}
          </div>
        )}
        {/* Education */}
        <div>
          <div style={{ fontSize:15, fontWeight:800, color:"#111827", borderBottom:"1px solid #d1d5db", paddingBottom:6, marginBottom:14 }}>Education</div>
          {cv.education.map((e, i) => (
            <div key={i} style={{ marginBottom:16 }}>
              <div style={{ display:"flex", justifyContent:"space-between" }}>
                <span style={{ fontWeight:700, fontSize:13, color:"#111827" }}>{e.degree}</span>
                <span style={{ fontSize:11, color:"#9ca3af" }}>{e.dates}</span>
              </div>
              <div style={{ fontSize:11, color:GRAY, fontStyle:"italic" }}>{e.school}{e.location ? `, ${e.location}` : ""}</div>
            </div>
          ))}
        </div>
        {/* Activities */}
        {cv.hobbies.length > 0 && (
          <div style={{ marginTop:16 }}>
            <div style={{ fontSize:15, fontWeight:800, color:"#111827", borderBottom:"1px solid #d1d5db", paddingBottom:6, marginBottom:14 }}>Activities</div>
            {cv.hobbies.map((h, i) => (
              <div key={i} style={{ fontSize:11.5, color:"#374151", marginBottom:5 }}>• {h}</div>
            ))}
          </div>
        )}
      </div>
      {/* RIGHT SIDEBAR (narrow) */}
      <div style={{ width:200, padding:"36px 18px 18px", background:"#f9fafb" }}>
        <div style={{ marginBottom:22 }}>
          <div style={{ fontSize:13, fontWeight:800, color:"#111827", marginBottom:10 }}>Contact</div>
          <div style={{ fontSize:10.5, color:GRAY, marginBottom:7 }}><strong>Address</strong><br/>{cv.contact.location}</div>
          <div style={{ fontSize:10.5, color:GRAY, marginBottom:7 }}><strong>Phone</strong><br/>{cv.contact.phone}</div>
          <div style={{ fontSize:10.5, color:GRAY, marginBottom:7 }}><strong>E-mail</strong><br/><span style={{ wordBreak:"break-all" }}>{cv.contact.email}</span></div>
          {cv.contact.linkedin && <div style={{ fontSize:10.5, color:GRAY, marginBottom:7 }}><strong>LinkedIn</strong><br/><span style={{ wordBreak:"break-all" }}>{cv.contact.linkedin}</span></div>}
        </div>
        <div style={{ marginBottom:22 }}>
          <div style={{ fontSize:13, fontWeight:800, color:"#111827", marginBottom:10 }}>Skills</div>
          {cv.skills.map((s, i) => (
            <div key={i} style={{ fontSize:10.5, color:GRAY, marginBottom:5 }}>• {s}</div>
          ))}
        </div>
        {cv.languages.length > 0 && (
          <div style={{ marginBottom:22 }}>
            <div style={{ fontSize:13, fontWeight:800, color:"#111827", marginBottom:10 }}>Languages</div>
            {cv.languages.map((l, i) => (
              <div key={i} style={{ marginBottom:12 }}>
                <div style={{ fontSize:10.5, color:"#111827", marginBottom:4 }}>{l.name}</div>
                <SkillDots score={l.score} color="#4b5563" />
                <div style={{ fontSize:9.5, color:"#9ca3af", marginTop:3 }}>{l.level}</div>
              </div>
            ))}
          </div>
        )}
        {cv.references.length > 0 && (
          <div>
            <div style={{ fontSize:13, fontWeight:800, color:"#111827", marginBottom:10 }}>References</div>
            {cv.references.map((r, i) => (
              <div key={i} style={{ marginBottom:12 }}>
                <div style={{ fontSize:11, fontWeight:700, color:"#111827" }}>{r.name}</div>
                <div style={{ fontSize:10, color:GRAY }}>{r.position}</div>
                <div style={{ fontSize:10, color:"#9ca3af", wordBreak:"break-all" }}>{r.email}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Template 5: Executive Bold (Premium) ──────────────────────
function TemplateExecutiveBold({ cv, photo }: { cv: CvData; photo?: string | null }) {
  const DEEP = "#0f172a";
  const GOLD = "#d97706";
  return (
    <div style={{ minHeight:1060, fontFamily:"'Segoe UI',Inter,sans-serif", background:"#fff", borderRadius:8, overflow:"hidden", boxShadow:"0 8px 40px rgba(0,0,0,0.18)" }}>
      {/* TOP HEADER */}
      <div style={{ background:DEEP, color:"white", padding:"36px 40px 28px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:24 }}>
          <PhotoPlaceholder initials={cv.name} size={96} bg="rgba(255,255,255,0.1)" photo={photo} />
          <div>
            <div role="heading" aria-level={2} style={{ fontSize:34, fontWeight:900, margin:0, letterSpacing:-0.5 }}>{cv.name}</div>
            <div style={{ fontSize:14, color:GOLD, marginTop:6, letterSpacing:2, textTransform:"uppercase", fontWeight:700 }}>{cv.title}</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:16, marginTop:10 }}>
              {[cv.contact.email, cv.contact.phone, cv.contact.location, cv.contact.linkedin].filter(Boolean).map((c, i) => (
                <span key={i} style={{ fontSize:10.5, color:"rgba(255,255,255,0.65)" }}>{c}</span>
              ))}
            </div>
          </div>
        </div>
        {/* Gold Divider */}
        <div style={{ height:2, background:`linear-gradient(90deg, ${GOLD}, transparent)`, marginTop:20, borderRadius:2 }} />
      </div>
      {/* BODY — 2 column */}
      <div style={{ display:"flex", gap:0 }}>
        {/* LEFT */}
        <div style={{ flex:"0 0 62%", padding:"28px 24px 28px 40px", borderRight:"1px solid #f1f5f9" }}>
          <div style={{ marginBottom:8, paddingBottom:6, borderBottom:`2px solid ${GOLD}` }}>
            <div style={{ fontSize:13, fontWeight:800, color:GOLD, letterSpacing:2, textTransform:"uppercase" }}>Professional Summary</div>
          </div>
          <p style={{ fontSize:12, lineHeight:1.75, color:"#374151", marginBottom:24 }}>{cv.summary}</p>
          <div style={{ marginBottom:8, paddingBottom:6, borderBottom:`2px solid ${GOLD}` }}>
            <div style={{ fontSize:13, fontWeight:800, color:GOLD, letterSpacing:2, textTransform:"uppercase" }}>Professional Experience</div>
          </div>
          {cv.experience.map((e, i) => (
            <div key={i} style={{ marginBottom:20 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:2 }}>
                <div style={{ fontWeight:800, fontSize:14, color:DEEP }}>{e.title}</div>
                <div style={{ fontSize:11, color:GOLD, fontWeight:700, whiteSpace:"nowrap" }}>{e.dates}</div>
              </div>
              <div style={{ fontSize:11.5, color:"#6b7280", marginBottom:8 }}>{e.company}{e.location ? ` · ${e.location}` : ""}</div>
              {e.bullets.map((b, bi) => (
                <div key={bi} style={{ display:"flex", gap:8, fontSize:11.5, color:"#374151", lineHeight:1.65, marginBottom:4 }}>
                  <span style={{ color:GOLD, flexShrink:0 }}>▸</span><span>{b}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* RIGHT */}
        <div style={{ flex:1, padding:"28px 36px 28px 20px" }}>
          <GoldSideSection title="Skills" color={GOLD} deep={DEEP}>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
              {cv.skills.map((s, i) => (
                <div key={i} style={{ padding:"3px 10px", background:DEEP, color:"white", borderRadius:20, fontSize:10, fontWeight:600 }}>{s}</div>
              ))}
            </div>
          </GoldSideSection>
          <GoldSideSection title="Education" color={GOLD} deep={DEEP}>
            {cv.education.map((e, i) => (
              <div key={i} style={{ marginBottom:14 }}>
                <div style={{ fontWeight:700, fontSize:12.5, color:DEEP }}>{e.degree}</div>
                <div style={{ fontSize:11, color:"#6b7280" }}>{e.school}</div>
                <div style={{ fontSize:10.5, color:"#9ca3af" }}>{e.dates}</div>
              </div>
            ))}
          </GoldSideSection>
          {cv.languages.length > 0 && (
            <GoldSideSection title="Languages" color={GOLD} deep={DEEP}>
              {cv.languages.map((l, i) => (
                <div key={i} style={{ marginBottom:10 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, marginBottom:4 }}>
                    <span style={{ fontWeight:700 }}>{l.name}</span>
                    <span style={{ color:"#9ca3af", fontSize:10 }}>{l.level}</span>
                  </div>
                  <SkillDots score={l.score} color={GOLD} />
                </div>
              ))}
            </GoldSideSection>
          )}
          {cv.certifications.length > 0 && (
            <GoldSideSection title="Certifications" color={GOLD} deep={DEEP}>
              {cv.certifications.map((c, i) => (
                <div key={i} style={{ fontSize:11, color:"#374151", marginBottom:5 }}>• {c}</div>
              ))}
            </GoldSideSection>
          )}
          {cv.hobbies.length > 0 && (
            <GoldSideSection title="Interests" color={GOLD} deep={DEEP}>
              {cv.hobbies.map((h, i) => (
                <div key={i} style={{ fontSize:11, color:"#374151", marginBottom:4 }}>• {h}</div>
              ))}
            </GoldSideSection>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Shared Layout Helpers ────────────────────────────────────
function SidebarSection({ title, color, children, dark }: { title:string; color:string; children:React.ReactNode; dark?:boolean }) {
  return (
    <div style={{ marginBottom:20 }}>
      <div style={{ fontSize:11, fontWeight:800, letterSpacing:1.5, textTransform:"uppercase", color, marginBottom:10, paddingBottom:5, borderBottom:`1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.2)"}` }}>{title}</div>
      {children}
    </div>
  );
}
function MainSection({ title, accentColor, children }: { title:string; accentColor:string; children:React.ReactNode }) {
  return (
    <div style={{ marginBottom:22 }}>
      <div style={{ fontSize:14, fontWeight:800, color:accentColor, textTransform:"uppercase", letterSpacing:1, borderBottom:`2px solid ${accentColor}`, paddingBottom:5, marginBottom:12 }}>{title}</div>
      {children}
    </div>
  );
}
function YellowSection({ title, color, children }: { title:string; color:string; children:React.ReactNode }) {
  return (
    <div style={{ marginBottom:20 }}>
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
        <div style={{ width:16, height:16, background:color, borderRadius:3 }} />
        <div style={{ fontSize:14, fontWeight:800, color:"#111", textTransform:"uppercase", letterSpacing:1 }}>{title}</div>
      </div>
      {children}
    </div>
  );
}
function TealSection({ title, color, children }: { title:string; color:string; children:React.ReactNode }) {
  return (
    <div style={{ marginBottom:22 }}>
      <div style={{ fontSize:14, fontWeight:800, color, textTransform:"uppercase", letterSpacing:1, borderBottom:`2px solid ${color}`, paddingBottom:5, marginBottom:14 }}>{title}</div>
      {children}
    </div>
  );
}
function GoldSideSection({ title, color, deep, children }: { title:string; color:string; deep:string; children:React.ReactNode }) {
  return (
    <div style={{ marginBottom:20 }}>
      <div style={{ fontSize:11, fontWeight:800, letterSpacing:1.5, textTransform:"uppercase", color, marginBottom:8, paddingBottom:5, borderBottom:`1px solid #f1f5f9` }}>{title}</div>
      {children}
    </div>
  );
}
function ExperienceBlock({ exp, accentColor, dotColor }: { exp:CvExperience; accentColor:string; dotColor:string }) {
  return (
    <div style={{ marginBottom:18 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:2 }}>
        <div style={{ fontWeight:700, fontSize:13, color:"#111827" }}>{exp.title} | {exp.company}</div>
        <div style={{ fontSize:11, color:dotColor, fontWeight:600, whiteSpace:"nowrap", marginLeft:8 }}>{exp.dates}</div>
      </div>
      <div style={{ fontSize:11, color:"#6b7280", fontStyle:"italic", marginBottom:8 }}>{exp.location}</div>
      {exp.bullets.map((b, i) => (
        <div key={i} style={{ display:"flex", gap:8, fontSize:11.5, color:"#374151", lineHeight:1.65, marginBottom:4 }}>
          <div style={{ width:5, height:5, borderRadius:"50%", background:dotColor, marginTop:6, flexShrink:0 }} />
          <span>{b}</span>
        </div>
      ))}
    </div>
  );
}

// ── Form Input Data ───────────────────────────────────────────
interface FormData {
  fullName: string; email: string; phone: string; location: string; linkedin: string; website: string;
  jobTitle: string; experienceYears: string; summary: string;
  company: string; pastTitle: string; dates: string; achievements: string;
  projects: string; skills: string; education: string; certifications: string;
  hobbies: string; languages: string;
}

// ── Template Config ───────────────────────────────────────────
const TEMPLATES = [
  { id:"navy",      name:"Navy Sidebar",    icon:"🔷", desc:"Dark navy sidebar, photo, skills" },
  { id:"yellow",    name:"Yellow Modern",   icon:"🟡", desc:"Dark sidebar, yellow accents, skill bars" },
  { id:"teal",      name:"Teal Pro",        icon:"🩵", desc:"Teal column, dots, activities" },
  { id:"clean",     name:"Clean Gray",      icon:"⬜", desc:"Minimalist, right sidebar, language dots" },
  { id:"executive", name:"Executive Gold",  icon:"🟤", desc:"Dark header, gold accents, tag skills" },
] as const;
type TemplateId = typeof TEMPLATES[number]["id"];

const STORAGE_KEY = "toolifia_cv_builder_draft_v1";

const DEFAULT_FORM: FormData = {
  fullName: "Jane Smith", email: "jane.smith@example.com", phone: "+1 (555) 234-5678",
  location: "New York, NY", linkedin: "linkedin.com/in/janesmith", website: "www.janesmith.dev",
  jobTitle: "Senior Full-Stack Engineer", experienceYears: "7+ years",
  summary: "Passionate engineer specializing in React, Next.js, Node.js, and cloud-native systems.",
  company: "TechCorp Systems", pastTitle: "Lead Developer",
  dates: "2021 – Present",
  achievements: "Built multi-tenant microservices, reduced API latency by 40%, led a team of 6 engineers, shipped 3 major releases.",
  projects: "Toolifia Platform (100K MAU, Next.js + PostgreSQL), OSS contributor to React Query.",
  skills: "TypeScript, React, Next.js, Node.js, PostgreSQL, Docker, AWS, GraphQL",
  education: "B.S. Computer Science — UC Berkeley (2018)",
  certifications: "AWS Certified Solutions Architect, Certified Kubernetes Administrator (CKA)",
  hobbies: "Open Source, Technical Writing, Rock Climbing",
  languages: "English (Native), Spanish (Intermediate)",
};

// ── Main Component ────────────────────────────────────────────
export function ResumeBuilder() {
  const [template, setTemplate] = useState<TemplateId>("navy");
  const [cvData, setCvData] = useState<CvData | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [rawJson, setRawJson] = useState("");
  const [parseError, setParseError] = useState("");
  const [pngLoading, setPngLoading] = useState(false);
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const documentRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<FormData>(DEFAULT_FORM);

  // Restore saved draft on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.form) setForm(parsed.form);
        if (parsed.cvData) setCvData(parsed.cvData);
        if (parsed.rawJson) setRawJson(parsed.rawJson);
        if (parsed.photoDataUrl) setPhotoDataUrl(parsed.photoDataUrl);
        if (parsed.template) setTemplate(parsed.template);
      }
    } catch {
      /* ignore storage errors */
    }
    setIsLoaded(true);
  }, []);

  // Debounced save to localStorage (wait 800ms after typing stops)
  useEffect(() => {
    if (!isLoaded) return;
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          form,
          cvData,
          rawJson,
          photoDataUrl,
          template,
        }));
      } catch {
        /* ignore storage quota errors */
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [form, cvData, rawJson, photoDataUrl, template, isLoaded]);

  const clearDraft = () => {
    if (confirm("Are you sure you want to reset all fields and start fresh?")) {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch { /* ignore */ }
      setForm(DEFAULT_FORM);
      setCvData(null);
      setRawJson("");
      setPhotoDataUrl(null);
      setTemplate("navy");
    }
  };

  const upd = (f: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [f]: e.target.value }));

  const generateCv = async () => {
    if (!form.fullName.trim() || !form.jobTitle.trim()) return;
    setLoading(true);
    setCvData(null);
    setParseError("");

    const prompt = `
Candidate Profile:
- Name: ${form.fullName}
- Contact: Email: ${form.email} | Phone: ${form.phone} | Location: ${form.location} | LinkedIn: ${form.linkedin} | Website: ${form.website}
- Target Role: ${form.jobTitle} (${form.experienceYears} experience)
- Summary: ${form.summary}
- Work Experience: ${form.pastTitle} at ${form.company} (${form.dates}). Achievements: ${form.achievements}
- Projects: ${form.projects}
- Skills: ${form.skills}
- Education: ${form.education}
- Certifications: ${form.certifications}
- Hobbies: ${form.hobbies}
- Languages: ${form.languages}
Generate a complete, richly detailed, executive-quality CV JSON.`;

    try {
      const res = await fetch("/api/tools/resume-builder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: prompt }),
      });
      const json = await res.json();

      // Try cvData from API first (already parsed by server)
      if (json.cvData && json.cvData.name) {
        setCvData(json.cvData as CvData);
        setRawJson(JSON.stringify(json.cvData, null, 2));
      } else {
        // Fallback: try to parse result string on client side
        try {
          let raw = (json.result || "").replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
          const start = raw.indexOf("{");
          const end = raw.lastIndexOf("}");
          if (start !== -1 && end > start) raw = raw.slice(start, end + 1);
          const parsed = JSON.parse(raw) as CvData;
          if (parsed.name) {
            setCvData(parsed);
            setRawJson(JSON.stringify(parsed, null, 2));
          } else {
            setParseError("AI response was missing required fields. Please try again.");
          }
        } catch {
          setParseError("Could not parse AI response as a CV. Please try generating again.");
          setRawJson(json.result || "");
        }
      }
    } catch {
      setParseError("Network error. Please check your connection and try again.");
    }
    setLoading(false);
  };

  const downloadFile = (content: string, name: string, type: string) => {
    const a = Object.assign(document.createElement("a"), {
      href: URL.createObjectURL(new Blob([content], { type })),
      download: name,
    });
    a.click();
  };

  const printPdf = () => window.print();
  const copyJson = () => {
    navigator.clipboard.writeText(rawJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadPng = useCallback(async () => {
    const el = documentRef.current;
    if (!el || pngLoading) return;
    setPngLoading(true);
    try {
      const { default: html2canvas } = await import("html2canvas") as { default: typeof html2canvasType };
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#ffffff",
        logging: false,
        windowWidth: el.scrollWidth,
        windowHeight: el.scrollHeight,
        width: el.scrollWidth,
        height: el.scrollHeight,
        // ── Fix tainted canvas: remove external stylesheets from the clone ──
        onclone: (_clonedDoc: Document) => {
          // Strip all <link rel="stylesheet"> from the cloned document
          // so no cross-origin fonts pollute the canvas
          _clonedDoc.querySelectorAll('link[rel="stylesheet"]').forEach(el => el.remove());
          // Also strip Google Fonts @import from <style> tags
          _clonedDoc.querySelectorAll("style").forEach(styleEl => {
            styleEl.textContent = (styleEl.textContent || "").replace(/@import\s+url\([^)]+\);?/g, "");
          });
        },
      });
      // Use toBlob → object URL to avoid any remaining taint issues
      canvas.toBlob((blob) => {
        if (!blob) { alert("PNG export failed — try PDF instead."); return; }
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${(cvData?.name || "CV").replace(/\s+/g, "_")}_CV.png`;
        link.click();
        setTimeout(() => URL.revokeObjectURL(url), 5000);
      }, "image/png", 1.0);
    } catch (err) {
      console.error("PNG export failed:", err);
      alert("PNG export failed. Please try PDF/Print instead.");
    } finally {
      setPngLoading(false);
    }
  }, [cvData, pngLoading]);

  const cvTemplates: Record<TemplateId, React.ReactNode> = cvData ? {
    navy:      <TemplateNavySidebar cv={cvData} photo={photoDataUrl} />,
    yellow:    <TemplateYellowModern cv={cvData} photo={photoDataUrl} />,
    teal:      <TemplateTealProfessional cv={cvData} photo={photoDataUrl} />,
    clean:     <TemplateCleanGray cv={cvData} photo={photoDataUrl} />,
    executive: <TemplateExecutiveBold cv={cvData} photo={photoDataUrl} />,
  } : {} as any;

  const inputCls = "w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition";
  const labelCls = "block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider";
  const sectionCls = "p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm";
  const sectionHeaderCls = "flex items-center gap-2.5 text-xs font-extrabold text-slate-700 dark:text-white uppercase tracking-widest pb-2 border-b border-slate-100 dark:border-slate-800 mb-1";

  return (
    <div className="space-y-6">
      {/* Template Picker */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="w-full">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 font-extrabold text-sm text-slate-700 dark:text-white">
              <Palette className="w-4 h-4 text-brand-500" /> Choose CV Template
            </div>
            <button
              onClick={clearDraft}
              className="text-xs font-semibold text-slate-500 hover:text-red-500 flex items-center gap-1 transition px-2 py-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30"
              title="Reset all form fields and clear saved draft"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Draft
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {TEMPLATES.map(t => (
              <button key={t.id} onClick={() => setTemplate(t.id)}
                className={`flex flex-col items-center gap-1 px-2 py-3 rounded-xl text-center transition-all border-2 ${
                  template === t.id
                    ? "border-brand-600 bg-brand-50 dark:bg-brand-950/40 shadow-md"
                    : "border-transparent bg-slate-50 dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600"
                }`}>
                <span className="text-2xl">{t.icon}</span>
                <span className={`text-[11px] font-bold ${template === t.id ? "text-brand-700 dark:text-brand-300" : "text-slate-700 dark:text-slate-300"}`}>{t.name}</span>
                <span className="text-[9px] text-slate-400 leading-snug hidden sm:block">{t.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-3">
        {/* Personal */}
        <div className={sectionCls}>
          <div className={sectionHeaderCls}>
            <span className="w-5 h-5 rounded-full bg-brand-600 text-white text-[9px] font-black flex items-center justify-center flex-shrink-0">1</span>
            <User className="w-3 h-3 text-brand-500" /> Personal & Contact
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div>
              <label className={labelCls}>Profile Photo</label>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (evt) => {
                        const img = new Image();
                        img.onload = () => {
                          const canvas = document.createElement("canvas");
                          const maxDim = 250;
                          let w = img.width, h = img.height;
                          if (w > h) { if (w > maxDim) { h = Math.round((h * maxDim) / w); w = maxDim; } }
                          else { if (h > maxDim) { w = Math.round((w * maxDim) / h); h = maxDim; } }
                          canvas.width = w;
                          canvas.height = h;
                          const ctx = canvas.getContext("2d");
                          if (ctx) {
                            ctx.drawImage(img, 0, 0, w, h);
                            setPhotoDataUrl(canvas.toDataURL("image/jpeg", 0.85));
                          } else {
                            setPhotoDataUrl(evt.target?.result as string);
                          }
                        };
                        img.src = evt.target?.result as string;
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="hidden"
                  id="cv-photo-upload"
                />
                <label
                  htmlFor="cv-photo-upload"
                  className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 cursor-pointer flex items-center gap-1.5 transition"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-brand-500" />
                  {photoDataUrl ? "Change Photo" : "Upload Photo"}
                </label>
                {photoDataUrl && (
                  <button
                    type="button"
                    onClick={() => setPhotoDataUrl(null)}
                    className="text-[11px] text-red-500 hover:underline font-medium"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
            {([["Full Name *","fullName"],["Email","email"],["Phone","phone"],["Location","location"],["LinkedIn URL","linkedin"],["Website","website"]] as [string,keyof FormData][]).map(([lbl,fld]) => (
              <div key={fld} className={fld==="linkedin"||fld==="website" ? "" : ""}>
                <label className={labelCls}>{lbl}</label>
                <input value={form[fld]} onChange={upd(fld)} className={inputCls} />
              </div>
            ))}
          </div>
        </div>
        {/* Target Role */}
        <div className={sectionCls}>
          <div className={sectionHeaderCls}>
            <span className="w-5 h-5 rounded-full bg-brand-600 text-white text-[9px] font-black flex items-center justify-center flex-shrink-0">2</span>
            <FileText className="w-3 h-3 text-brand-500" /> Target Role & Summary
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><label className={labelCls}>Target Job Title *</label><input value={form.jobTitle} onChange={upd("jobTitle")} className={inputCls} /></div>
            <div><label className={labelCls}>Years of Experience</label><input value={form.experienceYears} onChange={upd("experienceYears")} className={inputCls} /></div>
            <div className="sm:col-span-2"><label className={labelCls}>Career Summary / Key Strengths</label><textarea value={form.summary} onChange={upd("summary")} rows={2} className={`${inputCls} resize-none`} /></div>
          </div>
        </div>
        {/* Experience */}
        <div className={sectionCls}>
          <div className={sectionHeaderCls}>
            <span className="w-5 h-5 rounded-full bg-brand-600 text-white text-[9px] font-black flex items-center justify-center flex-shrink-0">3</span>
            <Briefcase className="w-3 h-3 text-brand-500" /> Work Experience
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div><label className={labelCls}>Company</label><input value={form.company} onChange={upd("company")} className={inputCls} /></div>
            <div><label className={labelCls}>Your Job Title</label><input value={form.pastTitle} onChange={upd("pastTitle")} className={inputCls} /></div>
            <div><label className={labelCls}>Dates</label><input value={form.dates} onChange={upd("dates")} className={inputCls} /></div>
            <div className="sm:col-span-3"><label className={labelCls}>Key Achievements & Metrics</label><textarea value={form.achievements} onChange={upd("achievements")} rows={3} className={`${inputCls} resize-none`} /></div>
          </div>
        </div>
        {/* Skills & Education */}
        <div className={sectionCls}>
          <div className={sectionHeaderCls}>
            <span className="w-5 h-5 rounded-full bg-brand-600 text-white text-[9px] font-black flex items-center justify-center flex-shrink-0">4</span>
            <Award className="w-3 h-3 text-brand-500" /> Skills, Education & More
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><label className={labelCls}>Core Skills (comma-separated)</label><textarea value={form.skills} onChange={upd("skills")} rows={2} className={`${inputCls} resize-none`} /></div>
            <div><label className={labelCls}>Education</label><textarea value={form.education} onChange={upd("education")} rows={2} className={`${inputCls} resize-none`} /></div>
            <div><label className={labelCls}>Languages (e.g., English Native, Spanish B2)</label><input value={form.languages} onChange={upd("languages")} className={inputCls} /></div>
            <div><label className={labelCls}>Certifications</label><input value={form.certifications} onChange={upd("certifications")} className={inputCls} /></div>
            <div><label className={labelCls}>Projects & Portfolio</label><textarea value={form.projects} onChange={upd("projects")} rows={2} className={`${inputCls} resize-none`} /></div>
            <div><label className={labelCls}>Hobbies & Interests</label><input value={form.hobbies} onChange={upd("hobbies")} className={inputCls} /></div>
          </div>
        </div>

        {/* Generate Button */}
        <button onClick={generateCv} disabled={loading || !form.fullName.trim() || !form.jobTitle.trim()}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 text-white font-extrabold text-base shadow-xl shadow-brand-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 transition-all duration-300">
          <Sparkles className="w-5 h-5" />
          {loading ? <span className="animate-pulse">AI is building your professional CV…</span> : "Generate My Professional CV"}
        </button>
      </div>

      {/* Parse Error */}
      {parseError && !cvData && (
        <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm font-medium">
          ⚠️ {parseError}
        </div>
      )}

      {/* CV Output */}
      {cvData && (
        <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          {/* Toolbar */}
          <div className="cv-no-print flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 text-white shadow-xl">
            <span className="text-sm font-bold flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              {TEMPLATES.find(t => t.id === template)?.icon} {TEMPLATES.find(t => t.id === template)?.name} CV
            </span>
            <div className="flex flex-wrap gap-2">
              <button onClick={copyJson} className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors">
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy JSON"}
              </button>
              <button onClick={() => downloadFile(rawJson, `${cvData.name.replace(/\s+/g,"_")}_CV.json`, "application/json")} className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors">
                <Download className="w-3.5 h-3.5" /> JSON
              </button>
              <button onClick={downloadPng} disabled={pngLoading} className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 disabled:opacity-60 disabled:cursor-wait text-white text-xs font-semibold flex items-center gap-1.5 transition-colors">
                {pngLoading
                  ? <span className="flex items-center gap-1.5"><span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Capturing…</span>
                  : <span className="flex items-center gap-1.5"><ImageIcon className="w-3.5 h-3.5" /> PNG</span>
                }
              </button>
              <button onClick={printPdf} className="px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors">
                <Printer className="w-3.5 h-3.5" /> PDF / Print
              </button>
            </div>
          </div>

          {/* Switch Template Preview */}
          <div className="cv-no-print flex flex-wrap gap-2">
            {TEMPLATES.map(t => (
              <button key={t.id} onClick={() => setTemplate(t.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${template === t.id ? "bg-brand-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"}`}>
                {t.icon} {t.name}
              </button>
            ))}
          </div>

          {/* The CV Document */}
          <div ref={documentRef} className="cv-print-zone">
            {cvTemplates[template]}
          </div>
        </div>
      )}
    </div>
  );
}
