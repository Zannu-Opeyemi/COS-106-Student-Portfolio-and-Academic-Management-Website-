export type PageId = 'home' | 'about' | 'projects' | 'planner' | 'quiz' | 'contact';

export type SkillCategory =
  | 'Security & Forensics'
  | 'Systems & Networking'
  | 'Development';

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Threat Intelligence' | 'Digital Forensics' | 'Security Training';
  summary: string;
  details: string;
  architecture: string[];
  controls: string[];
  image: string;
  imageAlt: string;
  stack: string[];
  githubUrl: string;
  readmeUrl: string;
  year: string;
  completionDate: string;
}

export interface SkillItem {
  name: string;
  category: SkillCategory;
  level: number;
  focus: string;
  tools: string;
}

export interface EducationItem {
  institution: string;
  programme: string;
  status: string;
  logoUrl?: string;
}

export interface MivaCourse {
  code: string;
  title: string;
  semester: 'First Semester' | 'Second Semester';
  level: string;
  units: number;
  requirement: 'CORE' | 'ELECTIVE';
  status: 'Completed' | 'Enrolled';
}

export type CertificationCategory =
  | 'Cybersecurity'
  | 'Cloud & Microsoft'
  | 'Systems & Programming'
  | 'Leadership & Research';

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: CertificationCategory;
  credentialId?: string;
  verifyUrl?: string;
  documentUrl?: string;
  secondaryDocumentUrl?: string;
  secondaryDocumentLabel?: string;
  previewImage: string;
  fullImage?: string;
  secondaryPreviewImage?: string;
  secondaryFullImage?: string;
  isBadge?: boolean;
  summary: string;
  highlights: string[];
  featured?: boolean;
}

export const PROFILE = {
  name: 'Zannu Opeyemi Emmanuel',
  role: 'Cybersecurity Student at MIVA Open University',
  course: 'COS 106 — Introduction to Web Technologies',
  university: 'MIVA Open University',
  phoneDisplay: '07058904711',
  phoneHref: 'tel:+2347058904711',
  email: 'zannuopeyemiemmanuel@gmail.com',
  githubUrl: 'https://github.com/Zannu-Opeyemi',
  portraitUrl: '/images/profile.jpg',
  portraitAlt:
    'Portrait of Zannu Opeyemi Emmanuel seated at a table, wearing a white t-shirt and a wristwatch',
  mivaLogoLightBg: '/assets/aistudio/miva_logo_1_edd86dfc.png',
  mivaLogoCard: '/assets/aistudio/miva_logo_2_9954834d.jfif',
  mivaLogoDarkBg: '/assets/aistudio/miva_logo_3_a49ab0db.png',
  welcomeAudioUrl: '/audio/welcome-chime.wav',
};

export const EDUCATION: EducationItem[] = [
  {
    institution: 'MIVA Open University',
    programme: 'Cybersecurity (Undergraduate)',
    status: 'In progress',
    logoUrl: '/assets/aistudio/miva_logo_1_edd86dfc.png',
  },
  {
    institution: 'Nigeria Customs Secondary School, Idiroko, Ogun State',
    programme: 'Secondary Education',
    status: 'Completed',
  },
  {
    institution: 'Tai Solarin University of Education (TASUED)',
    programme: 'Primary Education',
    status: 'Completed',
  },
];

export const SKILLS: SkillItem[] = [
  {
    name: 'Python',
    category: 'Development',
    level: 75,
    focus: 'Log parsing, automation pipelines, FastAPI backends & reporting',
    tools: 'Python 3 · FastAPI · SQLite · Streamlit',
  },
  {
    name: 'Linux',
    category: 'Systems & Networking',
    level: 70,
    focus: 'Shell scripting, file permissions, service hardening & log inspection',
    tools: 'Bash · systemd · journalctl · grep / awk',
  },
  {
    name: 'Wireshark',
    category: 'Systems & Networking',
    level: 65,
    focus: 'Packet capture analysis, protocol dissection & anomalous traffic triage',
    tools: 'PCAP · TCP/UDP · DNS · HTTP inspection',
  },
  {
    name: 'Log Analysis & Threat Intelligence',
    category: 'Security & Forensics',
    level: 70,
    focus: 'Cowrie honeypot telemetry normalisation & attacker IOC extraction',
    tools: 'Cowrie · JSON · IP indicators · Daily briefs',
  },
  {
    name: 'Digital Forensics',
    category: 'Security & Forensics',
    level: 65,
    focus: 'Evidence integrity hashing, multi-source UTC timeline reconstruction',
    tools: 'SHA-256 · Chain of custody · Case reporting',
  },
  {
    name: 'HTML, CSS & JavaScript',
    category: 'Development',
    level: 70,
    focus: 'Semantic markup, responsive grid layout & accessible DOM scripting',
    tools: 'HTML5 · CSS3 · TypeScript · React',
  },
  {
    name: 'Git & GitHub',
    category: 'Development',
    level: 65,
    focus: 'Branch workflows, repository documentation & collaborative versioning',
    tools: 'Git CLI · GitHub · Markdown',
  },
];

