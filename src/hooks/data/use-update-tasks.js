import { useMutation, useQueryClient } from '@tanstack/react-query'

import { taskMutationKeys } from '../../keys/mutation'
import { taskQueryKeys } from '../../keys/queries'
import { api } from '../../lib/axios'

export const useUpdateTasks = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: taskMutationKeys.update(),
    mutationFn: async (newTask) => {
      const { data: updateTask } = await api.patch(`/ITENS/${taskId}`, {
        title: newTask.title.trim(),
        time: newTask.time.trim(),
        description: newTask.description.trim(),
      })

      queryClient.setQueryData(taskQueryKeys.getAll(), (oldTasks) => {
        return oldTasks.map((oldUpdate) => {
          if (oldUpdate.id === taskId) {
            return updateTask
          }
          return oldUpdate
        })
      })
      // AQUI ESTOU ATUALIZANDO O CACHE DE UMA TAREFA ESPECIFICA!
      queryClient.setQueryData([taskQueryKeys.getOne(taskId), updateTask])
    },
  })
}
