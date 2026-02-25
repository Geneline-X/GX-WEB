import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }: { requestLocale: Promise<string | undefined> }) => {
    const requested = await requestLocale;
    // Validate the locale; fall back to defaultLocale for unknown values
    const locale = routing.locales.includes(requested as (typeof routing.locales)[number])
        ? requested!
        : routing.defaultLocale;

    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default,
        onError(error: { code: string; message: string }) {
            // Only log unexpected errors, not missing translations
            if (error.code !== 'MISSING_MESSAGE') {
                console.error(error);
            }
        },
        getMessageFallback({ key }: { key: string; namespace?: string }) {
            // Return empty string instead of raw key for any missing messages
            return '';
        }
    };
});

