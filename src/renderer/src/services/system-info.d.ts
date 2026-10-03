export interface SystemStats {
    cpu: string;
    memory: {
        total: string;
        free: string;
        usedPercentage: string;
    };
    temperature: number;
    os: {
        type: string;
        uptime: string;
    };
}
export interface AppItem {
    name: string;
    id: string;
}
export declare const getSystemStatus: () => Promise<SystemStats | null>;
export declare const getAllApps: () => Promise<AppItem[]>;
export declare const getDrives: () => Promise<any[]>;
