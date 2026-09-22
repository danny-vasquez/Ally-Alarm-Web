import PageHeader from '../components/layout/PageHeader'
import SettingsItem from '../components/settings/SettingsItem'
import settingsData from '../data/settings.json'
import type { SettingsItem as SettingsItemType } from '../types/settingsItem'

const settingsItems = settingsData as SettingsItemType[]

export default function ConfiguracionPage() {
  return (
    <>
      <PageHeader
        title="Configuración"
        subtitle="Configuraciones disponibles"
      />

      <div className="flex flex-1 flex-col gap-6">
        {settingsItems.map((item) => (
          <SettingsItem key={item.id} item={item} />
        ))}
      </div>
    </>
  )
}
