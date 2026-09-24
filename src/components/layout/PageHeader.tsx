interface PageHeaderProps {
  title: string
  subtitle: string
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-[10.33px]">
      <h1 className="font-display text-[32px] font-bold text-on-primary-container lg:text-[32px]">
        {title}
      </h1>
      <p className="font-display text-base text-on-primary-container">
        {subtitle}
      </p>
    </div>
  )
}
