<div align="center">

# 🧠 NeuroCare

**뇌졸중 재활 연구 플랫폼 · Stroke Rehabilitation Research Platform**

*AI-Integrated · Open Source · For the Public Good*

[![License: MIT + Public Good](https://img.shields.io/badge/License-MIT_%2B_Public_Good-2563EB?style=flat-square)](LICENSE)
[![Public Good](https://img.shields.io/badge/Purpose-Public_Good_Only-059669?style=flat-square)](#공익적-활용-원칙--principles-of-public-good-use)
[![Powered by Claude](https://img.shields.io/badge/AI-Claude_Sonnet-7C3AED?style=flat-square)](https://anthropic.com)
[![React](https://img.shields.io/badge/Frontend-React_18-61DAFB?style=flat-square)](https://react.dev)

---

> ⚕️ **공익적 목적 선언 · Public Good Declaration**
>
> 본 플랫폼은 **학술 연구, 의료 교육, 비영리 재활 목적**에 한해 무상으로 사용할 수 있습니다.
> This platform is freely available for **academic research, medical education, and non-profit rehabilitation** purposes only.

</div>

---

## 목차 · Table of Contents

1. [프로젝트 개요 · Overview](#1-프로젝트-개요--project-overview)
2. [공익적 활용 원칙 · Public Good](#2-공익적-활용-원칙--principles-of-public-good-use)
3. [주요 기능 · Features](#3-주요-기능--key-features)
4. [기술 스택 · Tech Stack](#4-기술-스택--technology-stack)
5. [설치 및 실행 · Installation](#5-설치-및-실행--installation--setup)
6. [시스템 아키텍처 · Architecture](#6-시스템-아키텍처--system-architecture)
7. [연구 프로토콜 · Research Protocol](#7-연구-프로토콜-개요--research-protocol-overview)
8. [안전성 및 윤리 · Safety & Ethics](#8-안전성-및-윤리--safety--ethics)
9. [인용 및 기여 · Citation](#9-인용-및-기여--citation--contributing)
10. [연락처 · Contact](#10-연락처-및-지원--contact--support)

---

## 1. 프로젝트 개요 · Project Overview

NeuroCare는 뇌졸중 환자의 신경 회로 재생을 지원하는 **AI 통합 임상 연구 플랫폼**입니다. 비침습적 뇌자극(rTMS/tDCS), 뇌-컴퓨터 인터페이스(BCI), 줄기세포 치료 세 가지 접근법을 단일 인터페이스에서 통합하여 연구자와 임상의가 환자 데이터를 실시간으로 관리하고 분석할 수 있습니다.

NeuroCare is an **AI-integrated clinical research platform** supporting neural circuit regeneration for stroke patients. It unifies three therapeutic approaches — non-invasive brain stimulation (rTMS/tDCS), brain-computer interface (BCI), and stem cell therapy — enabling researchers and clinicians to manage and analyze patient data in real time within a single interface.

**핵심 목표 · Core Mission**

- 🔬 뇌졸중 후 신경 가소성 극대화를 위한 데이터 기반 재활 최적화
  *Evidence-based rehabilitation optimization to maximize post-stroke neuroplasticity*
- 🤖 AI 기반 개인 맞춤형 치료 프로토콜 생성 및 SOAP 노트 자동화
  *AI-powered personalized treatment protocol generation and SOAP note automation*
- 🌐 오픈소스 공개를 통한 글로벌 뇌졸중 재활 연구 접근성 향상
  *Improving global stroke rehabilitation research accessibility through open-source release*

---

## 2. 공익적 활용 원칙 · Principles of Public Good Use

> 🛡️ 본 프로젝트는 상업적 이익이 아닌 공공 의료 발전을 위해 설계되었습니다.
> This project is designed for the advancement of public healthcare, not commercial profit.

### ✅ 허용 용도 · Permitted Use

| 용도 · Use Case | 설명 (한국어) | Description (EN) |
|---|---|---|
| 학술 연구 | 비영리 대학·연구소의 뇌졸중 재활 연구 | Non-profit academic stroke rehabilitation research |
| 의료 교육 | 의과대학, 간호대학, 재활의학 전공 교육 | Medical/nursing school education |
| 공공 의료 | 국공립 병원 및 공공 재활센터 임상 지원 | Public hospital and rehabilitation center support |
| NGO 협력 | 국제 의료 NGO·WHO 프로그램 연계 | International medical NGO and WHO programs |
| 오픈소스 기여 | 코드 개선, 버그 수정, 번역 기여 | Code improvement, bug fixes, translations |

### 🚫 제한 용도 · Restricted Use

- 영리 목적의 소프트웨어 상업적 배포 / *Commercial software distribution for profit*
- 의료 허가 없는 실제 임상 진단·치료 대체 / *Replacing clinical diagnosis without medical clearance*
- 환자 데이터 무단 수집, 판매 또는 AI 학습 활용 / *Unauthorized patient data collection, sale, or AI training*
- 원저작권 표시 삭제 및 독점적 파생물 배포 / *Removing attribution or distributing closed-source derivatives*

### 📜 라이선스 · License

**MIT License + Public Good Clause (공익 조항)**

모든 파생물은 동일한 공익 조항을 유지해야 하며, 학술 논문 인용 시 본 프로젝트를 명시해야 합니다. 상업적 이용을 원하시면 별도로 문의해 주세요.

All derivatives must retain the same public good clause. Academic publications must cite this project. Commercial use inquiries welcome — contact us separately.

---

## 3. 주요 기능 · Key Features

| 기능 · Feature | 설명 (한국어) | Description (EN) |
|---|---|---|
| 📊 대시보드 | NIHSS·Fugl-Meyer·Barthel 실시간 추적, 월별 회복 추이, 임상 이벤트 타임라인 | Real-time score tracking, monthly recovery trends, clinical event timeline |
| 💬 AI 상담 | 방문 기록·프로토콜 컨텍스트 기반 Claude API 실시간 채팅 | Claude API chat with patient context injection |
| 📋 SOAP 노트 | AI 방문 요약 자동 생성 (S/O/A/P), 평가 지표 테이블, PDF 내보내기 | Auto-generated AI visit summaries, assessment tables, PDF export |
| ⚡ 재활 프로토콜 | rTMS / tDCS / BCI / iPSC-NPC 파라미터 전체 관리 | Full parameter management for all rehabilitation modalities |
| 🧠 영상 데이터 | fMRI·DTI·EEG 스펙트럼 시각화, 7T MRI 세포 추적 지원 | fMRI, DTI, EEG visualization, 7T MRI cell tracking |
| 🔬 바이오마커 | 혈장 BDNF·NfL, 시냅스 단백질, μ코히런스 종단 추적 | Longitudinal BDNF/NfL, synaptic proteins, μ-coherence tracking |

---

## 4. 기술 스택 · Technology Stack

**프론트엔드 · Frontend**

```
React 18 (Hooks)         — 컴포넌트 기반 UI / Component-based UI
DM Serif Display + DM Sans — 타이포그래피 / Typography
CSS Custom Properties     — 다크 모드 테마 / Dark mode theming
```

**AI 백엔드 · AI Backend**

```
Anthropic Claude API     — claude-sonnet-4-6
Context injection        — 환자 데이터 + 프로토콜 + 방문 요약
Streaming responses      — 실시간 AI 응답 / Real-time AI response
```

**의료 표준 · Medical Standards**

```
FHIR-compatible          — 의료 데이터 모델 / Medical data model
HL7 v2 구조 참조          — 진료 기록 형식 / Clinical record format
SOAP 노트 표준            — 방문 요약 구조 / Visit summary structure
```

---

## 5. 설치 및 실행 · Installation & Setup

### 요구 사항 · Requirements

- Node.js 18+
- Anthropic API Key (`sk-ant-...`)
- React 18+

### 설치 방법 · Installation

```bash
# 저장소 클론 / Clone repository
git clone https://github.com/your-org/neurocare.git
cd neurocare

# 의존성 설치 / Install dependencies
npm install

# 환경변수 설정 / Configure environment
cp .env.example .env.local
```

`.env.local` 파일을 열고 · Open `.env.local` and set:

```env
ANTHROPIC_API_KEY=sk-ant-your-key-here
NEXT_PUBLIC_APP_ENV=development
```

```bash
# 개발 서버 실행 / Start development server
npm run dev
```

브라우저에서 `http://localhost:3000` 접속 · Access at `http://localhost:3000`

### 프로덕션 빌드 · Production Build

```bash
npm run build
npm start
```

---

## 6. 시스템 아키텍처 · System Architecture

```
┌─────────────────────────────────────────────────────┐
│               사용자 인터페이스 · UI Layer              │
│  Dashboard | Protocol | SOAP | Imaging | AI Chat    │
└────────────────────┬────────────────────────────────┘
                     │  컨텍스트 주입 · Context Injection
                     │  (환자 데이터 + 프로토콜 + 방문 요약)
                     ▼
┌─────────────────────────────────────────────────────┐
│           Anthropic Claude API (claude-sonnet-4-6)  │
│                 AI 임상 어시스턴트 Layer               │
└──────┬──────────────────────────────────┬───────────┘
       │                                  │
       ▼                                  ▼
┌─────────────┐                  ┌────────────────────┐
│  SOAP 노트  │                  │  재활 프로토콜 조회  │
│  자동 생성  │                  │  증상 상담 · 해석   │
│  Auto-gen   │                  │  Protocol Lookup   │
└─────────────┘                  └────────────────────┘
```

---

## 7. 연구 프로토콜 개요 · Research Protocol Overview

본 플랫폼이 지원하는 3단계 신경 회로 재생 프로토콜: / The 3-phase neural circuit regeneration protocol supported:

### Phase 1 — rTMS/tDCS (주 1-6)

- 병변측 M1 10Hz 촉진 자극 · Ipsilesional M1 10Hz facilitation
- 신경항법 fMRI 유도 · fMRI-guided neuronavigation
- 20세션/4주 · 20 sessions over 4 weeks

### Phase 2 — 세포 치료 · Cell Therapy (주 4-8)

- iPSC 유래 신경 전구세포 자가 이식 · Autologous iPSC-NPC transplantation
- 1×10⁶ 세포, 입체정위적 주입 · 1×10⁶ cells, stereotactic injection
- 7T MRI 철 나노입자 생착 추적 · 7T MRI iron nanoparticle tracking

### Phase 3 — BCI 훈련 · BCI Training (주 6-16)

- 64ch EEG-FES 폐쇄루프 시스템 · 64ch EEG-FES closed-loop
- Riemannian geometry 적응 분류기 · Adaptive Riemannian classifier
- VR 운동 상상 복합 패러다임 · VR combined motor imagery paradigm

### 1차 평가변수 · Primary Outcome

Fugl-Meyer 운동점수 변화량 (MID ≥ 10점) · Fugl-Meyer motor score change (MID ≥ 10 points)

---

## 8. 안전성 및 윤리 · Safety & Ethics

> ⚠️ **임상 면책 조항 · Clinical Disclaimer**
>
> 본 플랫폼의 AI 응답은 정보 제공 목적에 한하며, 의학적 진단·치료 결정을 대체하지 않습니다. 모든 임상 결정은 자격을 갖춘 의료 전문가와 함께 이루어져야 합니다.
>
> AI responses are for informational purposes only and do not replace medical diagnosis or treatment. All clinical decisions must involve qualified healthcare professionals.

**규제 준수 · Regulatory Compliance**

- IRB 승인 필수 (임상 1·2상 IND) · IRB approval required
- DSMB 독립 모니터링 · Independent DSMB monitoring
- 첨단바이오의약품법 적용 (대한민국) · Advanced Biopharmaceutical Act (Korea)
- GDPR 및 개인정보보호법 준수 · GDPR & personal data protection compliance
- 헬싱키 선언 원칙 · Declaration of Helsinki principles

---

## 9. 인용 및 기여 · Citation & Contributing

### 학술 논문 인용 · Academic Citation

```bibtex
@software{neurocare2025,
  title   = {NeuroCare: AI-Integrated Stroke Rehabilitation Research Platform},
  subtitle= {뇌졸중 재활 연구 플랫폼},
  author  = {NeuroCare Contributors},
  year    = {2025},
  url     = {https://github.com/your-org/neurocare},
  license = {MIT + Public Good Clause},
  note    = {For non-commercial public health research only}
}
```

### 기여 방법 · How to Contribute

1. 저장소를 Fork · Fork the repository
2. 기능 브랜치 생성 · Create a feature branch (`git checkout -b feature/your-feature`)
3. 변경사항 커밋 · Commit changes (`git commit -m 'feat: add feature'`)
4. 브랜치 Push · Push to branch (`git push origin feature/your-feature`)
5. Pull Request 생성 · Open a Pull Request

**기여 영역 · Contribution Areas**

- 🐛 버그 수정 / Bug fixes
- 🌏 다국어 번역 (일본어, 중국어, 스페인어 등) / Multilingual translations
- 🏥 의료·신경과학 전문 검토 / Medical & neuroscience expert review
- 📊 임상 데이터 익명화 공유 / Anonymized clinical dataset sharing
- 📖 문서 개선 / Documentation improvements

---

## 10. 연락처 및 지원 · Contact & Support

| 목적 · Purpose | 연락처 · Contact |
|---|---|
| 학술 협력 · Academic collaboration | research@neurocare.org |
| 임상 문의 · Clinical inquiries | clinical@neurocare.org |
| 버그 리포트 · Bug reports | [GitHub Issues](https://github.com/your-org/neurocare/issues) |
| 보안 취약점 · Security | security@neurocare.org |
| 상업적 이용 문의 · Commercial licensing | license@neurocare.org |

---

<div align="center">

**NeuroCare · 뇌졸중 재활 연구 플랫폼**

MIT License + Public Good Clause · © 2025 NeuroCare Contributors

*공익 목적 오픈소스 · Open Source for the Public Good*

</div>
