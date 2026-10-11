import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

type Messages = Record<string, unknown>;

// Locale files may lag behind English while new copy is translated;
// fill any gaps from en.json instead of rendering empty strings.
function withFallback(base: Messages, override: Messages): Messages {
    const out: Messages = { ...base };
    for (const [key, value] of Object.entries(override)) {
        const prev = out[key];
        out[key] =
            // Arrays (timelines, lists) are replaced whole, never merged by index.
            value && typeof value === 'object' && !Array.isArray(value) && prev && typeof prev === 'object' && !Array.isArray(prev)
                ? withFallback(prev as Messages, value as Messages)
                : value;
    }
    return out;
}

export default getRequestConfig(async ({ requestLocale }: { requestLocale: Promise<string | undefined> }) => {
    const requested = await requestLocale;
    // Validate the locale; fall back to defaultLocale for unknown values
    const locale = routing.locales.includes(requested as (typeof routing.locales)[number])
        ? requested!
        : routing.defaultLocale;

    const en = (await import('../messages/en.json')).default as Messages;
    const messages = locale === 'en' ? en : withFallback(en, (await import(`../messages/${locale}.json`)).default);

    return {
        locale,
        messages,
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
