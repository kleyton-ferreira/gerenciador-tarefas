import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { api } from '../../lib/axios'

export const useGetTasks = () => {
  return useQuery({
    queryKey: 'ITENS',
    queryFn: async () => {
      const { data: taskItems } = await api.get('/ITENS')
      return taskItems
    },
  })
}
