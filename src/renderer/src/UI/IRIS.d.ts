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
declare const IRIS: (props: IrisProps) => import("react/jsx-runtime").JSX.Element;
export default IRIS;
