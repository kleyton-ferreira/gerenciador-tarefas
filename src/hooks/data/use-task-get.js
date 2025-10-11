import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { api } from '../../lib/axios'

export const useTaskGet = ({ taskId, onSucess }) => {
  return useQuery({
    queryKey: ['tasks', taskId],
    queryFn: async () => {
      const { data: task } = await api.get(`/ITENS/${taskId}`)

      onSucess(task)
      return task
    },
  })
}
