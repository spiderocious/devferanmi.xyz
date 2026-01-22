"use client";
import { GithubIcon, LinkedinIcon, MailIcon } from "lucide-react";
import { LinkPreview } from "../link-preview";

export default function Header() {
  return (
    <header className="mb-12">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div className="flex-1">
          <h1 className="text-2xl font-medium tracking-tight mb-4 flex items-center justify-between lg:justify-start">
            <span>Hey, I&apos;m Feranmi</span>
          </h1>

          <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 max-w-2xl">
            Senior Frontend Engineer with 7+ years building content creation,
            ecommerce, developer tools and financial platforms. Expert in
            React/TypeScript/GraphQL with experience scaling applications to
            10M+ users. Currently at{" "}
            <LinkPreview url="https://moniepoint.com">
              <span className="text-zinc-900 dark:text-zinc-100 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                Moniepoint
              </span>
            </LinkPreview>
            . Creator of{" "}
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
            </LinkPreview>
            .
          </div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 max-w-2xl">
            I'm a Senior Frontend Engineer with 7+ years crafting digital
            experiences across fintech, ecommerce, and developer tools. I care
            deeply about performance, clean architecture, and building products
            that genuinely help people. Currently at{" "}
            <LinkPreview url="https://moniepoint.com">
              <span className="text-zinc-900 dark:text-zinc-100 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                Moniepoint
              </span>
            </LinkPreview>
            , where I lead frontend systems serving 10M+ users and processing
            $1B+ annually. I also maintain open-source libraries like{" "}
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
            — because building useful things is what gets me out of bed.
          </div>
        </div>

        <div className="flex items-center gap-5">
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
