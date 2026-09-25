import Image from "next/image";
import Link from "next/link";

export function Logo({
  compact = false,
  className = "",
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2.5 bg-white ${className}`}
      aria-label="Get Empire Forex home"
    >
      <Image
        src="/logo-mark.png"
        alt=""
        width={160}
        height={176}
        className="h-11 w-11 bg-white object-contain sm:h-12 sm:w-12"
        priority
      />
      {!compact && (
        <span className="bg-white leading-none">
          <span className="block text-[15px] font-extrabold tracking-[0.14em] text-ink sm:text-base">
            GET EMPIRE
          </span>
          <span className="mt-0.5 block text-[15px] font-extrabold tracking-[0.18em] text-ink sm:text-base">
            FOREX
          </span>
          <span className="mt-1 block text-[10px] font-medium tracking-wide text-mist">
            Black &amp; White Enrichment
          </span>
        </span>
      )}
    </Link>
  );
}
