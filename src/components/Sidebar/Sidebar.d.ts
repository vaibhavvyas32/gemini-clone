declare interface SidebarProps {
    // Define the properties that the Sidebar component accepts
    // For example:
    extended: boolean;
    onSent: (prompt: string) => Promise<void>;
    previousPrompt: string[];
    setRecentPrompt: (prompt: string) => void;
    newChat: () => void;
}

declare function Sidebar(props: SidebarProps): JSX.Element;

export = Sidebar;