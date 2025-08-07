import 'dotenv/config';

export default {
    expo: {
        name: "Mobile-App",
        slug: "slug",
        version: "1.0.0",
        extra: {
            API_BASE_URL: process.env.API_BASE_URL,
            APP_ENV: process.env.APP_ENV,
            APP_PRODUCTION: process.env.APP_PRODUCTION === 'true',
            APP_AUTH_TOKEN_NAME: process.env.APP_AUTH_TOKEN_NAME,
            APP_REQUIRE_LOGIN: process.env.APP_REQUIRE_LOGIN === 'true',
            APP_MERCHANT: process.env.APP_MERCHANT,
            APP_DEFAULT_LOCALE: process.env.APP_DEFAULT_LOCALE,
            APP_SUPPORTED_LOCALES: process.env.APP_SUPPORTED_LOCALES,
            APP_DEFAULT_CURRENCY: process.env.APP_DEFAULT_CURRENCY,
            APP_SUPPORTED_CURRENCIES: process.env.APP_SUPPORTED_CURRENCIES,
            APP_DEFAULT_LANGUAGE: process.env.APP_DEFAULT_LANGUAGE,
            APP_SUPPORTED_LANGUAGES: process.env.APP_SUPPORTED_LANGUAGES,
            APP_THEME_COLOR: process.env.APP_THEME_COLOR,
            APP_PRODUCT_GRID_LIMIT: parseInt(process.env.APP_PRODUCT_GRID_LIMIT),
            APP_MAP_API_KEY: process.env.APP_MAP_API_KEY,
            APP_OFFLINE_MODE: process.env.APP_OFFLINE_MODE === 'true',
        },
    },
};
