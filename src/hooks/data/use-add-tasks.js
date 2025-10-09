import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useAddTasks = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: 'addTask',
    mutationFn: async (taskTitle) => {
      const response = await fetch('http://localhost:3000/ITENS', {
        method: 'POST',
        body: JSON.stringify(taskTitle),
      })
      if (!response.ok) {
        throw new Error('Erro ao adicionar tarefa.')
      }
      return response.json()
    },
    onSuccess: (taskTitle) => {
      queryClient.setQueryData('ITENS', (currentTask) => {
        return [...currentTask, taskTitle]
      })
    },
  })
}
