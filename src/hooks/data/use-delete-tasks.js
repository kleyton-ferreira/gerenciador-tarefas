import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

import { api } from '../../lib/axios'

export const useDeleteTasks = (taskItens) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['deleteTask', taskItens],
    mutationFn: async () => {
      const { data: deleteT } = await api.delete(`/ITENS/${taskItens}`)
      return deleteT
    },
    onSuccess: (taskItens) => {
      queryClient.setQueryData('ITENS', (currentTask) => {
        return currentTask.filter((taskDel) => taskDel.id !== taskItens.id)
      })
    },
  })
}
