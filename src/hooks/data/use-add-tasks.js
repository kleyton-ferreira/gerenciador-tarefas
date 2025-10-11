import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

import { api } from '../../lib/axios'

export const useAddTasks = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: 'addTask',
    mutationFn: async (taskTitle) => {
      const { data: taskT } = await api.post('/ITENS', taskTitle)
      return taskT
    },
    onSuccess: (taskTitle) => {
      queryClient.setQueryData('ITENS', (currentTask) => {
        return [...currentTask, taskTitle]
      })
    },
  })
}
