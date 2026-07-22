export type DietaryTag = 'veg' | 'vegan' | 'gf'
export type MenuCategory = 'coffee' | 'breakfast' | 'desserts' | 'teas'

export interface MenuItem {
  id: string
  name: string
  description: string | null
  price: number
  category: MenuCategory
  image_url: string | null
  tags: DietaryTag[]
  popular: boolean
  display_order: number
  available: boolean
}

export interface CartLine {
  item: MenuItem
  qty: number
}
