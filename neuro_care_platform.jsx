import { useState, useEffect, useRef, useCallback } from "react";

// ── Design tokens ────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:        #0a0f1a;
    --bg2:       #0f1625;
    --bg3:       #151d2e;
    --border:    rgba(99,140,220,0.12);
    --border2:   rgba(99,140,220,0.22);
    --accent:    #4f8ef7;
    --accent2:   #7eb8f7;
    --teal:      #2dd4bf;
    --coral:     #fb7185;
    --amber:     #fbbf24;
    --text:      #e8edf7;
    --text2:     #8fa3cc;
    --text3:     #4a5d80;
    --font-d:    'DM Serif Display', Georgia, serif;
    --font-s:    'DM Sans', system-ui, sans-serif;
    --r:         12px;
    --r2:        18px;
    --shadow:    0 2px 20px rgba(0,0,0,0.5);
  }

  html, body, #root { height: 100%; background: var(--bg); color: var(--text); font-family: var(--font-s); }

  /* Scrollbars */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 4px; }

  /* Layout shell */
  .shell { display: grid; grid-template-columns: 260px 1fr; min-height: 100vh; }

  /* Sidebar */
  .sidebar {
    background: var(--bg2);
    border-right: 1px solid var(--border);
    display: flex; flex-direction: column;
    padding: 0;
    position: sticky; top: 0; height: 100vh; overflow-y: auto;
  }
  .sidebar-logo {
    padding: 24px 20px 18px;
    border-bottom: 1px solid var(--border);
  }
  .logo-mark {
    display: flex; align-items: center; gap: 10px;
  }
  .logo-icon {
    width: 32px; height: 32px; border-radius: 8px;
    background: linear-gradient(135deg, var(--accent), var(--teal));
    display: flex; align-items: center; justify-content: center;
    font-size: 15px;
  }
  .logo-text { font-family: var(--font-d); font-size: 18px; color: var(--text); letter-spacing: -0.3px; }
  .logo-sub  { font-size: 11px; color: var(--text3); margin-top: 2px; letter-spacing: .03em; }

  .sidebar-section { padding: 18px 12px 8px; }
  .sidebar-label { font-size: 10px; font-weight: 500; letter-spacing: .1em; text-transform: uppercase; color: var(--text3); padding: 0 8px 8px; }
  .sidebar-nav { display: flex; flex-direction: column; gap: 2px; }
  .nav-item {
    display: flex; align-items: center; gap: 10px;
    padding: 9px 12px; border-radius: var(--r); cursor: pointer;
    font-size: 13.5px; color: var(--text2); transition: all .15s;
    border: none; background: none; text-align: left; width: 100%;
  }
  .nav-item:hover { background: rgba(79,142,247,.07); color: var(--text); }
  .nav-item.active { background: rgba(79,142,247,.14); color: var(--accent2); font-weight: 500; }
  .nav-icon { width: 16px; text-align: center; font-size: 14px; flex-shrink: 0; }
  .nav-badge { margin-left: auto; background: var(--accent); color: white; font-size: 10px; font-weight: 600; padding: 1px 6px; border-radius: 10px; }

  .patient-card {
    margin: 12px;
    padding: 14px;
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: var(--r2);
  }
  .patient-avatar {
    width: 40px; height: 40px; border-radius: 50%;
    background: linear-gradient(135deg, #2dd4bf33, #4f8ef744);
    border: 1.5px solid var(--teal);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-d); font-size: 16px; color: var(--teal);
    margin-bottom: 10px;
  }
  .patient-name { font-size: 14px; font-weight: 500; color: var(--text); }
  .patient-meta { font-size: 11px; color: var(--text3); margin-top: 2px; }
  .patient-tags { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 8px; }
  .ptag { font-size: 10px; padding: 2px 7px; border-radius: 20px; font-weight: 500; }
  .ptag-teal  { background: rgba(45,212,191,.12); color: var(--teal); }
  .ptag-coral { background: rgba(251,113,133,.12); color: var(--coral); }
  .ptag-amber { background: rgba(251,191,36,.10); color: var(--amber); }

  /* Main area */
  .main { display: flex; flex-direction: column; overflow: hidden; }

  /* Topbar */
  .topbar {
    background: var(--bg2); border-bottom: 1px solid var(--border);
    padding: 0 28px; height: 58px;
    display: flex; align-items: center; justify-content: space-between;
    position: sticky; top: 0; z-index: 10;
  }
  .topbar-title { font-family: var(--font-d); font-size: 20px; color: var(--text); }
  .topbar-sub { font-size: 12px; color: var(--text3); margin-top: 1px; }
  .topbar-actions { display: flex; align-items: center; gap: 10px; }
  .btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 7px 14px; border-radius: var(--r); font-size: 13px;
    cursor: pointer; transition: all .15s; border: none; font-family: var(--font-s);
  }
  .btn-ghost { background: none; color: var(--text2); border: 1px solid var(--border2); }
  .btn-ghost:hover { background: var(--bg3); color: var(--text); border-color: var(--accent); }
  .btn-primary { background: var(--accent); color: white; font-weight: 500; }
  .btn-primary:hover { background: #6aa3ff; transform: translateY(-1px); }
  .btn-danger { background: rgba(251,113,133,.15); color: var(--coral); border: 1px solid rgba(251,113,133,.25); }
  .btn-danger:hover { background: rgba(251,113,133,.25); }

  /* Content pages */
  .page { padding: 28px; flex: 1; overflow-y: auto; }

  /* Grid cards */
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }

  .card {
    background: var(--bg2); border: 1px solid var(--border);
    border-radius: var(--r2); padding: 20px;
  }
  .card-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 14px; }
  .card-title { font-size: 12px; font-weight: 500; letter-spacing: .06em; text-transform: uppercase; color: var(--text3); }
  .card-value { font-family: var(--font-d); font-size: 32px; color: var(--text); line-height: 1; margin: 4px 0; }
  .card-sub { font-size: 12px; color: var(--text3); }
  .card-delta { font-size: 11px; font-weight: 500; }
  .delta-up   { color: var(--teal); }
  .delta-down { color: var(--coral); }

  /* Stat icon */
  .stat-icon {
    width: 36px; height: 36px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center; font-size: 17px;
  }
  .si-blue   { background: rgba(79,142,247,.14); }
  .si-teal   { background: rgba(45,212,191,.14); }
  .si-coral  { background: rgba(251,113,133,.14); }
  .si-amber  { background: rgba(251,191,36,.12); }

  /* Progress bars */
  .progress-wrap { margin-top: 4px; }
  .progress-label { display: flex; justify-content: space-between; font-size: 11px; color: var(--text3); margin-bottom: 6px; }
  .progress-bar { height: 5px; background: var(--bg3); border-radius: 3px; overflow: hidden; }
  .progress-fill { height: 100%; border-radius: 3px; transition: width .6s cubic-bezier(.4,0,.2,1); }

  /* Timeline */
  .timeline { display: flex; flex-direction: column; gap: 0; }
  .tl-item { display: flex; gap: 14px; padding: 12px 0; border-bottom: 1px solid var(--border); }
  .tl-item:last-child { border-bottom: none; }
  .tl-dot-wrap { display: flex; flex-direction: column; align-items: center; flex-shrink: 0; padding-top: 3px; }
  .tl-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
  .tl-line { width: 1px; flex: 1; background: var(--border); margin-top: 4px; }
  .tl-content { flex: 1; }
  .tl-title { font-size: 13px; font-weight: 500; color: var(--text); margin-bottom: 2px; }
  .tl-desc  { font-size: 12px; color: var(--text2); line-height: 1.5; }
  .tl-time  { font-size: 11px; color: var(--text3); margin-top: 3px; }

  /* Section headings */
  .section-head { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 16px; }
  .section-title { font-family: var(--font-d); font-size: 20px; color: var(--text); }
  .section-link  { font-size: 12px; color: var(--accent); cursor: pointer; }
  .section-link:hover { text-decoration: underline; }

  /* Divider */
  .divider { height: 1px; background: var(--border); margin: 20px 0; }

  /* Assessment table */
  .assess-table { width: 100%; border-collapse: collapse; }
  .assess-table th { font-size: 11px; font-weight: 500; letter-spacing: .06em; text-transform: uppercase; color: var(--text3); padding: 8px 12px; text-align: left; border-bottom: 1px solid var(--border); }
  .assess-table td { padding: 11px 12px; font-size: 13px; color: var(--text2); border-bottom: 1px solid var(--border); }
  .assess-table tr:last-child td { border-bottom: none; }
  .assess-table tr:hover td { background: rgba(79,142,247,.04); }
  .score-badge { display: inline-block; padding: 2px 8px; border-radius: 6px; font-size: 11px; font-weight: 500; }
  .score-good { background: rgba(45,212,191,.12); color: var(--teal); }
  .score-mid  { background: rgba(251,191,36,.10); color: var(--amber); }
  .score-low  { background: rgba(251,113,133,.12); color: var(--coral); }

  /* ── AI Chat ─────────────────────────────────────────────────────────────── */
  .chat-shell {
    display: flex; flex-direction: column; height: calc(100vh - 58px);
  }
  .chat-context {
    background: var(--bg3); border-bottom: 1px solid var(--border);
    padding: 14px 28px;
    display: flex; align-items: center; gap: 14px; flex-wrap: wrap;
  }
  .ctx-chip {
    display: flex; align-items: center; gap: 6px;
    background: var(--bg2); border: 1px solid var(--border);
    border-radius: 20px; padding: 5px 12px; font-size: 12px; color: var(--text2);
  }
  .ctx-dot { width: 6px; height: 6px; border-radius: 50%; }
  .ctx-label { font-size: 11px; color: var(--text3); }

  .messages {
    flex: 1; overflow-y: auto; padding: 24px 28px;
    display: flex; flex-direction: column; gap: 20px;
  }
  .msg { display: flex; gap: 12px; max-width: 820px; }
  .msg.user { flex-direction: row-reverse; align-self: flex-end; }
  .msg-avatar {
    width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center; font-size: 14px;
    margin-top: 2px;
  }
  .msg-avatar.ai   { background: linear-gradient(135deg, var(--accent), var(--teal)); }
  .msg-avatar.user { background: linear-gradient(135deg, #6b4de6, var(--accent)); }
  .msg-body { flex: 1; }
  .msg-name { font-size: 11px; color: var(--text3); margin-bottom: 5px; }
  .msg.user .msg-name { text-align: right; }
  .msg-bubble {
    padding: 13px 16px; border-radius: 14px; font-size: 14px; line-height: 1.65; color: var(--text);
  }
  .msg-bubble.ai   { background: var(--bg3); border: 1px solid var(--border); border-radius: 3px 14px 14px 14px; }
  .msg-bubble.user { background: var(--accent); border-radius: 14px 3px 14px 14px; }
  .msg-bubble p { margin-bottom: 8px; }
  .msg-bubble p:last-child { margin-bottom: 0; }
  .msg-bubble strong { color: var(--accent2); font-weight: 500; }
  .msg-bubble code { background: rgba(79,142,247,.12); padding: 1px 5px; border-radius: 4px; font-size: 12px; }

  .typing-indicator { display: flex; gap: 5px; align-items: center; padding: 4px 0; }
  .typing-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--text3); animation: bounce .9s infinite; }
  .typing-dot:nth-child(2) { animation-delay: .15s; }
  .typing-dot:nth-child(3) { animation-delay: .30s; }
  @keyframes bounce { 0%,100%{transform:translateY(0)} 45%{transform:translateY(-5px)} }

  .chat-input-wrap {
    border-top: 1px solid var(--border);
    padding: 16px 28px;
    background: var(--bg2);
  }
  .quick-prompts { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; }
  .qp {
    font-size: 12px; padding: 5px 12px; border-radius: 20px;
    background: var(--bg3); border: 1px solid var(--border);
    color: var(--text2); cursor: pointer; transition: all .15s;
  }
  .qp:hover { border-color: var(--accent); color: var(--accent2); }
  .input-row { display: flex; gap: 10px; }
  .chat-textarea {
    flex: 1; background: var(--bg3); border: 1px solid var(--border2);
    border-radius: var(--r2); padding: 12px 16px;
    font-size: 14px; color: var(--text); font-family: var(--font-s);
    resize: none; outline: none; min-height: 52px; max-height: 160px;
    transition: border-color .2s;
  }
  .chat-textarea:focus { border-color: var(--accent); }
  .chat-textarea::placeholder { color: var(--text3); }
  .send-btn {
    width: 52px; height: 52px; border-radius: var(--r2);
    background: var(--accent); border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; transition: all .15s; flex-shrink: 0;
  }
  .send-btn:hover { background: #6aa3ff; transform: translateY(-1px); }
  .send-btn:disabled { background: var(--bg3); color: var(--text3); cursor: not-allowed; transform: none; }

  /* Protocol view */
  .protocol-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .pcard {
    background: var(--bg2); border: 1px solid var(--border);
    border-radius: var(--r2); overflow: hidden;
  }
  .pcard-head {
    padding: 14px 18px 12px;
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; gap: 10px;
  }
  .pcard-icon { font-size: 20px; }
  .pcard-title { font-size: 14px; font-weight: 500; color: var(--text); }
  .pcard-sub   { font-size: 11px; color: var(--text3); margin-top: 1px; }
  .pcard-body  { padding: 14px 18px; }
  .param-row { display: flex; justify-content: space-between; align-items: center; padding: 7px 0; border-bottom: 1px solid var(--border); font-size: 13px; }
  .param-row:last-child { border-bottom: none; }
  .param-key { color: var(--text3); }
  .param-val { color: var(--text); font-weight: 500; font-variant-numeric: tabular-nums; }

  /* SOAP note */
  .soap-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .soap-card {
    background: var(--bg2); border: 1px solid var(--border); border-radius: var(--r2);
    padding: 16px 18px;
  }
  .soap-letter {
    font-family: var(--font-d); font-size: 28px; line-height: 1;
    margin-bottom: 6px;
  }
  .soap-title { font-size: 11px; font-weight: 500; letter-spacing: .08em; text-transform: uppercase; color: var(--text3); margin-bottom: 10px; }
  .soap-content { font-size: 13px; color: var(--text2); line-height: 1.7; }
  .soap-content ul { padding-left: 14px; }
  .soap-content li { margin-bottom: 3px; }

  /* Tag strip */
  .tag-strip { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px; }
  .tag { font-size: 11px; font-weight: 500; padding: 3px 9px; border-radius: 6px; }

  /* Trend mini-chart */
  .mini-chart { display: flex; align-items: flex-end; gap: 3px; height: 40px; margin-top: 10px; }
  .bar { flex: 1; border-radius: 3px 3px 0 0; transition: opacity .15s; }
  .bar:hover { opacity: .7; }

  /* Alert strip */
  .alert-strip {
    display: flex; align-items: flex-start; gap: 10px;
    padding: 12px 16px; border-radius: var(--r); margin-bottom: 12px;
    border: 1px solid;
  }
  .alert-warn { background: rgba(251,191,36,.07); border-color: rgba(251,191,36,.25); }
  .alert-info { background: rgba(79,142,247,.07); border-color: rgba(79,142,247,.2); }
  .alert-icon { font-size: 15px; flex-shrink: 0; margin-top: 1px; }
  .alert-text { font-size: 13px; color: var(--text2); line-height: 1.5; }
  .alert-text strong { color: var(--text); }

  /* Scan result */
  .scan-frame {
    background: var(--bg3); border: 1px solid var(--border); border-radius: var(--r2);
    aspect-ratio: 4/3; display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden;
  }
  .scan-placeholder { text-align: center; color: var(--text3); font-size: 13px; }
  .scan-grid { position: absolute; inset: 0; opacity: .04;
    background-image: linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px);
    background-size: 30px 30px;
  }

  /* Fade-in animation */
  @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  .fade-in { animation: fadeUp .3s ease forwards; }

  /* Pulse dot */
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.35} }
  .pulse { animation: pulse 2s infinite; }