export const HOBBIES: string[] = [
  'Reading',
  'Playing football',
  'Learning new cybersecurity techniques',
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'honeypot-report',
    title: 'Threat Intelligence Honeypot Report System',
    category: 'Threat Intelligence',
    summary:
      'A defensive Python system that turns Cowrie honeypot logs into normalised events, source-IP indicators, daily Markdown reports, exports and a Streamlit dashboard.',
    details:
      'Designed around synthetic Cowrie SSH/Telnet honeypot telemetry, this pipeline ingests raw JSON log streams, normalises session events into SQLite, aggregates attacker source-IP indicators, and produces daily defensive Markdown briefings alongside an interactive Streamlit dashboard.',
    architecture: [
      'Ingests structured Cowrie JSON session logs and extracts timestamps, source IPs, targeted ports, and attempted credentials.',
      'Normalises raw event records into a relational SQLite schema to support repeatable indicator queries and CSV/JSON exports.',
      'Generates daily Markdown intelligence briefings and visualises top attacker patterns inside a Streamlit analyst dashboard.',
    ],
    controls: [
      'Synthetic-only telemetry datasets to keep lab testing isolated from live production networks.',
      'Parameterised SQLite persistence to prevent query injection during indicator lookups.',
      'Structured UTC timestamp normalisation across session start, command, and disconnect events.',
    ],
    image: '/images/project-honeypot.svg',
    imageAlt:
      'Illustration of the Threat Intelligence Honeypot Report System project interface',
    stack: ['Python', 'SQLite', 'Streamlit', 'Threat intelligence'],
    githubUrl:
      'https://github.com/Zannu-Opeyemi/Threat-Intelligence-Honeypot-Report-system',
    readmeUrl:
      'https://github.com/Zannu-Opeyemi/Threat-Intelligence-Honeypot-Report-system#readme-ov-file',
    year: '2026',
    completionDate: 'June 18, 2026',
  },
  {
    id: 'digital-forensics',
    title: 'Digital Forensics Case Investigation',
    category: 'Digital Forensics',
    summary:
      'A fictional forensic case that verifies SHA-256 evidence hashes, merges two event sources into a UTC timeline, flags suspicious activity and generates a full report.',
    details:
      'Built to practise repeatable incident investigation workflows: validates chain-of-custody integrity using SHA-256 checksums, normalises disparate event logs onto a single UTC timeline, highlights anomalous patterns, and compiles a structured forensic case report.',
    architecture: [
      'Computes and verifies SHA-256 cryptographic digests for every acquired evidence artifact prior to analysis.',
      'Parses and merges two distinct event sources onto a unified, chronologically sorted UTC timeline.',
      'Applies rule-based anomaly flagging to surface suspicious authentication attempts and compiles a full investigation report.',
    ],
    controls: [
      'Read-only evidence handling with automated SHA-256 hash comparison to detect tampering.',
      'Timezone offset normalisation to UTC so cross-source sequence reconstruction stays accurate.',
      'Reproducible Markdown and structured report outputs documenting findings and evidence provenance.',
    ],
    image: '/images/project-forensics.svg',
    imageAlt:
      'Illustration of the Digital Forensics Case Investigation project interface',
    stack: ['Python', 'SHA-256', 'Timeline analysis', 'Reporting'],
    githubUrl:
      'https://github.com/Zannu-Opeyemi/Digital-Forensics-Case-Investigation',
    readmeUrl:
      'https://github.com/Zannu-Opeyemi/Digital-Forensics-Case-Investigation#readme-ov-file',
    year: '2026',
    completionDate: 'June 19, 2026',
  },
  {
    id: 'cyber-range',
    title: 'Cyber Range Platform',
    category: 'Security Training',
    summary:
      'A beginner training platform where learners register, solve synthetic challenges, earn points once per challenge and write short reflections. Admins can add safe challenges.',
    details:
      'A FastAPI and SQLite educational cyber range featuring learner registration, one-time flag scoring, reflection logging to reinforce conceptual understanding, and a scoped administrative interface for publishing safe, synthetic security exercises.',
    architecture: [
      'Provides learner registration, challenge browsing, and server-side flag verification built with FastAPI and Jinja2 templates.',
      'Enforces single-credit scoring per learner per challenge inside SQLite alongside structured reflection notes.',
      'Exposes a scoped administrative workflow for authoring and publishing safe, non-destructive training challenges.',
    ],
    controls: [
      'Server-side submission validation preventing duplicate point awards on repeated flag submissions.',
      'Role separation between standard learner accounts and challenge-authoring administrators.',
      'Strictly synthetic challenge scenarios designed for defensive literacy and safe classroom practice.',
    ],
    image: '/images/project-cyberrange.svg',
    imageAlt: 'Illustration of the Cyber Range Platform project interface',
    stack: ['FastAPI', 'SQLite', 'Jinja2', 'Security'],
    githubUrl: 'https://github.com/Zannu-Opeyemi/Cyber-Range-Platform',
    readmeUrl:
      'https://github.com/Zannu-Opeyemi/Cyber-Range-Platform#readme-ov-file',
    year: '2026',
    completionDate: 'June 21, 2026',
  },
];

