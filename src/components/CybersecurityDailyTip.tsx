import { Check, Copy, ShieldAlert, Shuffle } from 'lucide-react';
import { useState } from 'react';

interface SecurityTip {
  id: string;
  category: string;
  title: string;
  detail: string;
  reference: string;
}

const SECURITY_TIPS: SecurityTip[] = [
  {
    id: 'ssh-keys',
    category: 'System Hardening',
    title: 'Disable password-based SSH logins on exposed hosts',
    detail:
      'Enforce Ed25519 key-based authentication and disable root SSH password logins to eliminate automated credential-stuffing brute-force noise.',
    reference: 'Access Control Best Practice',
  },
  {
    id: 'sha256-custody',
    category: 'Digital Forensics',
    title: 'Hash evidence immediately upon acquisition',
    detail:
      'Generate and record a SHA-256 checksum before inspecting any disk image or log export so downstream analysts can prove evidence integrity.',
    reference: 'Chain of Custody Standard',
  },
  {
    id: 'utc-logging',
    category: 'Log Analysis',
    title: 'Normalise all distributed event logs to UTC',
    detail:
      'Storing and correlating firewall, SSH, and application logs in Coordinated Universal Time prevents timezone shifts from breaking attack timelines.',
    reference: 'Incident Investigation Workflow',
  },
  {
    id: 'least-privilege',
    category: 'Identity & Access',
    title: 'Scope service accounts to minimum required permissions',
    detail:
      'Run web services and ingestion scripts under dedicated non-root system accounts with read-only access wherever write privileges are unnecessary.',
    reference: 'Principle of Least Privilege',
  },
  {
    id: 'phishing-mfa',
    category: 'Account Defence',
    title: 'Pair strong passphrases with hardware-backed or FIDO2 MFA',
    detail:
      'Phishing-resistant multi-factor authentication binds login assertions to the exact origin domain, blocking credential replay from lookalike sites.',
    reference: 'Authentication Hygiene',
  },
  {
    id: 'pcap-filters',
    category: 'Network Triage',
    title: 'Use targeted display filters before deep packet inspection',
    detail:
      'Isolate suspicious DNS queries, TLS handshakes, or non-standard ports in Wireshark first so high-volume background traffic does not obscure anomalies.',
    reference: 'Packet Analysis Technique',
  },
  {
    id: 'dependency-pinning',
    category: 'Application Security',
    title: 'Pin dependencies and audit third-party packages regularly',
    detail:
      'Locking package versions and reviewing security advisories helps prevent supply-chain regressions in Python and JavaScript deployments.',
    reference: 'Secure Development Practice',
  },
  {
    id: 'sandbox-malware',
    category: 'Threat Intelligence',
    title: 'Inspect untrusted payloads strictly inside isolated sandboxes',
    detail:
      'Never open suspicious executables or scripts on a host machine with active network shares; analyse indicators inside ephemeral, network-segmented VMs.',
    reference: 'Malware Handling Protocol',
  },
];

function getInitialTipIndex(): number {
  return Math.floor(Math.random() * SECURITY_TIPS.length);
}

export function CybersecurityDailyTip() {
  const [tipIndex, setTipIndex] = useState<number>(getInitialTipIndex);
  const [copied, setCopied] = useState(false);

  const currentTip = SECURITY_TIPS[tipIndex];

  const handleNextRandomTip = () => {
    setCopied(false);
    if (SECURITY_TIPS.length <= 1) return;
    let next = Math.floor(Math.random() * SECURITY_TIPS.length);
    while (next === tipIndex) {
      next = Math.floor(Math.random() * SECURITY_TIPS.length);
    }
    setTipIndex(next);
  };

  const handleCopyTip = () => {
    const text = `${currentTip.title} — ${currentTip.detail}`;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setCopied(true);
          window.setTimeout(() => setCopied(false), 2000);
        })
        .catch(() => {});
    }
  };

  return (
    <section
      aria-labelledby="daily-tip-heading"
      className="mx-auto max-w-7xl px-6 pt-14 pb-2"
    >
      <div className="rounded-2xl border border-[#DCE3EC] dark:border-[#1F3756] bg-white dark:bg-[#10243E] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#5A6B7E] dark:text-[#98AFC7]">
              <ShieldAlert className="h-4 w-4 text-[#E63C36] dark:text-[#FF746E] shrink-0" />
              <span className="font-semibold text-[#0B2D4F] dark:text-[#F0F5FA]">
                Cybersecurity Daily Tip
              </span>
              <span aria-hidden="true">·</span>
              <span>{currentTip.category}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">
                Tip {String(tipIndex + 1).padStart(2, '0')} /{' '}
                {String(SECURITY_TIPS.length).padStart(2, '0')}
              </span>
            </div>

            <h2
              id="daily-tip-heading"
              className="font-display text-xl sm:text-2xl font-bold text-[#0B2D4F] dark:text-[#F0F5FA]"
            >
              {currentTip.title}
            </h2>

            <p className="text-sm sm:text-base leading-relaxed text-[#17212E] dark:text-[#D9E4F0]">
              {currentTip.detail}
            </p>

            <p className="text-xs font-medium text-[#5A6B7E] dark:text-[#98AFC7]">
              Focus: {currentTip.reference}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleCopyTip}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#D8E0EA] dark:border-[#294568] bg-[#F6F8FB] dark:bg-[#0B192C] px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-[#0B2D4F] dark:text-[#F0F5FA] hover:bg-[#EEF3F9] dark:hover:bg-[#162C49] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-[#2F8F5B] dark:text-[#57D08D]" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy Tip</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleNextRandomTip}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#0B2D4F] dark:bg-[#194775] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-[#14416F] dark:hover:bg-[#21578D] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Shuffle className="h-4 w-4" />
              <span>Another Tip</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
