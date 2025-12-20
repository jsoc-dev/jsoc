export function isDevMode () {
    return import.meta.env.MODE === 'development';
}