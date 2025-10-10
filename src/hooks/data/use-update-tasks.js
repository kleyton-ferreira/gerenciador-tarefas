import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export const useUpdateTasks = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['updateTask', taskId],
    mutationFn: async (newTask) => {
      const { data: updateTask } = await axios.patch(
        `http://localhost:3000/ITENS/${taskId}`,
        {
          title: newTask.title.trim(),
          time: newTask.time.trim(),
          description: newTask.description.trim(),
        }
      )

      queryClient.setQueryData('ITENS', (oldTasks) => {
        return oldTasks.map((oldUpdate) => {
          if (oldUpdate.id === taskId) {
            return updateTask
          }
          return oldUpdate
        })
      })
    },
  })
}
