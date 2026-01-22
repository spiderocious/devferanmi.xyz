interface JobCardProps {
  title: string
  company: string
  location: string
  period: string
  description: string | string[]
  className?: string
}

export function JobCard({
  title,
  company,
  location,
  period,
  description,
  className = ""
}: JobCardProps) {
  const descriptionLines = Array.isArray(description) ? description : [description]

  return (
    <div className={`group p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:shadow-lg hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 ease-out ${className}`}>
      <div className="flex items-baseline justify-between mb-1">
        <h3 className="text-md font-medium">{title}</h3>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          {period}
        </span>
      </div>
      
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
        {company} • {location}
      </p>
      
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">
        {descriptionLines.map((line, index) => (
          <span key={index}>
            {line}
            {index < descriptionLines.length - 1 && <br />}
          </span>
        ))}
      </p>
    </div>
  )
}