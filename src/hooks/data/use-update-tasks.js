import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateTasks = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['updateTask', taskId],
    mutationFn: async (newTask) => {
      const response = await fetch(` http://localhost:3000/ITENS/${taskId} `, {
        method: 'PATCH',
        body: JSON.stringify({
          title: newTask.title.trim(),
          time: newTask.time.trim(),
          description: newTask.description.trim(),
        }),
      })
      if (!response.ok) {
        throw new Error()
      }
      const updateTask = await response.json()
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