`;

// ── Mock patient data ─────────────────────────────────────────────────────────
const PATIENT = {
  name: "김민준", initials: "김", age: 58, sex: "남",
  onset: "2024-09-14",
  diagnosis: "좌측 MCA 허혈성 뇌졸중",
  lesion: "좌측 기저핵 및 내포",
  nihss_initial: 14, nihss_current: 7,
  fm_initial: 28, fm_current: 52,
  barthel: 65,
  phase: "아급성기 (발병 후 6개월)",
  meds: ["Aspirin 100mg", "Atorvastatin 40mg", "Amlodipine 5mg"],
  vitals: { bp: "138/86", hr: 72, spo2: 97, temp: 36.5 },
  tags: ["rTMS 진행중", "BCI 훈련", "세포치료 대기"]
};

const VISIT_SUMMARY = `
**방문 일시:** 2025년 3월 19일 (발병 후 6개월째)

**주요 소견:** Fugl-Meyer 운동점수 28→52로 24점 향상 (85.7% MID 초과). 우상지 근위부 분리 운동 획득, 원위부 미세운동 부분 회복. 보행 보조기 없이 10m 독립 보행 가능.

**검사 결과:** DTI FA값 0.42→0.39 (병변 측), rs-fMRI 병변측 M1 활성화 13% 증가. EEG μ리듬 코히런스 개선.

