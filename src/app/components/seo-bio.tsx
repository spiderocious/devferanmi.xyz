/**
 * Server-rendered, crawlable bio prose. This is the on-page text Google ranks
 * against — written to read naturally for humans while genuinely covering the
 * role, location, and technology phrases the portfolio targets. Visually muted
 * and placed at the foot of the page; it's real content, not hidden text.
 */
export function SeoBio() {
  return (
    <section
      aria-label="About Oluwaferanmi Adeniji"
      className="mt-16 pt-10 border-t border-zinc-200 dark:border-zinc-800 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-3xl space-y-4"
    >
      <h2 className="text-md font-medium text-zinc-900 dark:text-zinc-100">
        About Oluwaferanmi Adeniji
      </h2>

      <p>
        <strong className="font-medium text-zinc-800 dark:text-zinc-200">
          Oluwaferanmi Adeniji
        </strong>{" "}
        — also written Feranmi Adeniji, Adeniji Feranmi, or Adeniji Adewale
        Oluwaferanmi — is a senior software engineer and frontend engineer from
        Ogbomoso, Nigeria, currently based in Lagos. With 7+ years building
        production software, he contributes to frontend systems serving millions of users
        and processing $1B+ in payments annually.
      </p>

      <p>
        On <strong className="font-medium text-zinc-800 dark:text-zinc-200">1 November 2020</strong>,
        at the maiden{" "}
        <strong className="font-medium text-zinc-800 dark:text-zinc-200">
          National Youth Day
        </strong>{" "}
        celebration at the State House Conference Centre in Abuja, Feranmi was
        formally recognised by{" "}
        <strong className="font-medium text-zinc-800 dark:text-zinc-200">
          President Muhammadu Buhari
        </strong>{" "}
        and the{" "}
        <strong className="font-medium text-zinc-800 dark:text-zinc-200">
          Federal Government of Nigeria
        </strong>{" "}
        as one of{" "}
        <strong className="font-medium text-zinc-800 dark:text-zinc-200">
          10 national winners
        </strong>{" "}
        of the{" "}
        <strong className="font-medium text-zinc-800 dark:text-zinc-200">
          60 Day App Challenge
        </strong>{" "}
        — a nationwide competition organised by the Federal Ministry of Youth
        and Sports Development under Minister Sunday Dare. Selected from
        thousands of entries by technical partners, he received a ₦1,000,000
        cash prize and a laptop from the Federal Government of Nigeria, and was
        named in the official MSME Africa report on the event (
        <a
          href="https://msmeafricaonline.com/national-youth-day-buhari-recognises-15-youth-innovators/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          source
        </a>
        ).
      </p>

      <p className="text-zinc-500 dark:text-zinc-400">
        Areas of focus: senior frontend engineering, micro-frontends, fintech
        and payment systems, KYC and compliance, loan management, system design,
        developer tooling, and applied AI. Open to React, TypeScript, Node.js,
        Golang, and Elixir engineering roles in Nigeria, Africa, and remote.
      </p>
    </section>
  );
}
