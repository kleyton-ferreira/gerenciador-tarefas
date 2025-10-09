import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteTasks = (taskItens) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['deleteTask', taskItens],
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3000/ITENS/${taskItens}`, {
        method: 'DELETE',
      })
      return response.json()
    },
    onSuccess: (taskItens) => {
      queryClient.setQueryData('ITENS', (currentTask) => {
        return currentTask.filter((taskDel) => taskDel.id !== taskItens.id)
      })
    },
  })
}
