import { useQuery } from '@tanstack/react-query'

export const useTaskGet = ({ taskId, onSucess }) => {
  return useQuery({
    queryKey: ['tasks', taskId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/ITENS/${taskId}`, {
        method: 'GET',
      })
      const task = await response.json()
      onSucess(task)
      return task
    },
  })
}
