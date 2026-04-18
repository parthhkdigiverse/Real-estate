import { Logo } from "./Logo";

export const Footer = () => (
  <footer className="bg-paper border-t border-border/40 pt-16 md:pt-20 pb-10">
    <div className="container-luxe max-w-[1400px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 mb-12">
        {/* Left Column */}
        <div className="flex flex-col justify-between">
          <div className="mb-12 md:mb-16">
            <Logo className="!text-4xl md:!text-[46px] !text-ink !tracking-[0.12em] !font-display" />
          </div>
          
          <div className="space-y-4">
            <div className="flex flex-col items-start translate-x-[-8px]">
              <span className="font-['Great_Vibes'] text-[72px] md:text-[84px] text-[#E68A00] leading-[0.8]">Eden</span>
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-ink font-sans font-light mt-1 pl-2">
                Retirement Living
              </span>
            </div>
            <p className="text-[13px] md:text-[14px] text-ink font-sans font-medium tracking-tight translate-y-1">
              © Eden Retirement Living 2026. All rights reserved.
            </p>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="flex flex-col justify-between md:text-right md:items-end">
          <div className="mb-12 md:mb-16">
            <address className="not-italic text-ink font-sans text-[15px] md:text-base leading-[1.6] font-medium tracking-tight">
              The Sandars,<br />
              Coldharbour Lane,<br />
              Egham,<br />
              Surrey,<br />
              TW20 8TD
            </address>
          </div>

          <div className="space-y-6">
            <div className="flex md:justify-end">
              <div className="bg-[#FFED00] w-[88px] h-[88px] flex items-center justify-center">
                <span className="text-[#D0021B] text-[20px] font-bold lowercase tracking-tighter font-sans leading-none">
                  savills
                </span>
              </div>
            </div>
            <div className="space-y-1.5 md:text-right">
              <a href="tel:02037572828" className="block text-ink text-base md:text-lg font-bold font-sans">
                0203 757 2828
              </a>
              <a
                href="mailto:SunningdaleNewHomes@savills.com"
                className="block text-ink text-sm md:text-base font-bold font-sans opacity-95"
              >
                SunningdaleNewHomes@savills.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Credit */}
      <div className="border-t border-ink/80 pt-6">
        <p className="text-[13px] md:text-[14px] text-ink font-sans font-medium">
          Designed and developed by DS.Emotion
        </p>
      </div>
    </div>
  </footer>
);
