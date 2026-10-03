interface ErrorBoxProps {
    message: string | null;
    type?: "error" | "success";
    onClose: () => void;
}
export default function ErrorBox({ message, type, onClose, }: ErrorBoxProps): import("react/jsx-runtime").JSX.Element;
export {};