**치료 계획:** rTMS 2단계(10Hz 촉진) 4주 연장. BCI 세션 주3→주4회 증가. iPSC-NPC 이식 Day-21 (예정 04-09). BDNF 혈장 측정 반복.
`;

// ── System prompt for AI ──────────────────────────────────────────────────────
const SYSTEM_PROMPT = `당신은 뇌졸중 재활 전문 AI 보조 의사입니다. 환자 김민준 (58세 남, 좌측 MCA 허혈성 뇌졸중, 발병 후 6개월)의 재활 연구 케어를 지원합니다.

## 환자 정보
- 진단: 좌측 MCA 허혈성 뇌졸중 (2024-09-14)
- 병변: 좌측 기저핵 및 내포
- NIHSS: 초기 14점 → 현재 7점
- Fugl-Meyer 운동점수: 초기 28 → 현재 52점
- Barthel 지수: 65점
- 현재 약물: Aspirin 100mg, Atorvastatin 40mg, Amlodipine 5mg
- 혈압: 138/86 mmHg, HR: 72회/분

## 현재 재활 프로토콜
- rTMS: 병변측 M1 10Hz 촉진 (20세션/4주 완료, 2단계 진행중)
- BCI: 64ch EEG + FES 연동, 운동 상상 기반 (주3회 × 8주)
- 세포치료: iPSC-NPC 이식 Day-21 (2025-04-09 예정)

