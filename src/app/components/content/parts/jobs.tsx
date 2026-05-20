import { JobCard } from "./job-card";
import jobs from "../../../../data/jobs.json";

export function Jobs() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {jobs.map((job) => (
        <JobCard
          key={`${job.company}-${job.period}`}
          title={job.title}
          company={job.company}
          location={job.location}
          period={job.period}
          description={job.description}
        />
      ))}
    </div>
  );
}
