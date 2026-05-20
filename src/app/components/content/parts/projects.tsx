import { ProjectCard } from "./project-card";
import { getAllProjects } from "../../../shared/projects";

export default function Projects() {
  const projects = getAllProjects();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.slug}
          slug={project.slug}
          title={project.title}
          description={project.description}
          badge={project.badge}
          techStack={project.techStack}
        />
      ))}
    </div>
  );
}
