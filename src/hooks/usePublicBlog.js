import { useQuery } from '@tanstack/react-query'
import { blogService } from '../services/blog.service.js'

export function usePublicBlogPosts() {
  return useQuery({
    queryKey: ['public', 'blog', 'list'],
    queryFn: blogService.list,
    staleTime: 60_000,
  })
}

export function usePublicBlogCategories() {
  return useQuery({
    queryKey: ['public', 'blog', 'categories'],
    queryFn: blogService.getCategories,
    staleTime: 60_000,
  })
}

export function usePublicBlogPost(id) {
  return useQuery({
    queryKey: ['public', 'blog', id],
    queryFn: () => blogService.show(id),
    enabled: !!id,
  })
}