## 최근 방문 요약
${VISIT_SUMMARY}

## 지침
- 근거 중심의 신경재활 정보를 제공하세요
- 임상 결정은 담당의와 상의 필요함을 명시하세요
- 환자가 이해할 수 있는 언어로 설명하세요
- 위험 신호 발생 시 즉시 의료진 연락을 권고하세요
- 답변은 한국어로 제공하세요`;

// ── Quick prompts ─────────────────────────────────────────────────────────────
const QUICK_PROMPTS = [
  "rTMS 치료 효과를 어떻게 평가하나요?",
  "줄기세포 이식 전 주의사항은?",
  "BCI 세션 중 두통이 생겼어요",
  "현재 FM 점수의 의미는?",
  "다음 단계 치료 일정을 알려주세요",
];

// ── Mini bar chart ────────────────────────────────────────────────────────────
function MiniChart({ values, color }) {
  const max = Math.max(...values);
  return (
    <div className="mini-chart">
      {values.map((v, i) => (
        <div key={i} className="bar" style={{ height: `${(v / max) * 100}%`, background: color, opacity: i === values.length - 1 ? 1 : 0.45 }} />
      ))}
    </div>
  );
}

// ── Progress row ─────────────────────────────────────────────────────────────
function ProgressRow({ label, value, max, color }) {
  return (
    <div className="progress-wrap">
      <div className="progress-label"><span>{label}</span><span style={{ color: color }}>{value}/{max}</span></div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${(value / max) * 100}%`, background: color }} />
      </div>
    </div>
  );
}

