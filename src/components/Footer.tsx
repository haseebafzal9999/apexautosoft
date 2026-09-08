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
              href="mailto:info@apexautosoft.com"
              className="text-brand-accent text-sm font-medium hover:text-brand-light transition-colors mt-1"
            >
              info@apexautosoft.com
            </a>
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
