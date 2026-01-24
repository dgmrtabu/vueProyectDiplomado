import api from '@/api/axios'
import type { Credentials } from '@/interfaces/auth.interface'
import type { ParamsDataTable } from '@/interfaces/datatable.interface'
import type { CreateTaskPayload, PaginatedResponse, Task } from '@/interfaces/task.interface'

export const AutheService = {
  async taskslist(options: ParamsDataTable) {
    const { data } = await api.get<PaginatedResponse<Task>>('/tasks', { params: options })
    return { data: data.data, total: data.total }
  },

  async getTask(id: number) {
    const { data } = await api.get<Task>(`/tasks/${id}`)
    return data
  },

  async createTask(payload: CreateTaskPayload) {
    const { data } = await api.post<Task>('/tasks', payload)
    return data
  },

  async putTask(id: number, payload: Partial<CreateTaskPayload & { done: boolean }>) {
    const { data } = await api.put<Task>(`/tasks/${id}`, payload)
    return data
  },

  async patchTask(id: number, payload: Partial<{ done: boolean }>) {
    const { data } = await api.patch<Task>(`/tasks/${id}`, payload)
    return data
  },

  async deleteTask(id: number) {
    await api.delete(`/tasks/${id}`)
  }
}
