<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useDataTable } from '@/composables/useDateTable'
import { useAlert } from '@/composables/useAlert'
import { useRequest } from '@/composables/useRequest'
import { AutheService } from '@/services/tasks.services'
import type { ParamsDataTable } from '@/interfaces/datatable.interface'
import type { Task } from '@/interfaces/task.interface'

type ServerOptions = {
  page: number
  itemsPerPage: number
  sortBy?: { key: string; order: string }[]
}

const { items, totalItems, loading, search, itemsPerPage, loadItems, refresh } = useDataTable<Task>(
  AutheService.taskslist,
)

const createDialog = ref(false)
const dialogMode = ref<'create' | 'edit'>('create')
const taskId = ref<number | null>(null)
const taskName = ref('')
const taskDone = ref(false)
const originalName = ref('')
const originalDone = ref(false)
const currentPage = ref(1)
const { loading: saving, run: runSave, error: saveError } = useRequest()
const { loading: deleting, run: runDelete, error: deleteError } = useRequest()
const { open } = useAlert()

const headers = [
  { title: 'N°', key: 'index', sortable: false },
  { title: 'Tarea', key: 'name' },
  { title: 'Estado', key: 'done' },
  { title: 'Acciones', key: 'actions', sortable: false },
]

const formatCreatedAt = (value?: string) => {
  if (!value) return '-'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '-'
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
    .format(date)
    .replace(/\//g, '-')
}



const handleOptions = (options: ServerOptions) => {
  currentPage.value = options.page
  itemsPerPage.value = options.itemsPerPage
  const sort = options.sortBy?.[0]

  const params: ParamsDataTable = {
    page: options.page,
    limit: options.itemsPerPage,
    orderBy: sort?.key,
    orderDir: sort?.order,
    search: search.value,
  }

  loadItems(params)
}

const openCreate = () => {
  dialogMode.value = 'create'
  taskId.value = null
  taskName.value = ''
  taskDone.value = false
  createDialog.value = true
}

const openEdit = (task: Task) => {
  dialogMode.value = 'edit'
  taskId.value = task.id
  taskName.value = task.name
  taskDone.value = task.done
  originalName.value = task.name
  originalDone.value = task.done
  createDialog.value = true
}

const saveTask = async () => {
  const name = taskName.value.trim()
  if (!name) return
  try {
    if (dialogMode.value === 'create') {
      await runSave(() => AutheService.createTask({ name }))
      open('Tarea creada', 'success')
    } else if (taskId.value !== null) {
      const payload: Partial<{ name: string; done: boolean }> = {}
      if (name !== originalName.value) payload.name = name
      if (taskDone.value !== originalDone.value) payload.done = taskDone.value
      if (Object.keys(payload).length === 0) {
        createDialog.value = false
        return
      }
      await runSave(() => AutheService.patchTask(taskId.value, payload))
      open('Tarea actualizada', 'success')
    }
    createDialog.value = false
    refresh()
  } catch {
    if (saveError.value) open(saveError.value, 'error')
  }
}

const removeTask = async () => {
  if (taskId.value === null) return
  if (!confirm('¿Eliminar esta tarea?')) return
  try {
    await runDelete(() => AutheService.deleteTask(taskId.value as number))
    open('Tarea eliminada', 'success')
    createDialog.value = false
    refresh()
  } catch {
    if (deleteError.value) open(deleteError.value, 'error')
  }
}

onMounted(() => {
  loadItems({ page: 1, limit: itemsPerPage.value })
})
</script>
<template>
  <v-card flat>
    <template #title>
      <div class="d-flex align-center justify-space-between w-100">
        <span class="text-h6">Gestión de tareas</span>
        <v-btn color="primary" @click="openCreate">
          <v-icon icon="mdi-plus" />
          Agregar Tarea
        </v-btn>
      </div>
    </template>

    <v-card-text>
      <v-text-field
        v-model="search"
        label="Buscar tarea..."
        prepend-inner-icon="mdi-magnify"
        dense
        variant="outlined"
        clearable
      />
    </v-card-text> 
    <v-data-table-server
      :headers="headers"
      :items="items"
      :items-length="totalItems"
      :loading="loading"
      :items-per-page="itemsPerPage"
      @update:options="handleOptions"
      @update:items-per-page="itemsPerPage = $event"
    >
      <template #item.index="{ index }">
        {{ (currentPage - 1) * itemsPerPage + (index ?? 0) + 1 }}
      </template>
      <template #item.actions="{ item }">
        <v-btn
          icon="mdi-pencil"
          size="small"
          variant="text"
          @click="openEdit(item)"
        />
      </template>
      <template #item.done="{ value }">
        <v-icon
          :color="value ? 'green' : 'yellow-darken-2'"
          :icon="value ? 'mdi-check-circle' : 'mdi-clock-outline'"
          :title="value ? 'Completada' : 'Pendiente'"
        />
      </template>
      <template #no-data>
        <div class="text-center pa-4">No hay tareas para mostrar</div>
      </template>
    </v-data-table-server>
  </v-card>
  <v-dialog v-model="createDialog" max-width="500">
    <v-card>
      <v-card-title>
        {{ dialogMode === 'create' ? 'Crear tarea' : 'Editar tarea' }}
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="taskName"
          label="Nombre de la tarea"
          variant="outlined"
          density="comfortable"
          autofocus
          @keyup.enter="saveTask"
        />
        <v-checkbox v-model="taskDone" label="Completada" />
      </v-card-text>
      <v-card-actions class="justify-space-between">
        <v-btn
          v-if="dialogMode === 'edit'"
          color="error"
          variant="text"
          :loading="deleting"
          @click="removeTask"
        >
          Eliminar
        </v-btn>
        <div class="d-flex ga-2">
          <v-btn variant="text" @click="createDialog = false">Cancelar</v-btn>
          <v-btn
            color="primary"
            :loading="saving"
            :disabled="!taskName.trim()"
            @click="saveTask"
          >
            {{ dialogMode === 'create' ? 'Guardar' : 'Actualizar' }}
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
