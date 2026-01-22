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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";
import { LinkPreview } from "../link-preview";
import Projects from "./parts/projects";
import { Jobs } from "./parts/jobs";

export default function Content() {
  return (
    <div className="text-zinc-900 dark:text-zinc-100 min-h-screen flex flex-col">
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8">
        <section>
          <Tabs defaultValue="projects" className="flex flex-col gap-4">
            <TabsList className="text-muted-foreground inline-flex h-10 w-full lg:w-fit items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-1">
              <TabsTrigger
                value="projects"
                className="!bg-transparent !border-none !shadow-none !font-medium data-[state=active]:!bg-white dark:data-[state=active]:!bg-zinc-800 data-[state=active]:!text-zinc-900 dark:data-[state=active]:!text-zinc-100 !text-zinc-600 dark:!text-zinc-400 transition-all duration-300 ease-out"
              >
                Projects
              </TabsTrigger>
              <TabsTrigger
                value="experience"
                className="!bg-transparent !border-none !shadow-none !font-medium data-[state=active]:!bg-white dark:data-[state=active]:!bg-zinc-800 data-[state=active]:!text-zinc-900 dark:data-[state=active]:!text-zinc-100 !text-zinc-600 dark:!text-zinc-400 transition-all duration-300 ease-out"
              >
                Experience
              </TabsTrigger>
              <TabsTrigger
                value="tools"
                className="!bg-transparent !border-none !shadow-none !font-medium data-[state=active]:!bg-white dark:data-[state=active]:!bg-zinc-800 data-[state=active]:!text-zinc-900 dark:data-[state=active]:!text-zinc-100 !text-zinc-600 dark:!text-zinc-400 transition-all duration-300 ease-out"
              >
                Tools
              </TabsTrigger>
            </TabsList>

            <TabsContent value="projects" className="flex-1 outline-none mt-8">
              <Projects />
            </TabsContent>

            <TabsContent
              value="experience"
              className="flex-1 outline-none mt-8"
            >
              <Jobs />
            </TabsContent>

            <TabsContent value="tools" className="flex-1 outline-none mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-md font-medium mb-3">Languages</h3>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                      <TypeScript className="w-5 h-5" />
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        TypeScript
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <JavaScript className="w-5 h-5" />
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        JavaScript
                      </span>
                    </div>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      HTML/CSS
                    </span>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      SQL
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-md font-medium mb-3">Frontend</h3>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                      <Preact className="w-5 h-5" />
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        React
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Nextjs className="w-5 h-5" />
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        Next.js
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Vue className="w-5 h-5" />
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        Vue
                      </span>
                    </div>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      Angular
                    </span>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      Vite
                    </span>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      Webpack
                    </span>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      Microfrontends
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-md font-medium mb-3">
                    Backend & Infrastructure
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      Node.js
                    </span>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      Express
                    </span>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      GCP
                    </span>
                    <div className="flex items-center gap-2">
                      <Docker className="w-5 h-5" />
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        Docker
                      </span>
                    </div>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      Jenkins
                    </span>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      Apache Kafka
                    </span>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      CI/CD
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-md font-medium mb-3">
                    Databases & Caching
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                      <MongoDBDark className="w-5 h-5" />
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        MongoDB
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MySQLDark className="w-5 h-5" />
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        MySQL
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PostgreSQL className="w-5 h-5" />
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        PostgreSQL
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Redis className="w-5 h-5" />
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        Redis
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-md font-medium mb-3">
                    Tools & Practices
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      Storybook
                    </span>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      Jest
                    </span>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      Nx Monorepo
                    </span>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      Git
                    </span>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      Agile/Scrum
                    </span>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      Code Review
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-md font-medium mb-3">AI & Domain</h3>
                  <div className="flex flex-wrap gap-3">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      Claude AI
                    </span>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      Fintech Systems
                    </span>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      Loan Management
                    </span>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      Payment Processing
                    </span>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      KYC/Compliance
                    </span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  );
}
