interface AuthState {
    accessToken: string | null;
    isAuthInitialized: boolean;
    setAccessToken: (token: string | null) => void;
    setIsAuthInitialized: (value: boolean) => void;
    logout: () => void;
}
export declare const useAuthStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<AuthState>, "setState"> & {
    setState(nextStateOrUpdater: AuthState | Partial<AuthState> | ((state: {
        accessToken: string | null;
        isAuthInitialized: boolean;
        setAccessToken: (token: string | null) => void;
        setIsAuthInitialized: (value: boolean) => void;
        logout: () => void;
    }) => void), shouldReplace?: false): void;
    setState(nextStateOrUpdater: AuthState | ((state: {
        accessToken: string | null;
        isAuthInitialized: boolean;
        setAccessToken: (token: string | null) => void;
        setIsAuthInitialized: (value: boolean) => void;
        logout: () => void;
    }) => void), shouldReplace: true): void;
}>;
export {};
