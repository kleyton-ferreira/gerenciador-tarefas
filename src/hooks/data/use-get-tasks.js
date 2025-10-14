import { useQuery } from '@tanstack/react-query'

import { taskQueryKeys } from '../../keys/queries'
import { api } from '../../lib/axios'

export const useGetTasks = () => {
  return useQuery({
    queryKey: taskQueryKeys.getAll(),
    queryFn: async () => {
      const { data: taskItems } = await api.get('/ITENS')
      return taskItems
    },
  })
}

// ESSA E UMA REQUISIÇAO PRA EXIBIR AS TAREFAS NA TELA DO USUARIO!
