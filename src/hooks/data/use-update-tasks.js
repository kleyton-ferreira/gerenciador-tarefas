import { useMutation, useQueryClient } from '@tanstack/react-query'

import { taskMutationKeys } from '../../keys/mutation'
import { taskQueryKeys } from '../../keys/queries'
import { api } from '../../lib/axios'

export const useUpdateTasks = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: taskMutationKeys.update(),
    mutationFn: async (data) => {
      const { data: updateTask } = await api.patch(`/ITENS/${taskId}`, {
        title: data?.title?.trim(),
        description: data?.description?.trim(),
        time: data?.time,
        status: data?.status,
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

// ESA E UMA REQUISIÇAO QUE ATUALIZA UM DADO QUE JA EXISTE NO SERVIDOR!
