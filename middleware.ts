import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    // A list of all locales that are supported
    locales: ['en', 'fr', 'es', 'de', 'pt', 'zh', 'it'],

    // Used when no locale matches
    defaultLocale: 'en'
});

export const config = {
    // Match all pathnames except for
    // - /api (API routes)
    // - /_next (Next.js internals)
    // - /_vercel (Vercel internals)
    // - /.*\\..* (static files)
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
