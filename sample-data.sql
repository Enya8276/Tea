-- 茶叶商业网站示例数据

-- 插入茶叶产品示例
INSERT INTO tea_products (name, english_name, category_id, origin_region, price, sku, description, is_featured) VALUES 
('西湖龙井', 'West Lake Longjing', (SELECT id FROM tea_categories WHERE slug = 'green-tea'), '浙江省杭州市西湖区', 299.00, 'TEA-GREEN-001', '西湖龙井是中国十大名茶之一，产于浙江省杭州市西湖龙井村周围群山。', true),
('正山小种', 'Lapsang Souchong', (SELECT id FROM tea_categories WHERE slug = 'black-tea'), '福建省武夷山市桐木关', 159.00, 'TEA-BLACK-001', '正山小种红茶产于福建省武夷山市桐木关，是世界红茶的鼻祖。', true),
('铁观音', 'Tieguanyin', (SELECT id FROM tea_categories WHERE slug = 'oolong-tea'), '福建省安溪县', 399.00, 'TEA-OOLONG-001', '铁观音产于福建省安溪县，是中国十大名茶之一。', true);

-- 插入茶具产品示例
INSERT INTO teaware_products (name, english_name, category_id, material, price, sku, description, is_featured) VALUES
('白瓷盖碗三才杯', 'White Porcelain Gaiwan', (SELECT id FROM teaware_categories WHERE slug = 'gaiwan'), '白瓷', 89.00, 'TEAWARE-GAIWAN-001', '白瓷盖碗三才杯，采用优质白瓷制作，器型优美，手感舒适。', true),
('宜兴紫砂壶西施壶', 'Yixing Purple Clay Teapot', (SELECT id FROM teaware_categories WHERE slug = 'yixing-teapot'), '紫砂泥', 299.00, 'TEAWARE-YIXING-001', '宜兴紫砂壶西施壶，采用正宗宜兴紫砂泥制作，壶型优美，做工精细。', true); 