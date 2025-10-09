import { useQuery } from '@tanstack/react-query'

export const useGetTasks = () => {
  return useQuery({
    queryKey: 'ITENS',
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/ITENS', {
        method: 'GET',
      })
      const taskItems = await response.json()
      return taskItems
    },
  })
}
