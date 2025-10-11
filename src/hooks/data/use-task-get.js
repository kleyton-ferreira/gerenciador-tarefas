import { useQuery } from '@tanstack/react-query'

import { taskQueryKeys } from '../../keys/queries'
import { api } from '../../lib/axios'

export const useTaskGet = ({ taskId, onSucess }) => {
  return useQuery({
    queryKey: taskQueryKeys.getOne(taskId),
    queryFn: async () => {
      const { data: task } = await api.get(`/ITENS/${taskId}`)
      onSucess(task)
      return task
    },
  })
}