// ── Dashboard page ────────────────────────────────────────────────────────────
function Dashboard({ setPage }) {
  return (
    <div className="page fade-in">
      <div className="section-head">
        <div><div className="section-title">진료 대시보드</div><div style={{ fontSize: 13, color: "var(--text3)", marginTop: 3 }}>최종 업데이트: 2025-03-19</div></div>
        <button className="btn btn-primary" onClick={() => setPage("chat")}>🧠 AI 상담 시작</button>
      </div>

      {/* Alerts */}
      <div className="alert-strip alert-warn">
        <div className="alert-icon">⚠️</div>
        <div className="alert-text"><strong>iPSC-NPC 이식 D-21:</strong> 2025-04-09 예정. 혈액검사(CBC, LFT, 면역패널) 사전 제출 기한: 2025-04-02.</div>
      </div>
      <div className="alert-strip alert-info">
        <div className="alert-icon">ℹ️</div>
        <div className="alert-text"><strong>rTMS 2단계 진행중:</strong> 10Hz 촉진 프로토콜 8/20 세션 완료. 다음 세션: 2025-03-21 09:30.</div>
      </div>

      {/* Stat cards */}
      <div className="grid-4" style={{ marginBottom: 18 }}>
        {[
          { label: "NIHSS", value: 7, sub: "초기 14점", delta: "-7", up: true, icon: "🧠", ic: "si-blue", color: "var(--accent)" },
          { label: "Fugl-Meyer", value: 52, sub: "초기 28점", delta: "+24", up: true, icon: "💪", ic: "si-teal", color: "var(--teal)" },
          { label: "Barthel 지수", value: 65, sub: "목표 85+", delta: "+12", up: true, icon: "🏃", ic: "si-amber", color: "var(--amber)" },
          { label: "혈압 (수축기)", value: 138, sub: "mmHg", delta: "-6", up: true, icon: "❤️", ic: "si-coral", color: "var(--coral)" },
        ].map((s, i) => (
          <div className="card" key={i}>
            <div className="card-header">
              <span className="card-title">{s.label}</span>
              <div className={`stat-icon ${s.ic}`}>{s.icon}</div>
            </div>
            <div className="card-value" style={{ color: s.color }}>{s.value}</div>
            <div className="card-sub">{s.sub}</div>
            <div className={`card-delta ${s.up ? "delta-up" : "delta-down"}`} style={{ marginTop: 6 }}>{s.delta} 이전 대비</div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ marginBottom: 18 }}>
        {/* FM trend */}
        <div className="card">
          <div className="card-header"><span className="card-title">Fugl-Meyer 추이 (월별)</span></div>
          <MiniChart values={[28, 34, 41, 46, 49, 52]} color="var(--teal)" />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text3)", marginTop: 6 }}>
            {["10월", "11월", "12월", "1월", "2월", "3월"].map(m => <span key={m}>{m}</span>)}
          </div>
          <ProgressRow label="목표 달성률 (최대 66점)" value={52} max={66} color="var(--teal)" />
        </div>

        {/* Protocol progress */}
        <div className="card">
          <div className="card-header"><span className="card-title">재활 프로토콜 진행률</span></div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 4 }}>
            <ProgressRow label="rTMS (2단계 20세션)" value={8} max={20} color="var(--accent)" />
            <ProgressRow label="BCI 훈련 (30세션)" value={19} max={30} color="var(--coral)" />
            <ProgressRow label="세포치료 준비" value={3} max={5} color="var(--amber)" />
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="card">
        <div className="card-header"><span className="card-title">최근 임상 이벤트</span></div>
        <div className="timeline">
          {[
            { dot: "var(--teal)", title: "Fugl-Meyer 평가 — 52점 기록", desc: "운동 기능 목표의 78.8% 달성. 상지 근위부 분리운동 획득 확인.", time: "2025-03-19" },
            { dot: "var(--accent)", title: "rTMS 세션 #8 완료 (2단계)", desc: "10Hz, 1500 펄스. 경두개 TMS 내성 양호. 두통 없음.", time: "2025-03-18" },
            { dot: "var(--coral)", title: "BCI 훈련 세션 #19", desc: "μ리듬 ERD 디코딩 정확도 81%. FES 반응 시간 개선 (평균 38ms).", time: "2025-03-17" },
            { dot: "var(--amber)", title: "혈장 BDNF 측정", desc: "BDNF 18.4 ng/mL (기저선 대비 +34%). 세포치료 대기 기간 중 모니터링.", time: "2025-03-15" },
            { dot: "var(--text3)", title: "rs-fMRI 촬영", desc: "병변측 M1 활성화 13% 증가. SMC-M1 기능적 연결성 회복 신호.", time: "2025-03-12" },
          ].map((e, i) => (
            <div className="tl-item" key={i}>
              <div className="tl-dot-wrap">
                <div className="tl-dot" style={{ background: e.dot }} />
                {i < 4 && <div className="tl-line" />}
              </div>
              <div className="tl-content">
                <div className="tl-title">{e.title}</div>
                <div className="tl-desc">{e.desc}</div>
                <div className="tl-time">{e.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Protocol page ─────────────────────────────────────────────────────────────
function Protocol() {
  return (
    <div className="page fade-in">
      <div className="section-head">
        <div className="section-title">재활 프로토콜</div>
      </div>

      <div className="protocol-grid">
        {/* rTMS */}
        <div className="pcard">
          <div className="pcard-head" style={{ borderLeft: "3px solid var(--accent)" }}>
            <div className="pcard-icon">⚡</div>
            <div>
              <div className="pcard-title">반복 경두개 자기자극 (rTMS)</div>
              <div className="pcard-sub">2단계 · 진행중 8/20세션</div>
            </div>
          </div>
          <div className="pcard-body">
            {[
              ["표적 부위", "병변측 M1 (좌반구)"],
              ["주파수", "10 Hz (촉진)"],
              ["강도", "RMT 110%"],
              ["펄스/세션", "1,500"],
              ["일정", "주5회 × 4주"],
              ["코일", "8자형 70mm"],
              ["항법 유도", "신경항법 fMRI 기반"],
            ].map(([k, v]) => (
              <div className="param-row" key={k}>
                <span className="param-key">{k}</span>
                <span className="param-val">{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* BCI */}
        <div className="pcard">
          <div className="pcard-head" style={{ borderLeft: "3px solid var(--coral)" }}>
            <div className="pcard-icon">🧬</div>
            <div>
              <div className="pcard-title">뇌-컴퓨터 인터페이스 (BCI)</div>
              <div className="pcard-sub">EEG-FES 연동 · 19/30세션</div>
            </div>
          </div>
          <div className="pcard-body">
            {[
              ["채널", "64ch 고밀도 EEG"],
              ["신호", "μ/β 리듬 ERD"],
              ["분류기", "Riemannian Geometry"],
              ["피드백 지연", "<50 ms"],
              ["세션 시간", "45분/회"],
              ["일정", "주4회 × 10주"],
              ["VR 환경", "동작관찰 + 운동상상"],
            ].map(([k, v]) => (
              <div className="param-row" key={k}>
                <span className="param-key">{k}</span>
                <span className="param-val">{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cell therapy */}
        <div className="pcard">
          <div className="pcard-head" style={{ borderLeft: "3px solid var(--amber)" }}>
            <div className="pcard-icon">🔬</div>
            <div>
              <div className="pcard-title">iPSC 유래 신경 전구세포 이식</div>
              <div className="pcard-sub">D-21 · 2025-04-09 예정</div>
            </div>
          </div>
          <div className="pcard-body">
            {[
              ["세포 종류", "iPSC-NPC (자가)"],
              ["투여 경로", "입체정위적 주입"],
              ["용량 코호트", "1×10⁶ 세포"],
              ["좌표 수", "3–5개"],
              ["면역억제", "Tacrolimus 3개월"],
              ["추적 MRI", "4, 12, 24주"],
              ["표지", "철 나노입자 (7T MRI)"],
            ].map(([k, v]) => (
              <div className="param-row" key={k}>
                <span className="param-key">{k}</span>
                <span className="param-val">{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Assessment */}
        <div className="pcard">
          <div className="pcard-head" style={{ borderLeft: "3px solid var(--teal)" }}>
            <div className="pcard-icon">📊</div>
            <div>
              <div className="pcard-title">평가 일정 및 바이오마커</div>
              <div className="pcard-sub">4 · 12 · 24주 · 12개월</div>
            </div>
          </div>
          <div className="pcard-body">
            {[
              ["1차 변수", "Fugl-Meyer 변화량"],
              ["2차 변수", "NIHSS, Barthel, DTI"],
              ["fMRI", "rs-fMRI M1 활성화"],
              ["혈장 마커", "BDNF, NfL"],
              ["EEG 지표", "μ코히런스"],
              ["PET", "시냅스 밀도 (SV2A)"],
              ["CSF", "시냅스 단백질"],
            ].map(([k, v]) => (
              <div className="param-row" key={k}>
                <span className="param-key">{k}</span>
                <span className="param-val">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SOAP page ─────────────────────────────────────────────────────────────────
function SoapNote() {
  return (
    <div className="page fade-in">
      <div className="section-head">
        <div>
          <div className="section-title">AI 방문 요약 (SOAP)</div>
          <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 3 }}>2025-03-19 진료 기록 · Claude 생성 · 의사 검토 필요</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-ghost">📄 PDF 내보내기</button>
          <button className="btn btn-primary">✏️ 편집</button>
        </div>
      </div>

      <div className="soap-grid">
        <div className="soap-card">
          <div className="soap-letter" style={{ color: "var(--accent)" }}>S</div>
          <div className="soap-title">Subjective — 주관적 소견</div>
          <div className="soap-content">
            <ul>
              <li>우상지 근력 및 움직임 범위 주관적으로 개선됨 보고</li>
              <li>보행 시 보조기구 필요성 감소, 계단 보행 시도 가능</li>
              <li>rTMS 세션 후 경미한 두통 1회 (2/10), 자연 소실</li>
              <li>BCI 훈련에 대한 동기부여 높음, 가정 훈련 준수율 85%</li>
              <li>줄기세포 이식에 대한 기대감과 일부 불안감 동시 표현</li>
            </ul>
          </div>
        </div>

        <div className="soap-card">
          <div className="soap-letter" style={{ color: "var(--teal)" }}>O</div>
          <div className="soap-title">Objective — 객관적 소견</div>
          <div className="soap-content">
            <ul>
              <li>Fugl-Meyer 상지: 52/66 (이전 49, +3)</li>
              <li>NIHSS: 7점 (이전 8점, -1)</li>
              <li>BP 138/86 mmHg, HR 72/min, SpO₂ 97%</li>
              <li>MRC grade: 상지 근위부 4/5, 원위부 3/5</li>
              <li>10MWT: 14.2초 (이전 16.8초), 보조기구 없음</li>
              <li>EEG μ리듬 ERD 정확도: 81%</li>
            </ul>
          </div>
        </div>

        <div className="soap-card">
          <div className="soap-letter" style={{ color: "var(--amber)" }}>A</div>
          <div className="soap-title">Assessment — 평가</div>
          <div className="soap-content">
            <ul>
              <li>rTMS 2단계 치료에 양호한 반응성 지속</li>
              <li>BCI 훈련을 통한 피질 재조직화 진행 중</li>
              <li>BDNF 상승 (18.4 ng/mL)은 세포 이식 수용 환경 긍정적</li>
              <li>rs-fMRI 병변측 M1 활성화 증가는 회로 재생 신호</li>
              <li>iPSC-NPC 이식 전 면역 프로파일 재확인 필요</li>
            </ul>
          </div>
        </div>

        <div className="soap-card">
          <div className="soap-letter" style={{ color: "var(--coral)" }}>P</div>
          <div className="soap-title">Plan — 계획</div>
          <div className="soap-content">
            <ul>
              <li>rTMS 2단계 연장: 추가 4주 (세션 9→20)</li>
              <li>BCI 세션 주3→주4회로 증가</li>
              <li>혈액검사 2025-04-02 제출 (CBC, LFT, 면역패널)</li>
              <li>iPSC-NPC 이식 Day-21: 2025-04-09</li>
              <li>BDNF/NfL 추적 혈장 채취: 격주</li>
              <li>다음 외래: 2025-04-02 (이식 전 최종 평가)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="divider" />

      <div className="section-head" style={{ marginBottom: 12 }}>
        <div className="section-title" style={{ fontSize: 16 }}>평가 지표 현황</div>
      </div>
      <div className="card">
        <table className="assess-table">
          <thead>
            <tr>
              <th>평가 도구</th><th>초기 점수</th><th>현재 점수</th><th>변화</th><th>목표</th><th>상태</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Fugl-Meyer (상지)", "28", "52", "+24", "60", "good"],
              ["NIHSS", "14", "7", "-7", "≤5", "mid"],
              ["Barthel 지수", "53", "65", "+12", "85", "mid"],
              ["10MWT (초)", "—", "14.2", "—", "<12.0", "mid"],
              ["EEG ERD 정확도", "58%", "81%", "+23%", ">85%", "good"],
              ["혈장 BDNF", "13.7", "18.4 ng/mL", "+34%", ">20", "mid"],
            ].map(([name, ini, cur, chg, goal, sc]) => (
              <tr key={name}>
                <td style={{ color: "var(--text)" }}>{name}</td>
                <td>{ini}</td>
                <td style={{ color: "var(--text)" }}>{cur}</td>
                <td style={{ color: chg.startsWith("+") ? "var(--teal)" : "var(--coral)" }}>{chg}</td>
                <td>{goal}</td>
                <td><span className={`score-badge score-${sc}`}>{sc === "good" ? "양호" : sc === "mid" ? "진행중" : "주의"}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Imaging page ──────────────────────────────────────────────────────────────
function Imaging() {
  return (
    <div className="page fade-in">
      <div className="section-head">
        <div className="section-title">영상 데이터</div>
        <button className="btn btn-ghost">📁 전체 목록</button>
      </div>
      <div className="grid-2" style={{ marginBottom: 18 }}>
        {[
          { title: "rs-fMRI 연결성 맵", date: "2025-03-12", note: "병변측 M1 활성화 +13%", color: "var(--accent)" },
          { title: "DTI 백질 추적", date: "2025-03-12", note: "CST FA값 0.39 (기저선 0.42)", color: "var(--teal)" },
          { title: "구조적 MRI (T1)", date: "2025-02-15", note: "병변 크기 변화 없음", color: "var(--text3)" },
          { title: "7T MRI (세포 추적용)", date: "예정 D+4", note: "이식 후 철 나노입자 모니터링", color: "var(--amber)" },
        ].map((img, i) => (
          <div className="card" key={i} style={{ cursor: "pointer" }}>
            <div className="scan-frame">
              <div className="scan-grid" />
              <div className="scan-placeholder">
                <div style={{ fontSize: 32, marginBottom: 8 }}>🧠</div>
                <div>{img.title}</div>
                <div style={{ marginTop: 4, fontSize: 11, color: "var(--text3)" }}>{img.date}</div>
              </div>
              <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(0,0,0,.6)", padding: "3px 8px", borderRadius: 6, fontSize: 11, color: img.color }}>
                {img.date}
              </div>
            </div>
            <div style={{ marginTop: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text)", marginBottom: 3 }}>{img.title}</div>
              <div style={{ fontSize: 12, color: "var(--text3)" }}>{img.note}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="card-header"><span className="card-title">EEG 파워 스펙트럼 (최근 세션)</span></div>
        <div style={{ padding: "10px 0" }}>
          {[
            { band: "δ (1–4 Hz)", pct: 18, color: "var(--text3)" },
            { band: "θ (4–8 Hz)", pct: 22, color: "var(--text2)" },
            { band: "α / μ (8–13 Hz)", pct: 41, color: "var(--accent)" },
            { band: "β (13–30 Hz)", pct: 31, color: "var(--teal)" },
            { band: "γ (30–100 Hz)", pct: 12, color: "var(--coral)" },
          ].map(({ band, pct, color }) => (
            <div key={band} style={{ display: "flex", alignItems: "center", gap: 12, padding: "6px 0" }}>
              <span style={{ fontSize: 12, color: "var(--text2)", width: 170, flexShrink: 0 }}>{band}</span>
              <div style={{ flex: 1, height: 8, background: "var(--bg3)", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${pct * 2}%`, background: color, borderRadius: 4 }} />
              </div>
              <span style={{ fontSize: 12, color, width: 35, textAlign: "right" }}>{pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── AI Chat page ──────────────────────────────────────────────────────────────
function ChatPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `안녕하세요, 김민준 환자 케어 AI 어시스턴트입니다. 저는 환자의 진료 기록, 현재 재활 프로토콜(rTMS, BCI, 세포치료), 그리고 최신 방문 요약에 기반하여 질문에 답변합니다.

**현재 케어 상태:**
- Fugl-Meyer 52/66 (초기 28, +24점 향상)
- rTMS 2단계 진행중 (8/20세션)
- iPSC-NPC 이식 **D-21** (2025-04-09)

무엇이든 물어보세요.`
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const taRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  const autoResize = () => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 160) + "px";
  };

  const send = useCallback(async (text) => {
    const q = (text || input).trim();
    if (!q || loading) return;
    setInput("");
    if (taRef.current) taRef.current.style.height = "52px";

    const userMsg = { role: "user", content: q };
    const history = [...messages, userMsg];
    setMessages(history);
    setLoading(true);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: history.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "응답을 가져올 수 없습니다.";
      setMessages([...history, { role: "assistant", content: reply }]);
    } catch (e) {
      setMessages([...history, { role: "assistant", content: "⚠️ 네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요." }]);
    } finally {
      setLoading(false);
    }
  }, [input, messages, loading]);

  const renderContent = (text) => {
    return text.split("\n").map((line, i) => {
      const bold = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      const code = bold.replace(/`(.*?)`/g, "<code>$1</code>");
      return line ? <p key={i} dangerouslySetInnerHTML={{ __html: code }} /> : null;
    });
  };

  return (
    <div className="chat-shell">
      {/* Context chips */}
      <div className="chat-context">
        <span className="ctx-label">컨텍스트:</span>
        <div className="ctx-chip"><div className="ctx-dot pulse" style={{ background: "var(--teal)" }} /><span>방문 요약 2025-03-19</span></div>
        <div className="ctx-chip"><div className="ctx-dot" style={{ background: "var(--accent)" }} /><span>rTMS 프로토콜</span></div>
        <div className="ctx-chip"><div className="ctx-dot" style={{ background: "var(--coral)" }} /><span>BCI 훈련 기록</span></div>
        <div className="ctx-chip"><div className="ctx-dot" style={{ background: "var(--amber)" }} /><span>세포치료 계획</span></div>
        <div className="ctx-chip"><div className="ctx-dot" style={{ background: "var(--text3)" }} /><span>바이오마커</span></div>
      </div>

      {/* Messages */}
      <div className="messages">
        {messages.map((m, i) => (
          <div className={`msg ${m.role}`} key={i}>
            <div className={`msg-avatar ${m.role === "assistant" ? "ai" : "user"}`}>
              {m.role === "assistant" ? "🧠" : "김"}
            </div>
            <div className="msg-body">
              <div className="msg-name">{m.role === "assistant" ? "NeuroAI 케어 어시스턴트" : "김민준 환자"}</div>
              <div className={`msg-bubble ${m.role === "assistant" ? "ai" : "user"}`}>
                {renderContent(m.content)}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="msg">
            <div className="msg-avatar ai">🧠</div>
            <div className="msg-body">
              <div className="msg-name">NeuroAI 케어 어시스턴트</div>
              <div className="msg-bubble ai">
                <div className="typing-indicator">
                  <div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" />
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div className="chat-input-wrap">
        <div className="quick-prompts">
          {QUICK_PROMPTS.map(p => (
            <button key={p} className="qp" onClick={() => send(p)}>{p}</button>
          ))}
        </div>
        <div className="input-row">
          <textarea
            ref={taRef}
            className="chat-textarea"
            placeholder="방문 기록, 재활 프로토콜, 증상에 대해 질문하세요..."
            value={input}
            onChange={e => { setInput(e.target.value); autoResize(); }}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            rows={1}
          />
          <button className="send-btn" onClick={() => send()} disabled={loading || !input.trim()}>
            {loading ? "⌛" : "↑"}
          </button>
        </div>
        <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 8 }}>
          ⚠️ AI 정보는 참고용입니다. 임상 결정은 반드시 담당의와 상의하세요.
        </div>
      </div>
    </div>
  );
}

// ── App shell ─────────────────────────────────────────────────────────────────
const PAGES = [
  { id: "dashboard", label: "대시보드", icon: "📊" },
  { id: "protocol",  label: "재활 프로토콜", icon: "⚡" },
  { id: "soap",      label: "SOAP 노트",  icon: "📋" },
  { id: "imaging",   label: "영상 데이터", icon: "🧠" },
  { id: "chat",      label: "AI 상담",    icon: "💬", badge: "AI" },
];

export default function App() {
  const [page, setPage] = useState("dashboard");

  const renderPage = () => {
    switch (page) {
      case "dashboard": return <Dashboard setPage={setPage} />;
      case "protocol":  return <Protocol />;
      case "soap":      return <SoapNote />;
      case "imaging":   return <Imaging />;
      case "chat":      return <ChatPage />;
      default:          return <Dashboard setPage={setPage} />;
    }
  };

  const titles = {
    dashboard: { title: "김민준 환자 케어", sub: "좌측 MCA 허혈성 뇌졸중 · 발병 후 6개월" },
    protocol:  { title: "재활 프로토콜", sub: "rTMS · BCI · 세포치료 통합 프로토콜" },
    soap:      { title: "AI 방문 요약", sub: "2025-03-19 최신 진료 기록" },
    imaging:   { title: "영상 데이터", sub: "MRI · fMRI · EEG 데이터" },
    chat:      { title: "AI 케어 상담", sub: "방문 컨텍스트 기반 AI 어시스턴트" },
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="shell">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-mark">
              <div className="logo-icon">🧠</div>
              <div>
                <div className="logo-text">NeuroCare</div>
                <div className="logo-sub">뇌졸중 재활 연구 플랫폼</div>
              </div>
            </div>
          </div>

          {/* Patient card */}
          <div style={{ padding: "14px 12px 0" }}>
            <div className="patient-card">
              <div className="patient-avatar">{PATIENT.initials}</div>
              <div className="patient-name">{PATIENT.name}</div>
              <div className="patient-meta">{PATIENT.age}세 · {PATIENT.sex} · {PATIENT.phase}</div>
              <div className="patient-meta" style={{ marginTop: 3 }}>{PATIENT.diagnosis}</div>
              <div className="patient-tags">
                {PATIENT.tags.map(t => (
                  <span key={t} className={`ptag ${t.includes("rTMS") ? "ptag-teal" : t.includes("BCI") ? "ptag-coral" : "ptag-amber"}`}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Nav */}
          <div className="sidebar-section" style={{ flex: 1 }}>
            <div className="sidebar-label">메뉴</div>
            <nav className="sidebar-nav">
              {PAGES.map(p => (
                <button key={p.id} className={`nav-item ${page === p.id ? "active" : ""}`} onClick={() => setPage(p.id)}>
                  <span className="nav-icon">{p.icon}</span>
                  <span>{p.label}</span>
                  {p.badge && <span className="nav-badge">{p.badge}</span>}
                </button>
              ))}
            </nav>
          </div>

          {/* Vitals strip */}
          <div style={{ padding: "12px", borderTop: "1px solid var(--border)" }}>
            <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 8 }}>활력징후</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              {[
                { label: "혈압", value: PATIENT.vitals.bp, color: "var(--coral)" },
                { label: "맥박", value: `${PATIENT.vitals.hr}/분`, color: "var(--accent)" },
                { label: "SpO₂", value: `${PATIENT.vitals.spo2}%`, color: "var(--teal)" },
                { label: "체온", value: `${PATIENT.vitals.temp}°C`, color: "var(--amber)" },
              ].map(v => (
                <div key={v.label} style={{ background: "var(--bg3)", borderRadius: 8, padding: "7px 10px" }}>
                  <div style={{ fontSize: 10, color: "var(--text3)" }}>{v.label}</div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: v.color, marginTop: 2 }}>{v.value}</div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="main">
          <header className="topbar">
            <div>
              <div className="topbar-title">{titles[page]?.title}</div>
              <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 2 }}>{titles[page]?.sub}</div>
            </div>
            <div className="topbar-actions">
              <button className="btn btn-ghost">📤 공유</button>
              <button className="btn btn-ghost" onClick={() => setPage("chat")}>🧠 AI 상담</button>
            </div>
          </header>
          {renderPage()}
        </div>
      </div>
    </>
  );
}
