import { VisionMode } from '@renderer/IndexRoot';
interface IrisProps {
    isSystemActive: boolean;
    toggleSystem: () => void;
    isMicMuted: boolean;
    toggleMic: () => void;
    isVideoOn: boolean;
    visionMode: VisionMode;
    startVision: (mode: 'camera' | 'screen') => void;
    stopVision: () => void;
    activeStream: MediaStream | null;
}
interface DashboardViewProps {
    props: IrisProps;
    stats: any;
    chatHistory: any[];
    onVisionClick: () => void;
}
export default function DashboardView({ props, stats, chatHistory, onVisionClick }: DashboardViewProps): import("react/jsx-runtime").JSX.Element;
export {};
