"use client";
import Image from "next/image";
import { BookOpenIcon, GithubIcon, LinkedinIcon, MailIcon } from "lucide-react";
import { LinkPreview } from "../link-preview";

export default function Header() {
  return (
    <header className="mb-12">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div className="flex-1">
          <LinkPreview url="https://github.com/spiderocious/">
            {/* LCP element — explicit dimensions (matches the h-24 display box,
                72×96 at the source 433×577 aspect ratio) prevent layout shift,
                and `priority` marks it fetchpriority=high so it loads first.
                next/image serves a right-sized WebP/AVIF in place of the 133 KB
                PNG. */}
            <Image
              src="/feranmi.png"
              alt="Oluwaferanmi Adeniji"
              width={72}
              height={96}
              priority
              className="h-24 w-auto rounded-xl mt-8 mb-4"
            />
          </LinkPreview>
          <h1 className="text-2xl font-medium tracking-tight mb-4 flex items-center justify-between lg:justify-start">
            <span>Hey, I&apos;m Feranmi</span>
          </h1>

          <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 max-w-2xl">
            I&apos;m a Senior Frontend Engineer with 7+ years crafting digital
            experiences across fintech, ecommerce, and developer tools. I care
            deeply about performance, clean architecture, and building products
            that genuinely help people. Currently at{" "}
            <LinkPreview url="https://moniepoint.com">
              <span className="text-zinc-900 dark:text-zinc-100 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                Moniepoint
              </span>
            </LinkPreview>
            , where I contribute to frontend systems serving millions of users and
            processing $1B+ annually. I also maintain open-source libraries like{" "}
            <LinkPreview
              url="https://www.npmjs.com/package/connectic"
              showPreview={false}
            >
              <span className="text-zinc-900 dark:text-zinc-100 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                Connectic
              </span>
            </LinkPreview>{" "}
            and{" "}
            <LinkPreview url="https://www.npmjs.com/package/monie-utils">
              <span className="text-zinc-900 dark:text-zinc-100 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                Monie Utils
              </span>
            </LinkPreview>{" "}
            because building useful things is what gets me out of bed.
          </div>
        </div>

        <div className="flex items-center gap-5">
          <a
            className="overflow-hidden transition-all text-zinc-900/60 dark:text-zinc-100/60 hover:text-zinc-900 dark:hover:text-zinc-100"
            href="/blog"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BookOpenIcon className="h-5 w-5" />
            <p className="sr-only">blog</p>
          </a>
          <a
            target="_blank"
            className="overflow-hidden transition-all text-zinc-900/60 dark:text-zinc-100/60 hover:text-zinc-900 dark:hover:text-zinc-100"
            href="mailto:devferanmi@gmail.com"
          >
            <MailIcon className="h-5 w-5" />
            <p className="sr-only">email</p>
          </a>
          <LinkPreview url="https://github.com/spiderocious/">
            <span className="overflow-hidden transition-all text-zinc-900/60 dark:text-zinc-100/60 hover:text-zinc-900 dark:hover:text-zinc-100">
              <GithubIcon className="h-5 w-5" />
              <p className="sr-only">github</p>
            </span>
          </LinkPreview>
          <LinkPreview url="https://www.linkedin.com/in/oluwaferanmi-adeniji-aba341179/">
            <span className="overflow-hidden transition-all text-zinc-900/60 dark:text-zinc-100/60 hover:text-zinc-900 dark:hover:text-zinc-100">
              <LinkedinIcon className="h-5 w-5" />
              <p className="sr-only">linkedin</p>
            </span>
          </LinkPreview>
        </div>
      </div>
    </header>
  );
}
