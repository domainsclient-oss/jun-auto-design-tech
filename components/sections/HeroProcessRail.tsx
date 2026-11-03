import { Container } from "@/components/ui/Container";
import { ProcessIcon } from "@/components/ui/ProcessIcon";
import { processes } from "@/lib/site";

/** Glass process cards along the bottom of the hero; swipeable on small screens. */
export function HeroProcessRail() {
  return (
    <div className="animate-fade-up pb-10 sm:pb-14" style={{ animationDelay: "500ms" }}>
      <Container>
        <div className="mb-5 flex items-center gap-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/60">
            Our Process
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" aria-hidden />
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/40 lg:hidden">
            Swipe →
          </span>
        </div>

        <ol className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
          {processes.map((process, index) => (
            <li key={process.id} className="w-[64%] shrink-0 snap-start sm:w-[38%] lg:w-auto">
              <a
                href={`#${process.id}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:border-rose-500/40 hover:bg-white/[0.09] hover:shadow-2xl hover:shadow-rose-950/40"
              >
                <span
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-rose-600 to-rose-500 transition-transform duration-500 group-hover:scale-x-100"
                  aria-hidden
                />
                <span
                  className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-rose-600/0 blur-2xl transition-colors duration-500 group-hover:bg-rose-600/30"
                  aria-hidden
                />

                <div className="relative flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-600/15 text-rose-200 ring-1 ring-inset ring-rose-500/30 transition-colors duration-500 group-hover:bg-rose-600 group-hover:text-white group-hover:ring-rose-600">
                    <ProcessIcon id={process.id} className="h-5 w-5" />
                  </span>
                  <span className="font-display text-sm font-medium tabular-nums text-white/35 transition-colors duration-500 group-hover:text-rose-200">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <p className="relative mt-7 font-display text-base font-semibold text-white">
                  {process.shortTitle}
                </p>
                <p className="relative mt-1 text-xs leading-relaxed text-white/55">
                  {process.caption}
                </p>

                <span className="relative mt-5 flex items-center gap-2 text-xs font-semibold text-rose-200 opacity-70 transition-all duration-500 group-hover:gap-3 group-hover:opacity-100">
                  Learn more
                  <span aria-hidden>→</span>
                </span>
              </a>
            </li>
          ))}
        </ol>
      </Container>
    </div>
  );
}