export const MIVA_COURSES: MivaCourse[] = [
  // First Semester (Completed)
  {
    code: 'COS 101',
    title: 'Introduction to Computing',
    semester: 'First Semester',
    level: '100L',
    units: 3,
    requirement: 'CORE',
    status: 'Completed',
  },
  {
    code: 'STA 111',
    title: 'Descriptive Statistics',
    semester: 'First Semester',
    level: '100L',
    units: 3,
    requirement: 'CORE',
    status: 'Completed',
  },
  {
    code: 'MTH 101',
    title: 'Elementary Mathematics',
    semester: 'First Semester',
    level: '100L',
    units: 2,
    requirement: 'CORE',
    status: 'Completed',
  },
  {
    code: 'PHY 101',
    title: 'General Physics I',
    semester: 'First Semester',
    level: '100L',
    units: 2,
    requirement: 'CORE',
    status: 'Completed',
  },
  {
    code: 'PHY 107',
    title: 'General Practical Physics',
    semester: 'First Semester',
    level: '100L',
    units: 1,
    requirement: 'CORE',
    status: 'Completed',
  },
  {
    code: 'GST 111',
    title: 'Communication in English Language I',
    semester: 'First Semester',
    level: '100L',
    units: 2,
    requirement: 'CORE',
    status: 'Completed',
  },
  {
    code: 'GST 121',
    title: 'Use of Library Study Skills and ICT',
    semester: 'First Semester',
    level: '100L',
    units: 2,
    requirement: 'CORE',
    status: 'Completed',
  },
  {
    code: 'GST 125',
    title: 'Contemporary Health Issues',
    semester: 'First Semester',
    level: '100L',
    units: 2,
    requirement: 'ELECTIVE',
    status: 'Completed',
  },
  // Second Semester (Enrolled)
  {
    code: 'MIVA-CSC 106',
    title: 'Introduction to Web Technologies',
    semester: 'Second Semester',
    level: '100L',
    units: 3,
    requirement: 'CORE',
    status: 'Enrolled',
  },
  {
    code: 'COS 102',
    title: 'Introduction to Problem-Solving',
    semester: 'Second Semester',
    level: '100L',
    units: 3,
    requirement: 'CORE',
    status: 'Enrolled',
  },
  {
    code: 'MIVA-COS 111',
    title: 'Technical Certification in Computing I',
    semester: 'Second Semester',
    level: '100L',
    units: 1,
    requirement: 'CORE',
    status: 'Enrolled',
  },
  {
    code: 'MTH 102',
    title: 'Elementary Mathematics (Calculus) II',
    semester: 'Second Semester',
    level: '100L',
    units: 2,
    requirement: 'CORE',
    status: 'Enrolled',
  },
  {
    code: 'PHY 102',
    title: 'General Physics II',
    semester: 'Second Semester',
    level: '100L',
    units: 2,
    requirement: 'CORE',
    status: 'Enrolled',
  },
  {
    code: 'PHY 108',
    title: 'General Physics Practical II',
    semester: 'Second Semester',
    level: '100L',
    units: 1,
    requirement: 'CORE',
    status: 'Enrolled',
  },
  {
    code: 'GST 122',
    title: 'Communication in English Language II',
    semester: 'Second Semester',
    level: '100L',
    units: 2,
    requirement: 'CORE',
    status: 'Enrolled',
  },
  {
    code: 'GST 112',
    title: 'Nigerian Peoples and Culture',
    semester: 'Second Semester',
    level: '100L',
    units: 2,
    requirement: 'CORE',
    status: 'Enrolled',
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'ms-sc100',
    title: 'Microsoft Certified: Cybersecurity Architect Expert (SC-100)',
    issuer: 'Digital Skills Nigeria · Microsoft Elevate',
    date: 'June 30, 2026',
    category: 'Cybersecurity',
    previewImage: '/images/certs/thumbs/ms-sc100.webp',
    fullImage: '/images/certs/full/ms-sc100.webp',
    documentUrl: '/assets/aistudio/Certidied_cyber_cdab824b.pdf',
    summary:
      'Completed expert-level cybersecurity architecture training covering Zero Trust strategy, governance, risk, and compliance (GRC), security operations design, and cloud infrastructure protection.',
    highlights: [
      'Zero Trust architecture',
      'GRC & security posture',
      'Hybrid cloud security design',
    ],
    featured: true,
  },
  {
    id: 'ms-sc200',
    title: 'Microsoft Certified: Security Operations Analyst Associate (SC-200)',
    issuer: 'Digital Skills Nigeria · Microsoft Elevate',
    date: 'June 30, 2026',
    category: 'Cybersecurity',
    previewImage: '/images/certs/thumbs/ms-sc200.webp',
    fullImage: '/images/certs/full/ms-sc200.webp',
    documentUrl: '/assets/aistudio/micro_certtt_b582cb7f.pdf',
    summary:
      'Focused on threat mitigation, incident response, and security monitoring workflows using SIEM/SOAR investigation concepts, endpoint threat detection, and KQL-style query triage.',
    highlights: [
      'Threat hunting & triage',
      'Incident response workflows',
      'SIEM & endpoint monitoring',
    ],
    featured: true,
  },
  {
    id: 'rtl-crtom',
    title: 'Certified Red Team Operations Management (CRTOM)',
    issuer: 'Red Team Leaders',
    date: 'December 27, 2025',
    category: 'Cybersecurity',
    credentialId: '91fcaab56937367d',
    verifyUrl:
      'https://courses.redteamleaders.com/exam-completion/91fcaab56937367d',
    documentUrl:
      '/assets/aistudio/CROTM_OPERATIONS_MANAGER_certified_red_certificate_fedfda9f.pdf',
    previewImage: '/images/certs/thumbs/CRTOM_CERTIFICATE_1e185815.webp',
    fullImage: '/images/certs/full/CRTOM_CERTIFICATE_1e185815.webp',
    summary:
      'Passed the assessment covering adversary emulation planning, rules of engagement, operational security, and coordinating red-team engagements to strengthen blue-team detection.',
    highlights: [
      'Engagement planning & scoping',
      'Adversary emulation management',
      'Detection feedback loops',
    ],
    featured: true,
  },
  {
    id: 'future-interns-cert',
    title: 'Cyber Security Internship — Certificate of Completion',
    issuer: 'Future Interns',
    date: 'December 30, 2025',
    category: 'Cybersecurity',
    credentialId: 'FIT/DEC25/CS4986',
    previewImage: '/images/certs/thumbs/future-interns-cert.webp',
    fullImage: '/images/certs/full/future-interns-cert.webp',
    documentUrl:
      '/assets/aistudio/ZANNU_OPEYEMI_EMMANUEL_Internship_Certificate_fa0c91dd.pdf',
    summary:
      'Completed an intensive 1-month Cybersecurity internship at Future Interns with outstanding performance across applied security tasks, reporting, and defensive analysis.',
    highlights: [
      '1-month applied internship',
      'Security task execution',
      'ISO 9001 registered programme',
    ],
    featured: true,
  },
  {
    id: 'isc2-candidate',
    title: 'ISC2 Candidate Badge',
    issuer: 'ISC2',
    date: 'Active Credential',
    category: 'Cybersecurity',
    previewImage: '/images/certs/thumbs/isc2-candidate_0a9ed573.webp',
    fullImage: '/images/certs/full/isc2-candidate_0a9ed573.webp',
    isBadge: true,
    summary:
      'Official ISC2 Candidate standing reflecting active progression toward Certified in Cybersecurity (CC) and CISSP pathways while upholding the ISC2 Code of Ethics.',
    highlights: [
      'ISC2 Code of Ethics',
      'Continuing security education',
      'Global practitioner community',
    ],
    featured: true,
  },
  {
    id: 'mckinsey-forward',
    title: 'McKinsey.org Forward Program Badge',
    issuer: 'McKinsey & Company (McKinsey.org)',
    date: 'Program Completion Credential',
    category: 'Leadership & Research',
    previewImage: '/images/certs/thumbs/mckinsey-org-forward-program_58a80727.webp',
    fullImage: '/images/certs/full/mckinsey-org-forward-program_58a80727.webp',
    isBadge: true,
    summary:
      'Practical leadership and workplace readiness programme building structured problem-solving, adaptable communication, and digital collaboration capabilities.',
    highlights: [
      'Structured problem-solving',
      'Adaptability & resilience',
      'Clear stakeholder communication',
    ],
    featured: true,
  },
  {
    id: 'future-interns-lor',
    title: 'Cyber Security Internship — Letter of Recommendation',
    issuer: 'Future Interns',
    date: 'December 30, 2025',
    category: 'Cybersecurity',
    credentialId: 'FIT/DEC25/CS4986',
    previewImage: '/images/certs/thumbs/future-interns-lor.webp',
    fullImage: '/images/certs/full/future-interns-lor.webp',
    documentUrl: '/assets/aistudio/ZANNU_OPEYEMI_EMMANUEL_LoR_ec35534a.pdf',
    summary:
      'Formal commendation recognising professionalism, strong technical skill, initiative, problem-solving ability, and attention to detail throughout the Cyber Security Intern tenure.',
    highlights: [
      'Technical problem-solving',
      'Attention to detail',
      'Industry readiness endorsement',
    ],
  },
  {
    id: 'rtl-ccep',
    title: 'Certified Cybersecurity Educator Professional (CCEP)',
    issuer: 'Red Team Leaders',
    date: 'December 26, 2025',
    category: 'Cybersecurity',
    credentialId: '47e175700d1e2ce6',
    verifyUrl:
      'https://courses.redteamleaders.com/exam-completion/47e175700d1e2ce6',
    documentUrl: '/assets/aistudio/CCEP_certified_certificate_22fa736d.pdf',
    previewImage: '/images/certs/thumbs/CCEP_CERTIFICATE_24fcb249.webp',
    fullImage: '/images/certs/full/CCEP_CERTIFICATE_24fcb249.webp',
    summary:
      'Completed all requirements and passed the examination validating structured instruction, lab mentoring, and clear communication of technical security concepts.',
    highlights: [
      'Security curriculum delivery',
      'Technical mentorship',
      'Clear risk communication',
    ],
  },
  {
    id: 'cisco-i2cs',
    title: 'Introduction to Cybersecurity & Verified Badge',
    issuer: 'Cisco Networking Academy',
    date: 'November 2, 2026',
    category: 'Cybersecurity',
    credentialId: 'bfb2367f-2b6a-489b-8a9d-5f0b6bb5c6b1',
    previewImage: '/images/certs/thumbs/cisco-i2cs-cert.webp',
    fullImage: '/images/certs/full/cisco-i2cs-cert.webp',
    secondaryPreviewImage: '/images/certs/thumbs/cisco-i2cs-badge.webp',
    secondaryFullImage: '/images/certs/full/cisco-i2cs-badge.webp',
    documentUrl:
      '/assets/aistudio/Introduction_to_Cybersecurity_certificate_z-opeyemi6971-miva-edu-ng_bfb2367f-2b6a-489b-8a9d-5f0b6bb5c6b1_4d3a33d4.pdf',
    secondaryDocumentUrl:
      '/assets/aistudio/I2CSUpdate20261112-20-rhp24m_2c0e702b.pdf',
    secondaryDocumentLabel: 'Verified Badge & Proficiency Statement',
    isBadge: true,
    summary:
      'Student-level credential and verified Cisco Networking Academy badge confirming core proficiency in online safety, common cyber threats, vulnerabilities, and organizational defense.',
    highlights: [
      'Threats, attacks & vulnerabilities',
      'Personal & org protection',
      'Verified Cisco badge record',
    ],
  },
  {
    id: 'ms-sc900',
    title:
      'Microsoft Certified: Security, Compliance, and Identity Fundamentals (SC-900)',
    issuer: 'Digital Skills Nigeria · Microsoft Elevate',
    date: 'June 30, 2026',
    category: 'Cybersecurity',
    previewImage: '/images/certs/thumbs/ms-sc900.webp',
    fullImage: '/images/certs/full/ms-sc900.webp',
    documentUrl: '/assets/aistudio/Microsoft_Certificate_982d09fe.pdf',
    summary:
      'Foundational credential covering identity and access management (IAM), Zero Trust principles, Microsoft security capabilities, and compliance governance models.',
    highlights: [
      'Identity & access concepts',
      'Compliance & governance',
      'Security posture fundamentals',
    ],
  },
  {
    id: 'ms-career-cyber',
    title: 'Career Essentials in Cybersecurity',
    issuer: 'Digital Skills Nigeria · Microsoft Elevate',
    date: 'June 30, 2026',
    category: 'Cybersecurity',
    previewImage: '/images/certs/thumbs/ms-cyber-essentials.webp',
    fullImage: '/images/certs/full/ms-cyber-essentials.webp',
    documentUrl: '/assets/aistudio/Certificate_career_essentials_30aab41f.pdf',
    summary:
      'Covers core cybersecurity terminology, threat awareness, security operations careers, and foundational defensive practices for enterprise environments.',
    highlights: [
      'Security awareness fundamentals',
      'Threat landscape overview',
      'Defensive analyst workflows',
    ],
  },
  {
    id: 'imporse-digital-policing',
    title: 'IMPORSE Cybersecurity Training Programme for Digital Policing 001',
    issuer: 'Imporse Technologies Ltd. · MTN Nigeria (MTNN IT)',
    date: 'Awarded with Commendation',
    category: 'Cybersecurity',
    credentialId: 'KM-005',
    previewImage: '/images/certs/thumbs/imporse-digital-policing.webp',
    fullImage: '/images/certs/full/imporse-digital-policing.webp',
    documentUrl: '/assets/aistudio/Zannu_Opeyemi_Emmanuel_25a24f69.pdf',
    summary:
      'Awarded with commendation for excellence in cybersecurity skills applied to digital policing, cyber-investigation practices, and incident awareness.',
    highlights: [
      'Digital policing security skills',
      'Awarded with commendation',
      'Joint Imporse & MTNN IT programme',
    ],
  },
  {
    id: 'imporse-osint',
    title: 'Open Source and Threat Intelligence (OSINT Tools)',
    issuer: 'Imporse Technologies',
    date: 'March 7, 2024',
    category: 'Cybersecurity',
    previewImage: '/images/certs/thumbs/imporse-osint.webp',
    fullImage: '/images/certs/full/imporse-osint.webp',
    documentUrl:
      '/assets/aistudio/zannuopeyemi_gmail.com-2024-03-07T03_09_14_7675362f.pdf',
    summary:
      'Practical training on open-source intelligence (OSINT) tooling, structured online research workflows, and foundational threat intelligence collection.',
    highlights: [
      'Introduction to OSINT tools',
      'Research & threat intelligence',
      'Indicator gathering workflows',
    ],
  },
  {
    id: 'dsci-appsec-hackathon',
    title: 'Great AppSec Hackathon 2024 — Round 1',
    issuer: 'DSCI & Cybersecurity Centre of Excellence (CCoE)',
    date: 'August 9–10, 2024',
    category: 'Cybersecurity',
    credentialId: '920c3db9701e',
    previewImage: '/images/certs/thumbs/dsci-appsec.webp',
    fullImage: '/images/certs/full/dsci-appsec.webp',
    documentUrl: '/assets/aistudio/certificate_a098c6c1.pdf',
    summary:
      'Certificate of Participation for competing in Round 1 of the Great AppSec Hackathon 2024 focused on application security challenges and secure software concepts.',
    highlights: [
      'Application security challenges',
      'National-level AppSec event',
      'DSCI & CCoE Telangana initiative',
    ],
  },
  {
    id: 'ms-az900',
    title: 'Microsoft Certified: Azure Fundamentals (AZ-900)',
    issuer: 'Digital Skills Nigeria · Microsoft Elevate',
    date: 'June 30, 2026',
    category: 'Cloud & Microsoft',
    previewImage: '/images/certs/thumbs/ms-az900.webp',
    fullImage: '/images/certs/full/ms-az900.webp',
    documentUrl: '/assets/aistudio/dsn_micro_cert_1d8a6d8c.pdf',
    summary:
      'Validates foundational knowledge of cloud computing models, core Azure architectural components, compute/networking services, and cloud governance.',
    highlights: [
      'IaaS, PaaS & SaaS concepts',
      'Core Azure cloud services',
      'Cloud pricing & governance',
    ],
  },
  {
    id: 'ms-ai900',
    title: 'Microsoft Certified: Azure AI Fundamentals (AI-900)',
    issuer: 'Digital Skills Nigeria · Microsoft Elevate',
    date: 'June 30, 2026',
    category: 'Cloud & Microsoft',
    previewImage: '/images/certs/thumbs/ms-ai900.webp',
    fullImage: '/images/certs/full/ms-ai900.webp',
    documentUrl: '/assets/aistudio/micro_cert_3_b914f37c.pdf',
    summary:
      'Covers fundamental machine learning concepts, computer vision, natural language processing workloads, and responsible AI principles on Microsoft Azure.',
    highlights: [
      'Machine learning workloads',
      'NLP & vision fundamentals',
      'Responsible AI governance',
    ],
  },
  {
    id: 'ms-ms900',
    title: 'Microsoft 365 Certified: Fundamentals (MS-900)',
    issuer: 'Digital Skills Nigeria · Microsoft Elevate',
    date: 'June 30, 2026',
    category: 'Cloud & Microsoft',
    previewImage: '/images/certs/thumbs/ms-ms900.webp',
    fullImage: '/images/certs/full/ms-ms900.webp',
    documentUrl: '/assets/aistudio/Certifica_25a442b9.pdf',
    summary:
      'Covers cloud productivity architecture, Microsoft 365 collaboration services, endpoint management basics, and enterprise security and licensing models.',
    highlights: [
      'Cloud productivity concepts',
      'M365 security & trust',
      'Enterprise tenant basics',
    ],
  },
  {
    id: 'ms-genai-essentials',
    title: 'Career Essentials in Generative AI',
    issuer: 'Digital Skills Nigeria · Microsoft Elevate',
    date: 'June 30, 2026',
    category: 'Cloud & Microsoft',
    previewImage: '/images/certs/thumbs/ms-genai.webp',
    fullImage: '/images/certs/full/ms-genai.webp',
    documentUrl:
      '/assets/aistudio/Certificate_Career_essentials_in_generative_AI_6660782a.pdf',
    summary:
      'Introduces generative AI model fundamentals, practical productivity workflows, prompt reasoning, and ethical considerations when adopting AI systems.',
    highlights: [
      'Generative AI foundations',
      'AI ethics & safe usage',
      'Modern workplace workflows',
    ],
  },
  {
    id: 'ms-mce',
    title: 'Microsoft Certified Educator',
    issuer: 'Digital Skills Nigeria · Microsoft Elevate',
    date: 'June 30, 2026',
    category: 'Cloud & Microsoft',
    previewImage: '/images/certs/thumbs/ms-mce.webp',
    fullImage: '/images/certs/full/ms-mce.webp',
    documentUrl: '/assets/aistudio/Certificate_2959_54_xr604_2975481b.pdf',
    summary:
      'Demonstrates technology literacy and the ability to design structured, technology-supported learning activities that build 21st-century collaboration and problem-solving skills.',
    highlights: [
      'Digital pedagogy design',
      'Technology integration',
      'Structured knowledge transfer',
    ],
  },
  {
    id: 'rtl-ccpp',
    title: 'Certified C++ Practitioner Professional (CCPP)',
    issuer: 'Red Team Leaders',
    date: 'January 3, 2026',
    category: 'Systems & Programming',
    credentialId: '1a08635978b1e439',
    verifyUrl:
      'https://courses.redteamleaders.com/exam-completion/1a08635978b1e439',
    previewImage: '/images/certs/thumbs/rtl-ccpp.webp',
    fullImage: '/images/certs/full/rtl-ccpp.webp',
    documentUrl:
      '/assets/aistudio/certified_c_certificate__1__898b2222.pdf',
    summary:
      'Professional-tier credential verifying applied C++ programming proficiency, memory-aware system logic, and low-level problem solving useful in security engineering.',
    highlights: [
      'Applied C++ syntax & OOP',
      'Memory & systems logic',
      'Exam-verified proficiency',
    ],
  },
  {
    id: 'rtl-ccpc',
    title: 'Certified C++ Practitioner (CCPC)',
    issuer: 'Red Team Leaders',
    date: 'January 3, 2026',
    category: 'Systems & Programming',
    credentialId: '1a08635978b1e439',
    verifyUrl:
      'https://courses.redteamleaders.com/exam-completion/1a08635978b1e439',
    previewImage: '/images/certs/thumbs/rtl-ccpc.webp',
    fullImage: '/images/certs/full/rtl-ccpc.webp',
    documentUrl: '/assets/aistudio/certified_c_certificate_352bb6f4.pdf',
    summary:
      'Foundation practitioner certification in C++ covering core language constructs, control flow, modular functions, and safe data handling.',
    highlights: [
      'Core C++ constructs',
      'Modular code structure',
      'Systems programming base',
    ],
  },
  {
    id: 'ibm-itexperience',
    title: 'ITExperience Orientation 2025',
    issuer: 'IBM SkillsBuild',
    date: 'November 28, 2025',
    category: 'Systems & Programming',
    credentialId: 'URL-B2E6B99955E7',
    previewImage: '/images/certs/thumbs/ibm-itexperience.webp',
    fullImage: '/images/certs/full/ibm-itexperience.webp',
    documentUrl: '/assets/aistudio/IBM_COMPLETION_CERTIFICATE_d52197d9.pdf',
    summary:
      'IBM SkillsBuild completion credential introducing enterprise IT workflows, technical career pathways, and core technology readiness practices.',
    highlights: [
      'Enterprise IT orientation',
      '1-hour structured module',
      'IBM SkillsBuild credential',
    ],
  },
  {
    id: 'imporse-computer-basics',
    title: 'Computer Basics and System Information',
    issuer: 'Imporse Technologies',
    date: 'March 3, 2024',
    category: 'Systems & Programming',
    previewImage: '/images/certs/thumbs/imporse-computer-basics.webp',
    fullImage: '/images/certs/full/imporse-computer-basics.webp',
    documentUrl:
      '/assets/aistudio/zannuopeyemi_gmail.com-2024-03-03T18_25_32_95fb7cfc.pdf',
    summary:
      'Covers computer architecture, Windows and Linux operating system essentials, structured file management, and foundational command-line operations.',
    highlights: [
      'Windows & Linux basics',
      'Computer architecture',
      'Command-line & file management',
    ],
  },
  {
    id: 'aspire-leaders-2026',
    title: '2026 Aspire Leaders Program',
    issuer: 'Aspire Institute',
    date: 'April 2026',
    category: 'Leadership & Research',
    previewImage: '/images/certs/thumbs/aspire-leaders.webp',
    fullImage: '/images/certs/full/aspire-leaders.webp',
    documentUrl: '/assets/aistudio/Aspire-Certificate_1c919fb7.pdf',
    summary:
      'Affirms completion of 40 hours of global leadership coursework strengthening critical thinking, professional communication, self-confidence, and positive social impact.',
    highlights: [
      '40 hours of coursework',
      'Critical thinking & communication',
      'Global leadership cohort',
    ],
  },
  {
    id: 'powershift-fellowship',
    title:
      'Power Shift Africa Fellowship — Civic Education and Active Citizenship',
    issuer: 'Power Shift Africa Fellowship (Class 2026, Cohort 4)',
    date: 'January–March 2026',
    category: 'Leadership & Research',
    previewImage: '/images/certs/thumbs/1794651143527_35c1e39a.webp',
    fullImage: '/images/certs/full/1794651143527_35c1e39a.webp',
    summary:
      'Graduated from Cohort 4 of the Power Shift Africa Fellowship examining civic responsibility, ethical leadership, and community advocacy.',
    highlights: [
      'Class 2026, Cohort 4',
      'Civic leadership & ethics',
      'Community engagement',
    ],
  },
  {
    id: 'giw-writers-2026',
    title:
      'GIW Writers Bootcamp 2026 — Building Strong Writing Skills 1.0',
    issuer: 'GIW Writers LLP',
    date: 'March 28, 2026',
    category: 'Leadership & Research',
    previewImage:
      '/images/certs/thumbs/Congratulations_Zannu_O__Emmanuel_d2eb0a62.webp',
    fullImage: '/images/certs/full/Congratulations_Zannu_O__Emmanuel_d2eb0a62.webp',
    summary:
      'Rigorous academic and professional writing bootcamp covering research development, structured argumentation, referencing systems, critical analysis, and dissertation-level reporting.',
    highlights: [
      'Research & referencing systems',
      'Critical analytical writing',
      'Academic & technical reporting',
    ],
  },
  {
    id: 'maaun-research-2026',
    title:
      'International Workshop on Research Methodology, Data Analysis & Publication',
    issuer: 'Maryam Abacha American University of Nigeria (MAAUN)',
    date: 'June 30, 2026',
    category: 'Leadership & Research',
    credentialId: 'MN0030399',
    previewImage: '/images/certs/thumbs/maaun-research.webp',
    fullImage: '/images/certs/full/maaun-research.webp',
    documentUrl: '/assets/aistudio/Zannu_Opeyemi_Emmanuel__34e4541f.pdf',
    summary:
      'Participated in the international academic workshop covering rigorous research design, empirical data analysis workflows, and scholarly publication standards.',
    highlights: [
      'Research methodology design',
      'Data analysis techniques',
      'Academic publication standards',
    ],
  },
];

export const EXECUTIVE_CERT_IDS = new Set<string>([
  'ms-sc100',
  'ms-sc200',
  'rtl-crtom',
  'future-interns-cert',
  'future-interns-lor',
  'rtl-ccep',
  'cisco-i2cs',
  'ms-sc900',
  'ms-az900',
  'isc2-candidate',
  'mckinsey-forward',
  'aspire-leaders-2026',
  'dsci-appsec-hackathon',
  'imporse-digital-policing',
]);
