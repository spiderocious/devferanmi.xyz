import {
  Preact,
  TypeScript,
  Redis,
  PostgreSQL,
  Nextjs,
  JavaScript,
  Vue,
  Docker,
  MySQLDark,
  MongoDBDark,
} from "@ridemountainpig/svgl-react";

export function Tools() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h3 className="text-md font-medium mb-3">Languages</h3>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <TypeScript className="w-5 h-5" />
            <span className="text-sm text-zinc-600 dark:text-zinc-400">TypeScript</span>
          </div>
          <div className="flex items-center gap-2">
            <JavaScript className="w-5 h-5" />
            <span className="text-sm text-zinc-600 dark:text-zinc-400">JavaScript</span>
          </div>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">HTML/CSS</span>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">SQL</span>
        </div>
      </div>

      <div>
        <h3 className="text-md font-medium mb-3">Frontend</h3>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Preact className="w-5 h-5" />
            <span className="text-sm text-zinc-600 dark:text-zinc-400">React</span>
          </div>
          <div className="flex items-center gap-2">
            <Nextjs className="w-5 h-5" />
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Next.js</span>
          </div>
          <div className="flex items-center gap-2">
            <Vue className="w-5 h-5" />
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Vue</span>
          </div>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">Angular</span>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">Vite</span>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">Webpack</span>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">Microfrontends</span>
        </div>
      </div>

      <div>
        <h3 className="text-md font-medium mb-3">Backend &amp; Infrastructure</h3>
        <div className="flex flex-wrap gap-3">
          <span className="text-sm text-zinc-600 dark:text-zinc-400">Node.js</span>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">Express</span>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">GCP</span>
          <div className="flex items-center gap-2">
            <Docker className="w-5 h-5" />
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Docker</span>
          </div>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">Jenkins</span>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">Apache Kafka</span>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">CI/CD</span>
        </div>
      </div>

      <div>
        <h3 className="text-md font-medium mb-3">Databases &amp; Caching</h3>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <MongoDBDark className="w-5 h-5" />
            <span className="text-sm text-zinc-600 dark:text-zinc-400">MongoDB</span>
          </div>
          <div className="flex items-center gap-2">
            <MySQLDark className="w-5 h-5" />
            <span className="text-sm text-zinc-600 dark:text-zinc-400">MySQL</span>
          </div>
          <div className="flex items-center gap-2">
            <PostgreSQL className="w-5 h-5" />
            <span className="text-sm text-zinc-600 dark:text-zinc-400">PostgreSQL</span>
          </div>
          <div className="flex items-center gap-2">
            <Redis className="w-5 h-5" />
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Redis</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-md font-medium mb-3">Tools &amp; Practices</h3>
        <div className="flex flex-wrap gap-3">
          <span className="text-sm text-zinc-600 dark:text-zinc-400">Storybook</span>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">Jest</span>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">Nx Monorepo</span>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">Git</span>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">Agile/Scrum</span>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">Code Review</span>
        </div>
      </div>

      <div>
        <h3 className="text-md font-medium mb-3">AI &amp; Domain</h3>
        <div className="flex flex-wrap gap-3">
          <span className="text-sm text-zinc-600 dark:text-zinc-400">Claude AI</span>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">Fintech Systems</span>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">Loan Management</span>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">Payment Processing</span>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">KYC/Compliance</span>
        </div>
      </div>
    </div>
  );
}
