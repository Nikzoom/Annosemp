const products = [
    {
        id: 1,
        slug: 'modular-parka-black',
        name: { ru: 'Модульная парка', en: 'Modular Parka' },
        category: 'jackets',
        price: 45900,
        oldPrice: null,
        badge: { ru: 'Бестселлер', en: 'Bestseller' },
        images: [
            'assets/products/modular-parka-black.jpg',
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        colors: [
            { name: { ru: 'Чёрный', en: 'Black' }, hex: '#0A0A0A' },
            { name: { ru: 'Графит', en: 'Graphite' }, hex: '#3A3A3A' },
        ],
        description: {
            ru: 'Флагманская модульная парка Annosemp. Куртка 3-в-1: демисезонная, зимняя и ветровка в одном изделии. Сменные модули позволяют адаптировать куртку под любую погоду от -5°C с дождём до +15°C с ветром.',
            en: 'Flagship Annosemp modular parka. A 3-in-1 jacket: demi-season, winter, and windbreaker in one piece. Interchangeable modules adapt it to weather from rainy -5°C to windy +15°C.',
        },
        specs: {
            ru: ['Материал: нейлон ripstop', 'Водостойкость: 10 000 мм', 'Утеплитель: съёмный, 200 г/м²', 'Модули: 3 сменных', 'Подогрев: совместим', 'Вес: 890 г'],
            en: ['Material: ripstop nylon', 'Water resistance: 10,000 mm', 'Insulation: removable, 200 g/m²', 'Modules: 3 interchangeable', 'Heating: compatible', 'Weight: 890 g'],
        },
        featured: true,
    },
    {
        id: 2,
        slug: 'core-shell-jacket',
        name: { ru: 'Куртка Core Shell', en: 'Core Shell Jacket' },
        category: 'jackets',
        price: 32900,
        oldPrice: null,
        badge: { ru: 'Новинка', en: 'New' },
        images: [
            'assets/products/core-shell-jacket.jpg',
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: [
            { name: { ru: 'Чёрный', en: 'Black' }, hex: '#0A0A0A' },
            { name: { ru: 'Тёмно-синий', en: 'Navy' }, hex: '#1A1A2E' },
        ],
        description: {
            ru: 'Базовая оболочка для модульной системы Annosemp. Лёгкая, ветрозащитная и стильная. Работает как самостоятельная куртка и как база для функциональных модулей.',
            en: 'Base shell for the Annosemp modular system. Lightweight, windproof and refined. Works both as a standalone jacket and a base for functional modules.',
        },
        specs: {
            ru: ['Материал: полиэстер 300D', 'Ветрозащита: полная', 'Модули: совместима', 'Вес: 450 г'],
            en: ['Material: 300D polyester', 'Wind protection: full', 'Modules: compatible', 'Weight: 450 g'],
        },
        featured: true,
    },
    {
        id: 3,
        slug: 'thermal-liner-module',
        name: { ru: 'Термо-модуль утеплитель', en: 'Thermal Liner Module' },
        category: 'modules',
        price: 12900,
        oldPrice: 15900,
        badge: { ru: '-19%', en: '-19%' },
        images: [
            'assets/products/thermal-liner-module.jpg',
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: [
            { name: { ru: 'Чёрный', en: 'Black' }, hex: '#0A0A0A' },
        ],
        description: {
            ru: 'Съёмный утепляющий модуль для модульных курток Annosemp. Крепится на молнии и превращает демисезонную куртку в зимнюю примерно за 30 секунд.',
            en: 'Removable insulation module for Annosemp modular jackets. Attaches with a zipper and turns a demi-season jacket into a winter-ready piece in about 30 seconds.',
        },
        specs: {
            ru: ['Утеплитель: синтетический, 200 г/м²', 'Крепление: молния', 'Вес: 320 г'],
            en: ['Insulation: synthetic, 200 g/m²', 'Attachment: zipper', 'Weight: 320 g'],
        },
        featured: true,
    },
    {
        id: 4,
        slug: 'heat-core-module',
        name: { ru: 'Модуль подогрева Heat Core', en: 'Heat Core Module' },
        category: 'modules',
        price: 14900,
        oldPrice: null,
        badge: { ru: 'Технология', en: 'Tech' },
        images: [
            'assets/products/heat-core-module.jpg',
        ],
        sizes: ['Universal'],
        colors: [
            { name: { ru: 'Чёрный', en: 'Black' }, hex: '#0A0A0A' },
        ],
        description: {
            ru: 'Программируемый модуль подогрева спины. До 8 часов автономной работы, 3 уровня нагрева и управление через экосистему Annosemp.',
            en: 'Programmable back-heating module with up to 8 hours of battery life, 3 heating levels and control through the Annosemp ecosystem.',
        },
        specs: {
            ru: ['Время работы: до 8 часов', 'Уровни нагрева: 3', 'Управление: приложение', 'Батарея: Li-Ion 5000 mAh', 'Вес: 180 г'],
            en: ['Battery life: up to 8 hours', 'Heating levels: 3', 'Control: app', 'Battery: Li-Ion 5000 mAh', 'Weight: 180 g'],
        },
        featured: true,
    },
    {
        id: 5,
        slug: 'led-panel-module',
        name: { ru: 'LED-панель', en: 'LED Panel Module' },
        category: 'modules',
        price: 7900,
        oldPrice: null,
        badge: null,
        images: [
            'assets/products/led-panel-module.jpg',
        ],
        sizes: ['Universal'],
        colors: [
            { name: { ru: 'Белый свет', en: 'White Light' }, hex: '#FFFFFF' },
            { name: { ru: 'RGB', en: 'RGB' }, hex: '#FFFFFF' },
        ],
        description: {
            ru: 'Программируемая светодиодная панель для безопасности и сценического акцента. Несколько режимов свечения и высокая видимость в тёмное время суток.',
            en: 'Programmable LED panel designed for visibility and expressive styling, with multiple lighting modes for after-dark use.',
        },
        specs: {
            ru: ['Режимы: 5', 'Яркость: 120 люмен', 'Батарея: встроенная', 'Время работы: 12 часов'],
            en: ['Modes: 5', 'Brightness: 120 lumens', 'Battery: built-in', 'Battery life: 12 hours'],
        },
        featured: false,
    },
    {
        id: 6,
        slug: 'urban-tech-bomber',
        name: { ru: 'Urban Tech бомбер', en: 'Urban Tech Bomber' },
        category: 'jackets',
        price: 28900,
        oldPrice: 34900,
        badge: { ru: '-17%', en: '-17%' },
        images: [
            'assets/products/urban-tech-bomber.jpg',
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: [
            { name: { ru: 'Чёрный', en: 'Black' }, hex: '#0A0A0A' },
            { name: { ru: 'Хаки', en: 'Khaki' }, hex: '#5D5C3E' },
        ],
        description: {
            ru: 'Городской технологичный бомбер с поддержкой модулей Annosemp. Современный силуэт и функциональность без визуального шума.',
            en: 'Urban tech bomber with Annosemp module support. Contemporary silhouette and clean functional detailing.',
        },
        specs: {
            ru: ['Материал: нейлон', 'Подкладка: сетка', 'Модули: совместим', 'Вес: 520 г'],
            en: ['Material: nylon', 'Lining: mesh', 'Modules: compatible', 'Weight: 520 g'],
        },
        featured: false,
    },
];

function getProduct(id) {
    return products.find((product) => product.id === Number.parseInt(id, 10));
}

function getProductBySlug(slug) {
    return products.find((product) => product.slug === slug);
}

function getFeaturedProducts() {
    return products.filter((product) => product.featured);
}

function getProductsByCategory(category) {
    if (!category || category === 'all') {
        return [...products];
    }

    return products.filter((product) => product.category === category);
}

function formatPrice(price) {
    return `${new Intl.NumberFormat('ru-RU').format(price)} ₽`;
}

function getLocalizedField(field) {
    const lang = localStorage.getItem('annosemp-lang') || 'ru';
    return typeof field === 'object' ? (field[lang] || field.ru || '') : field;
}

function escapeHtml(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}

function getCategoryLabel(category) {
    const categoryKeyMap = {
        jackets: 'catalog.jackets',
        modules: 'catalog.modules',
        accessories: 'catalog.accessories',
    };

    return t(categoryKeyMap[category] || 'catalog.all');
}
