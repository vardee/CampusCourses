
export function setTokenFromLocalStorage(key: string, token: string): void {
    localStorage.setItem(key, token);
}