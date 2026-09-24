import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import PageHeader from '../components/layout/PageHeader'
import TemplateCard from '../components/templates/TemplateCard'
import CreateTemplateModal from '../components/templates/CreateTemplateModal'
import DeleteTemplateModal from '../components/templates/DeleteTemplateModal'
import { useTemplates } from '../context/TemplatesContext'
import userData from '../data/user.json'
import type { TemplateCategory } from '../types/template'
import type { AppUser } from '../types/user'

const user = userData as AppUser

export default function PlantillasPage() {
  const navigate = useNavigate()
  const { templates, deleteTemplate } = useTemplates()
  const [templateToDelete, setTemplateToDelete] =
    useState<TemplateCategory | null>(null)
  const [createModalOpen, setCreateModalOpen] = useState(false)

  const confirmDelete = () => {
    if (!templateToDelete) return
    deleteTemplate(templateToDelete.id)
    setTemplateToDelete(null)
  }

  return (
    <>
      <PageHeader
        title={`¡Estas son tus plantillas, ${user.name}!`}
        subtitle="Organiza tus alarmas con plantillas para tus rutinas según la categoría."
      />

      <div className="flex justify-end">
        <Button
          variant="tonal"
          icon={<Plus size={14} strokeWidth={3} />}
          className="w-50 text-[16px] font-bold flex"
          onClick={() => setCreateModalOpen(true)}
        >
          Crear Plantilla
        </Button>
      </div>

      <div className="flex flex-1 flex-col gap-7">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onEdit={(t) => navigate(`/plantillas/editar/${t.id}`)}
            onDelete={setTemplateToDelete}
          />
        ))}
      </div>

      <DeleteTemplateModal
        open={templateToDelete !== null}
        templateName={templateToDelete?.name ?? ''}
        onCancel={() => setTemplateToDelete(null)}
        onConfirm={confirmDelete}
      />

      <CreateTemplateModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onContinue={(categoryId) => {
          setCreateModalOpen(false)
          navigate(`/plantillas/editar/${categoryId}`)
        }}
      />
    </>
  )
}
