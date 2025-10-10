import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useGetTasks = () => {
  return useQuery({
    queryKey: 'ITENS',
    queryFn: async () => {
      const { data: taskItems } = await axios.get('http://localhost:3000/ITENS')
      return taskItems
    },
  })
}
