import { VisionMode } from '@renderer/IndexRoot';
interface OverlayProps {
    isSystemActive: boolean;
    toggleSystem: () => void;
    isMicMuted: boolean;
    toggleMic: () => void;
    isVideoOn: boolean;
    visionMode: VisionMode;
    startVision: (mode: 'camera' | 'screen') => void;
    stopVision: () => void;
}
declare const MiniOverlay: ({ isSystemActive, toggleSystem, isMicMuted, toggleMic, isVideoOn, visionMode, startVision, stopVision }: OverlayProps) => import("react/jsx-runtime").JSX.Element;
export default MiniOverlay;
