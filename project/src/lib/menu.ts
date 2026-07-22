import { supabase } from './supabase'
import type { MenuItem, MenuCategory } from '../types'

export async function fetchMenu(): Promise<MenuItem[]> {
  const { data, error } = await supabase
    .from('menu_items')
    .select('id,name,description,price,category,image_url,tags,popular,display_order,available')
    .eq('available', true)
    .order('display_order', { ascending: true })

  if (error) throw new Error(error.message)
  return (data ?? []) as MenuItem[]
}

export const CATEGORIES: { id: MenuCategory; label: string; emoji: string }[] = [
  { id: 'coffee',    label: 'Coffee',            emoji: '☕' },
  { id: 'breakfast', label: 'All-Day Breakfast', emoji: '🍳' },
  { id: 'desserts',  label: 'Desserts',          emoji: '🍰' },
  { id: 'teas',      label: 'Artisan Teas',      emoji: '🍵' },
]

export function tagLabel(tag: string): string {
  switch (tag) {
    case 'veg':   return 'Veg'
    case 'vegan': return 'Vegan'
    case 'gf':    return 'Gluten-Free'
    default:      return tag
  }
}
