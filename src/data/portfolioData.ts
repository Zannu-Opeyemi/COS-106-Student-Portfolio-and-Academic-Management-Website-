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
