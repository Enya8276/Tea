-- 茶叶商业网站数据库结构

-- 1. 茶类分类表 (中国六大茶类)
CREATE TABLE tea_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    english_name VARCHAR(100),
    description TEXT,
    slug VARCHAR(100) UNIQUE NOT NULL,
    image_url TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 茶叶产品表
CREATE TABLE tea_products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    english_name VARCHAR(200),
    category_id UUID REFERENCES tea_categories(id),
    origin_region VARCHAR(200),
    harvest_season VARCHAR(100),
    processing_method TEXT,
    price DECIMAL(10,2) NOT NULL,
    sale_price DECIMAL(10,2),
    stock_quantity INTEGER DEFAULT 0,
    sku VARCHAR(100) UNIQUE,
    images JSONB,
    description TEXT,
    brewing_guide JSONB,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 茶具分类表
CREATE TABLE teaware_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    english_name VARCHAR(100),
    description TEXT,
    slug VARCHAR(100) UNIQUE NOT NULL,
    image_url TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. 茶具产品表
CREATE TABLE teaware_products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    english_name VARCHAR(200),
    category_id UUID REFERENCES teaware_categories(id),
    material VARCHAR(100),
    capacity DECIMAL(8,2),
    price DECIMAL(10,2) NOT NULL,
    sale_price DECIMAL(10,2),
    stock_quantity INTEGER DEFAULT 0,
    sku VARCHAR(100) UNIQUE,
    images JSONB,
    description TEXT,
    usage_guide TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. 客户表
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    english_name VARCHAR(200),
    phone VARCHAR(20),
    country VARCHAR(100),
    language VARCHAR(10) DEFAULT 'zh',
    billing_address JSONB,
    shipping_address JSONB,
    total_orders INTEGER DEFAULT 0,
    total_spent DECIMAL(12,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. 订单表
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    customer_id UUID REFERENCES customers(id),
    status VARCHAR(50) DEFAULT 'pending',
    subtotal DECIMAL(10,2) NOT NULL,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    shipping_amount DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    payment_status VARCHAR(50) DEFAULT 'pending',
    billing_address JSONB,
    shipping_address JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. 订单详情表
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_type VARCHAR(20) NOT NULL,
    tea_product_id UUID REFERENCES tea_products(id),
    teaware_product_id UUID REFERENCES teaware_products(id),
    product_name VARCHAR(200) NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. 茶文化文章表
CREATE TABLE tea_culture_articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    english_title VARCHAR(200),
    slug VARCHAR(200) UNIQUE NOT NULL,
    content TEXT,
    english_content TEXT,
    excerpt TEXT,
    featured_image TEXT,
    category VARCHAR(50),
    status VARCHAR(20) DEFAULT 'draft',
    author_id UUID REFERENCES auth.users(id),
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. 泡茶技巧表
CREATE TABLE brewing_tips (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    english_title VARCHAR(200),
    content TEXT,
    english_content TEXT,
    category VARCHAR(50),
    featured_image TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 插入默认数据
INSERT INTO tea_categories (name, english_name, description, slug, sort_order) VALUES
('绿茶', 'Green Tea', '绿茶是中国的主要茶类之一，未经发酵，经杀青、整形、烘干等工艺制成。', 'green-tea', 1),
('红茶', 'Black Tea', '红茶属全发酵茶，经萎凋、揉捻、发酵、干燥等工艺精制而成。', 'black-tea', 2),
('乌龙茶', 'Oolong Tea', '乌龙茶亦称青茶，是中国几大茶类中独具鲜明中国特色的茶叶品类。', 'oolong-tea', 3),
('白茶', 'White Tea', '白茶属微发酵茶，不经杀青或揉捻，只经过晒或文火干燥后加工。', 'white-tea', 4),
('黄茶', 'Yellow Tea', '黄茶是中国特产，按鲜叶老嫩芽叶大小分为黄芽茶、黄小茶和黄大茶。', 'yellow-tea', 5),
('黑茶', 'Dark Tea', '黑茶因成品茶外观呈黑色而得名，属后发酵茶。', 'dark-tea', 6);

INSERT INTO teaware_categories (name, english_name, description, slug, sort_order) VALUES
('盖碗', 'Gaiwan', '盖碗是一种上有盖、下有托、中有碗的茶具，又称"三才碗"。', 'gaiwan', 1),
('紫砂壶', 'Yixing Teapot', '紫砂壶是中国特有的手工制造陶土工艺品，制作原料为紫砂泥。', 'yixing-teapot', 2),
('公道杯', 'Fairness Cup', '公道杯用来均匀茶汤浓度，确保每位茶友喝到的茶汤浓度一致。', 'fairness-cup', 3),
('品茗杯', 'Tea Cup', '品茗杯是用来品饮茶汤的杯子，有各种材质和造型。', 'tea-cup', 4); 