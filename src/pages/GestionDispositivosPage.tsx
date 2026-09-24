import type { CSSProperties } from 'react'
import { useState } from 'react'
import PageHeader from '../components/layout/PageHeader'
import Select from '../components/ui/Select'
import { MdSwitchR } from '../lib/material'
import iconoTelefono from '../assets/icono-telefono-inteligente.svg'
import iconoSmartwatch from '../assets/icono-smartwatch.svg'
import iconoWeb from '../assets/icono-web.svg'

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
  icon: string
  fields: DeviceField[]
  repeat: boolean
}

const INITIAL_DEVICES: DeviceConfiguration[] = [
  {
    id: 'movil',
    name: 'Móvil',
    description: 'Comportamiento de alarmas en el teléfono',
    icon: iconoTelefono,
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
    icon: iconoSmartwatch,
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
    icon: iconoWeb,
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
  // Espaciadores manuales del diseño (gestionDispositivos.html): un div
  // vacío de 10px entre el header y los campos, y otro entre el último
  // campo y "Repetir" — 80px en vez de 10px cuando la tarjeta tiene menos
  // de 3 campos (Web), para compensar la fila que falta y mantener el
  // switch de "Repetir" a la misma altura en las 3 tarjetas.
  const preRepeatSpacer = 15 + (3 - device.fields.length) * 40

  return (
    <section className="flex min-h-[340px] min-w-0 flex-col rounded-lg border border-primary-container bg-surface px-5 py-6 shadow-[0_4px_4px_rgba(0,0,0,0.18)]">
      <div className="flex items-start gap-5">
        <img
          src={device.icon}
          alt=""
          className="h-13.75 w-13.75 shrink-0 object-contain"
        />
        <div className="min-w-0">
          <h2 className="font-display text-[32px] font-medium leading-none text-on-primary-container">{device.name}</h2>
          <p className="max-w-[240px] font-display text-sm leading-tight text-on-primary-container">{device.description}</p>
        </div>
      </div>

      <div className="h-8" />

      <div className="mt-10 flex flex-col gap-7.5 px-1">
        {device.fields.map((field) => (
          <div key={field.id} className="flex min-w-0 items-center justify-between gap-3">
            <span className="shrink-0 font-display text-sm text-on-primary-container">{field.label}</span>
            <Select
              label=""
              options={field.options.map((option) => ({ value: option, label: option }))}
              value={field.value}
              onChange={(value) => onFieldChange(field.id, value)}
            />
          </div>
        ))}
      </div>

      <div className="h-8" />

      <div className="mt-auto flex items-center justify-between pt-10">
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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
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
