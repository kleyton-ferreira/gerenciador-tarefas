import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useTaskGet = ({ taskId, onSucess }) => {
  return useQuery({
    queryKey: ['tasks', taskId],
    queryFn: async () => {
      const { data: task } = await axios.get(
        `http://localhost:3000/ITENS/${taskId}`
      )

      onSucess(task)
      return task
    },
  })
}
