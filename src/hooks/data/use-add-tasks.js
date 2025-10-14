import { useMutation, useQueryClient } from '@tanstack/react-query'

import { taskMutationKeys } from '../../keys/mutation'
import { taskQueryKeys } from '../../keys/queries'
import { api } from '../../lib/axios'

export const useAddTasks = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: taskMutationKeys.add(),
    mutationFn: async (taskTitle) => {
      const { data: taskT } = await api.post('/ITENS', taskTitle)
      return taskT
    },
    onSuccess: (taskTitle) => {
      queryClient.setQueryData(taskQueryKeys.getAll(), (currentTask) => {
        return [...currentTask, taskTitle]
      })
    },
  })
}

// ESSA REQUISIÇAO E PRA CIRAR TAREFAS!
