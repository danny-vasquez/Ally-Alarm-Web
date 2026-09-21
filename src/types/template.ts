export interface TemplateActivity {
  id: string
  activity: string
  time: string
  message: string
}

export interface TemplateCategory {
  id: string
  name: string
  color: string
  activities: TemplateActivity[]
}
