/*
# Update menu item images to match dish names

1. Changes
- Updates `image_url` on 20 menu_items rows so each photo actually depicts
  the named dish. Previously several items reused generic/incorrect photos
  (e.g. "Vegan Big Breakfast" showed a woman cooking; "Chamomile Calm" and
  "Matcha Latte" shared the same image; "Kashmiri Kahwa" used a coffee photo).
- Every new URL was verified to return HTTP 200 and to visually match the
  dish via Pexels search results.

2. Security
- No schema or RLS changes. Data-only UPDATE on existing rows.

3. Important notes
- Updates are scoped by dish name (unique within the seeded set) so re-runs
  are safe and idempotent.
- No data is lost — only the image_url column changes.
*/

-- Coffee
UPDATE menu_items SET image_url = 'https://images.pexels.com/photos/21366984/pexels-photo-21366984.jpeg?auto=compress&cs=tinysrgb&w=900' WHERE name = 'Single Origin Espresso';
UPDATE menu_items SET image_url = 'https://images.pexels.com/photos/33216070/pexels-photo-33216070.jpeg?auto=compress&cs=tinysrgb&w=900' WHERE name = 'Oat Milk Flat White';
UPDATE menu_items SET image_url = 'https://images.pexels.com/photos/18997241/pexels-photo-18997241.jpeg?auto=compress&cs=tinysrgb&w=900' WHERE name = 'Slow Cold Brew';
UPDATE menu_items SET image_url = 'https://images.pexels.com/photos/28721319/pexels-photo-28721319.jpeg?auto=compress&cs=tinysrgb&w=900' WHERE name = 'Spanish Latte';
UPDATE menu_items SET image_url = 'https://images.pexels.com/photos/12914800/pexels-photo-12914800.jpeg?auto=compress&cs=tinysrgb&w=900' WHERE name = 'Caramel Affogato';

-- All-Day Breakfast
UPDATE menu_items SET image_url = 'https://images.pexels.com/photos/12716164/pexels-photo-12716164.jpeg?auto=compress&cs=tinysrgb&w=900' WHERE name = 'Avocado Smash Toast';
UPDATE menu_items SET image_url = 'https://images.pexels.com/photos/27442281/pexels-photo-27442281.jpeg?auto=compress&cs=tinysrgb&w=900' WHERE name = 'Truffle Mushroom Omelette';
UPDATE menu_items SET image_url = 'https://images.pexels.com/photos/17896269/pexels-photo-17896269.jpeg?auto=compress&cs=tinysrgb&w=900' WHERE name = 'Vegan Big Breakfast';
UPDATE menu_items SET image_url = 'https://images.pexels.com/photos/35640236/pexels-photo-35640236.jpeg?auto=compress&cs=tinysrgb&w=900' WHERE name = 'Berry Granola Bowl';
UPDATE menu_items SET image_url = 'https://images.pexels.com/photos/38399728/pexels-photo-38399728.jpeg?auto=compress&cs=tinysrgb&w=900' WHERE name = 'Eggs Benedict';

-- Desserts
UPDATE menu_items SET image_url = 'https://images.pexels.com/photos/4110008/pexels-photo-4110008.jpeg?auto=compress&cs=tinysrgb&w=900' WHERE name = 'Belgian Dark Chocolate Cake';
UPDATE menu_items SET image_url = 'https://images.pexels.com/photos/34759483/pexels-photo-34759483.jpeg?auto=compress&cs=tinysrgb&w=900' WHERE name = 'Tiramisu Classico';
UPDATE menu_items SET image_url = 'https://images.pexels.com/photos/38058470/pexels-photo-38058470.jpeg?auto=compress&cs=tinysrgb&w=900' WHERE name = 'Vegan Berry Cheesecake';
UPDATE menu_items SET image_url = 'https://images.pexels.com/photos/25595974/pexels-photo-25595974.jpeg?auto=compress&cs=tinysrgb&w=900' WHERE name = 'Salted Caramel Brownie';
UPDATE menu_items SET image_url = 'https://images.pexels.com/photos/4828336/pexels-photo-4828336.jpeg?auto=compress&cs=tinysrgb&w=900' WHERE name = 'Almond Croissant';

-- Artisan Teas
UPDATE menu_items SET image_url = 'https://images.pexels.com/photos/11126288/pexels-photo-11126288.jpeg?auto=compress&cs=tinysrgb&w=900' WHERE name = 'Matcha Latte';
UPDATE menu_items SET image_url = 'https://images.pexels.com/photos/8329257/pexels-photo-8329257.jpeg?auto=compress&cs=tinysrgb&w=900' WHERE name = 'Kashmiri Kahwa';
UPDATE menu_items SET image_url = 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=900' WHERE name = 'Masala Chai';
UPDATE menu_items SET image_url = 'https://images.pexels.com/photos/13383488/pexels-photo-13383488.jpeg?auto=compress&cs=tinysrgb&w=900' WHERE name = 'Iced Peach Oolong';
UPDATE menu_items SET image_url = 'https://images.pexels.com/photos/8115976/pexels-photo-8115976.jpeg?auto=compress&cs=tinysrgb&w=900' WHERE name = 'Chamomile Calm';
