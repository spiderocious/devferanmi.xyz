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
        He is a builder and problem solver at heart: a React engineer and
        TypeScript engineer who ships fintech systems, developer tools, and
        AI-powered products. His core stack is React, Next.js, TypeScript, and
        Node.js, with hands-on experience in micro-frontend architecture,
        design systems, and performance engineering. He is actively growing
        toward lead engineer, staff engineer, and principal engineer roles, and
        is exploring backend systems in Golang and Elixir.
      </p>

      <p>
        As a software engineer in Nigeria and across Africa, Feranmi is open to
        senior, lead, and principal engineering opportunities — whether based in
        Ogbomoso, Lagos, elsewhere in Nigeria, remote across Africa, or
        worldwide. He maintains open-source libraries including Connectic and
        Monie Utils, and considers himself part of a generation of emerging
        engineering talent solving real problems on the continent.
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
