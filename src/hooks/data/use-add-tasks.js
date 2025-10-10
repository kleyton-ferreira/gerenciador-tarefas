import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export const useAddTasks = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: 'addTask',
    mutationFn: async (taskTitle) => {
      const { data: taskT } = await axios.post(
        'http://localhost:3000/ITENS',
        taskTitle
      )
      return taskT
    },
    onSuccess: (taskTitle) => {
      queryClient.setQueryData('ITENS', (currentTask) => {
        return [...currentTask, taskTitle]
      })
    },
  })
}
