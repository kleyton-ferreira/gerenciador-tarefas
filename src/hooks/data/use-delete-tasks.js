import { useMutation, useQueryClient } from '@tanstack/react-query'

import { taskMutationKeys } from '../../keys/mutation'
import { taskQueryKeys } from '../../keys/queries'
import { api } from '../../lib/axios'

export const useDeleteTasks = (taskItens) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: taskMutationKeys.delete(),
    mutationFn: async () => {
      const { data: deleteT } = await api.delete(`/ITENS/${taskItens}`)
      return deleteT
    },
    onSuccess: (taskItens) => {
      queryClient.setQueryData(taskQueryKeys.getAll(), (currentTask) => {
        return currentTask.filter((taskDel) => taskDel.id !== taskItens.id)
      })
    },
  })
}
