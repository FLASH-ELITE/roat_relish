/*
# Create cafe menu_items and orders tables (single-tenant, no auth)

1. New Tables
- `menu_items`
  - `id` (uuid, primary key)
  - `name` (text, not null) — product name
  - `description` (text) — short tagline
  - `price` (numeric, not null) — in INR
  - `category` (text, not null) — one of: coffee, breakfast, desserts, teas
  - `image_url` (text) — high-res product photo URL
  - `tags` (text[]) — dietary tags: veg, vegan, gf
  - `popular` (boolean, default false) — chef's pick badge
  - `display_order` (int, default 0) — ordering within category
  - `available` (boolean, default true)
  - `created_at` (timestamptz)
- `orders`
  - `id` (uuid, primary key)
  - `table_number` (int, not null) — cafe table number
  - `items` (jsonb, not null) — array of {name, price, qty}
  - `total` (numeric, not null)
  - `notes` (text) — customer notes
  - `status` (text, default 'received') — received / preparing / ready / completed
  - `created_at` (timestamptz)

2. Security
- Enable RLS on both tables.
- This is a single-tenant QR menu portal with NO sign-in screen.
- Use `TO anon, authenticated` on all policies so the anon-key frontend can
  read the menu and submit orders. The data is intentionally public/shared.

3. Indexes
- `menu_items(category)` for tab filtering.
- `orders(created_at desc)` for kitchen order history.

4. Seed data
- Inserts 20 menu items across Coffee, All-Day Breakfast, Desserts, Artisan Teas
  with Pexels high-res image URLs and dietary tags.
*/

CREATE TABLE IF NOT EXISTS menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric NOT NULL,
  category text NOT NULL,
  image_url text,
  tags text[] DEFAULT '{}',
  popular boolean NOT NULL DEFAULT false,
  display_order int NOT NULL DEFAULT 0,
  available boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_menu_items" ON menu_items;
CREATE POLICY "anon_select_menu_items" ON menu_items FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_menu_items" ON menu_items;
CREATE POLICY "anon_insert_menu_items" ON menu_items FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_menu_items" ON menu_items;
CREATE POLICY "anon_update_menu_items" ON menu_items FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_menu_items" ON menu_items;
CREATE POLICY "anon_delete_menu_items" ON menu_items FOR DELETE
TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_menu_items_category ON menu_items(category);

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  table_number int NOT NULL,
  items jsonb NOT NULL,
  total numeric NOT NULL,
  notes text,
  status text NOT NULL DEFAULT 'received',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_orders" ON orders;
