export declare class GeminiLiveService {
    socket: WebSocket | null;
    audioContext: AudioContext | null;
    mediaStream: MediaStream | null;
    workletNode: AudioWorkletNode | null;
    analyser: AnalyserNode | null;
    apiKey: string;
    isConnected: boolean;
    private isMicMuted;
    private nextStartTime;
    model: string;
    private aiResponseBuffer;
    private userInputBuffer;
    private appWatcherInterval;
    private lastAppList;
    constructor();
    setMute(muted: boolean): void;
    connect(): Promise<void>;
    startAppWatcher(): void;
    startMicrophone(): Promise<void>;
    scheduleAudioChunk(base64Audio: string): void;
    sendVideoFrame(base64Image: string): void;
    disconnect(): void;
}
export declare const irisService: GeminiLiveService;
