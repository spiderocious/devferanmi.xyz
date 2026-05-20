import softSkills from "../../../../data/soft-skills.json";

export function SoftSkills() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {softSkills.map((group) => (
        <div key={group.category}>
          <h3 className="text-md font-medium mb-3">{group.category}</h3>
          <ul className="flex flex-col gap-3">
            {group.skills.map((skill) => (
              <li
                key={skill}
                className="text-sm text-zinc-600 dark:text-zinc-400 list-disc ml-4"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