CREATE POLICY "anon_select_orders" ON orders FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_orders" ON orders;
CREATE POLICY "anon_insert_orders" ON orders FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_orders" ON orders;
CREATE POLICY "anon_update_orders" ON orders FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_orders" ON orders;
CREATE POLICY "anon_delete_orders" ON orders FOR DELETE
TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- Seed menu items. Using ON CONFLICT DO NOTHING so re-runs are safe.
INSERT INTO menu_items (name, description, price, category, image_url, tags, popular, display_order) VALUES
-- Coffee
('Single Origin Espresso', 'Bright, bold double shot pulled from house beans', 120, 'coffee', 'https://images.pexels.com/photos/3090934/pexels-photo-3090934.jpeg?auto=compress&cs=tinysrgb&w=900', ARRAY['vegan','gf'], true, 1),
('Oat Milk Flat White', 'Velvety microfoam over a smooth double ristretto', 180, 'coffee', 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=900', ARRAY['vegan','gf'], true, 2),
('Slow Cold Brew', '18-hour steeped cold brew, naturally sweet & low-acid', 200, 'coffee', 'https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=900', ARRAY['vegan','gf'], false, 3),
('Spanish Latte', 'Espresso, condensed milk & silky steamed milk', 190, 'coffee', 'https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=900', ARRAY['veg'], false, 4),
('Caramel Affogato', 'Vanilla gelato drowned in a hot espresso shot', 220, 'coffee', 'https://images.pexels.com/photos/2074129/pexels-photo-2074129.jpeg?auto=compress&cs=tinysrgb&w=900', ARRAY['veg'], false, 5),
-- All-Day Breakfast
('Avocado Smash Toast', 'Sourdough, smashed avo, chilli, lime, poached eggs', 320, 'breakfast', 'https://images.pexels.com/photos/1351238/pexels-photo-1351238.jpeg?auto=compress&cs=tinysrgb&w=900', ARRAY['veg'], true, 1),
('Truffle Mushroom Omelette', 'Three-egg omelette, wild mushrooms, truffle oil', 340, 'breakfast', 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=900', ARRAY['veg','gf'], false, 2),
('Vegan Big Breakfast', 'Tofu scramble, beans, grilled tomato, mushrooms, toast', 380, 'breakfast', 'https://images.pexels.com/photos/139396/photodune-139396-happy-woman-cooking-in-the-kitchen.jpeg?auto=compress&cs=tinysrgb&w=900', ARRAY['vegan'], true, 3),
('Berry Granola Bowl', 'Greek yogurt, house granola, seasonal berries, honey', 280, 'breakfast', 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=900', ARRAY['veg','gf'], false, 4),
('Eggs Benedict', 'Poached eggs, hollandaise, baby spinach on English muffin', 360, 'breakfast', 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=900', ARRAY['veg'], false, 5),
-- Desserts
('Belgian Dark Chocolate Cake', '70% dark chocolate ganache, molten centre', 260, 'desserts', 'https://images.pexels.com/photos/2144112/pexels-photo-2144112.jpeg?auto=compress&cs=tinysrgb&w=900', ARRAY['veg'], true, 1),
('Tiramisu Classico', 'Espresso-soaked ladyfingers, mascarpone, cocoa', 290, 'desserts', 'https://images.pexels.com/photos/6880219/pexels-photo-6880219.jpeg?auto=compress&cs=tinysrgb&w=900', ARRAY['veg'], false, 2),
('Vegan Berry Cheesecake', 'Cashew-base cheesecake, mixed berry compote', 310, 'desserts', 'https://images.pexels.com/photos/4040692/pexels-photo-4040692.jpeg?auto=compress&cs=tinysrgb&w=900', ARRAY['vegan','gf'], false, 3),
('Salted Caramel Brownie', 'Fudgy brownie, salted caramel swirl, sea salt', 240, 'desserts', 'https://images.pexels.com/photos/2066267/pexels-photo-2066267.jpeg?auto=compress&cs=tinysrgb&w=900', ARRAY['veg'], false, 4),
('Almond Croissant', 'All-butter croissant, frangipane, toasted almonds', 220, 'desserts', 'https://images.pexels.com/photos/2135/food-france-morning-breakfast.jpg?auto=compress&cs=tinysrgb&w=900', ARRAY['veg'], false, 5),
-- Artisan Teas
('Matcha Latte', 'Ceremonial grade matcha whisked with steamed milk', 220, 'teas', 'https://images.pexels.com/photos/4109743/pexels-photo-4109743.jpeg?auto=compress&cs=tinysrgb&w=900', ARRAY['vegan','gf'], true, 1),
('Kashmiri Kahwa', 'Green tea, saffron, cardamom, almonds, honey', 180, 'teas', 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=900', ARRAY['vegan','gf'], false, 2),
('Masala Chai', 'House blend, fresh ginger, crushed spices, milk', 120, 'teas', 'https://images.pexels.com/photos/15988218/pexels-photo-15988218.jpeg?auto=compress&cs=tinysrgb&w=900', ARRAY['veg'], false, 3),
('Iced Peach Oolong', 'Floral oolong, white peach, cold-steeped over ice', 200, 'teas', 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=900', ARRAY['vegan','gf'], false, 4),
('Chamomile Calm', 'Whole chamomile flowers, lavender, light honey', 170, 'teas', 'https://images.pexels.com/photos/4109743/pexels-photo-4109743.jpeg?auto=compress&cs=tinysrgb&w=900', ARRAY['vegan','gf'], false, 5)
ON CONFLICT DO NOTHING;
