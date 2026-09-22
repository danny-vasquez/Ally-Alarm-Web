import { Monitor, Smartphone, Watch } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { CSSProperties } from 'react'
import { useState } from 'react'
import PageHeader from '../components/layout/PageHeader'
import Select from '../components/ui/Select'
import { MdSwitchR } from '../lib/material'

interface DeviceField {
  id: string
  label: string
  value: string
  options: string[]
}

interface DeviceConfiguration {
  id: string
  name: string
  description: string
  icon: LucideIcon
  fields: DeviceField[]
  repeat: boolean
}

const INITIAL_DEVICES: DeviceConfiguration[] = [
  {
    id: 'movil',
    name: 'Móvil',
    description: 'Comportamiento de alarmas en el teléfono',
    icon: Smartphone,
    fields: [
      { id: 'sonido', label: 'Sonido', value: 'Sonar', options: ['Sonar', 'Silencio'] },
      {
        id: 'vibracion',
        label: 'Vibración',
        value: 'Vibración fuerte',
        options: ['Vibración fuerte', 'Vibración leve', 'Sin vibración'],
      },
      { id: 'notificacion', label: 'Notificación', value: 'Activado', options: ['Activado', 'Desactivado'] },
    ],
    repeat: true,
  },
  {
    id: 'smartwatch',
    name: 'Smartwatch',
    description: 'Comportamiento de alarmas en el smartwatch',
    icon: Watch,
    fields: [
      { id: 'sonido', label: 'Sonido', value: 'Silencio', options: ['Sonar', 'Silencio'] },
      {
        id: 'vibracion',
        label: 'Vibración',
        value: 'Vibración leve',
        options: ['Vibración fuerte', 'Vibración leve', 'Sin vibración'],
      },
      { id: 'pantalla', label: 'Pantalla', value: 'Encender', options: ['Encender', 'Mantener apagada'] },
    ],
    repeat: true,
  },
  {
    id: 'web',
    name: 'Web',
    description: 'Comportamiento de alarmas en el navegador',
    icon: Monitor,
    fields: [
      { id: 'sonido', label: 'Sonido', value: 'Silencio', options: ['Sonar', 'Silencio'] },
      {
        id: 'posicion-notificacion',
        label: 'Posición notificación',
        value: 'Arriba derecha',
        options: ['Arriba derecha', 'Arriba izquierda', 'Abajo derecha', 'Abajo izquierda'],
      },
    ],
    repeat: true,
  },
]

interface DeviceCardProps {
  device: DeviceConfiguration
  onFieldChange: (fieldId: string, value: string) => void
  onRepeatChange: () => void
}

function DeviceCard({ device, onFieldChange, onRepeatChange }: DeviceCardProps) {
  const Icon = device.icon

  return (
    <section className="flex min-h-[340px] flex-col rounded-lg border border-primary-container bg-surface px-4 py-5 shadow-[0_4px_4px_rgba(0,0,0,0.18)]">
      <div className="flex items-start gap-4">
        <Icon size={40} strokeWidth={1.5} className="shrink-0 text-on-primary-container" aria-hidden="true" />
        <div className="min-w-0">
          <h2 className="font-display text-2xl font-medium leading-none text-on-primary-container">{device.name}</h2>
          <p className="max-w-[240px] font-display text-sm leading-tight text-on-primary-container">{device.description}</p>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-5">
        {device.fields.map((field) => (
          <div key={field.id} className="flex items-center justify-between gap-3">
            <span className="font-display text-sm text-on-primary-container">{field.label}</span>
            <Select
              label=""
              options={field.options.map((option) => ({ value: option, label: option }))}
              value={field.value}
              onChange={(value) => onFieldChange(field.id, value)}
              className="!w-[157px] shrink-0"
            />
          </div>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between pt-8">
        <span className="font-display text-sm text-on-primary-container">Repetir</span>
        <MdSwitchR
          selected={device.repeat}
          aria-label={`${device.repeat ? 'Desactivar' : 'Activar'} repetición en ${device.name}`}
          onchange={onRepeatChange}
          style={{ '--md-switch-selected-track-color': 'var(--color-secondary)' } as CSSProperties}
        />
      </div>
    </section>
  )
}

export default function GestionDispositivosPage() {
  const [devices, setDevices] = useState(INITIAL_DEVICES)

  const updateField = (deviceId: string, fieldId: string, value: string) => {
    setDevices((current) =>
      current.map((device) =>
        device.id === deviceId
          ? {
              ...device,
              fields: device.fields.map((field) =>
                field.id === fieldId ? { ...field, value } : field,
              ),
            }
          : device,
      ),
    )
  }

  const toggleRepeat = (deviceId: string) => {
    setDevices((current) =>
      current.map((device) =>
        device.id === deviceId ? { ...device, repeat: !device.repeat } : device,
      ),
    )
  }

  return (
    <>
      <PageHeader
        title="Gestión de dispositivos"
        subtitle="Configura cómo funcionan tus alarmas en cada dispositivo"
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {devices.map((device) => (
          <DeviceCard
            key={device.id}
            device={device}
            onFieldChange={(fieldId, value) => updateField(device.id, fieldId, value)}
            onRepeatChange={() => toggleRepeat(device.id)}
          />
        ))}
      </div>
    </>
  )
}
