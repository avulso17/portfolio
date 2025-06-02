import {
  ResumeAcademicExperience,
  Resume as ResumeProps,
  ResumeWorkExperience,
} from '@/constants/resume'
import { cn } from '@/lib/utils/cn'

const ResumeTitle: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ className, children }) => {
  return (
    <span className={cn('text-lg font-bold leading-normal', className)}>
      {children}
    </span>
  )
}

const ResumeRow: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ className, children }) => {
  return (
    <span className={cn('text-base font-normal leading-tight', className)}>
      {children}
    </span>
  )
}

const ResumeWorkItem: React.FC<ResumeWorkExperience> = (props) => {
  return (
    <article>
      <header>
        <h2>{props.company_name}</h2>
        <div>
          <h3>{props.role}</h3>
          <time dateTime='2023-08'>
            {props.start_date} - {props.end_date}
          </time>
        </div>
      </header>

      <section className={cn('text-base font-normal leading-tight')}>
        <h4>{props.company_name}</h4>
        <ul>
          {props.achievements.map((achieve, index) => (
            <li key={index}>{achieve}</li>
          ))}
        </ul>
      </section>
    </article>
  )
}

const ResumeEducationItem: React.FC<ResumeAcademicExperience> = (props) => {
  return (
    <div className={cn('text-base font-normal leading-tight')}>
      <span>{props.institution_name}</span>
      <span>
        {props.course_name} | {props.start_year} - {props.finish_year}
      </span>
    </div>
  )
}

const Resume: React.FC<ResumeProps> = (props) => {
  return (
    <div>
      {/* header */}
      <div>
        <h1>{props.name}</h1>
        <span>{props.role}</span>
        <span>
          {props.city} | {props.linkedin_url} | {props.portfolio_url} |{' '}
          {props.email} | {props.phone}
        </span>
        <p>{props.resume}</p>
      </div>

      {/* work experience */}
      {props.work_experience.map((item, index) => (
        <ResumeWorkItem key={index} {...item} />
      ))}

      {/* stack tecnica */}
      <div></div>

      {/* academic experience */}
      {props.academic_experience.map((item, index) => (
        <ResumeEducationItem key={index} {...item} />
      ))}

      {/* certifications */}
      <div></div>

      {/* languages */}
      <div></div>
    </div>
  )
}

export default Resume
