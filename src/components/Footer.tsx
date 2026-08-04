import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-charcoal text-brand-light pt-14 pb-8 border-t border-brand-accent/20 relative overflow-hidden">
      <div className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-50" />
      
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 md:gap-16 mb-10">
          
          {/* Brand */}
          <div className="flex flex-col gap-3 max-w-sm">
            <Link href="#home" className="flex items-center gap-2 w-fit">
              <span className="font-sans text-xl font-bold tracking-wider">
                ApexAutosoft
              </span>
              <div className="w-2 h-2 rounded-full bg-brand-accent" />
            </Link>
            <p className="text-brand-light/60 text-sm leading-relaxed">
              Automation that moves business forward.
            </p>
            <a
              href="mailto:hello@apexautosoft.com"
              className="text-brand-accent text-sm font-medium hover:text-brand-light transition-colors mt-1"
            >
              hello@apexautosoft.com
            </a>
          </div>

          {/* Social + Links */}
          <div className="flex flex-col gap-4 items-start">
            <div className="flex items-center gap-3">
              {[
                { label: "LinkedIn", d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" },
                { label: "Instagram", d: "M17.5 6.5h.01M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M2 7a5 5 0 0 1 5-5h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7z" },
                { label: "GitHub", d: "M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.165 22 16.418 22 12c0-5.523-4.477-10-10-10z" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 rounded-full hover:bg-brand-accent/20 hover:text-brand-accent transition-colors"
                  aria-label={s.label}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={s.d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-brand-muted/20 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-brand-light/60">
          <p>© 2026 ApexAutosoft. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="#" className="hover:text-brand-light transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-brand-light transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
