import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useTheme } from "next-themes";

interface EmojiProps {
    children?: React.ReactNode;
    asChild?: boolean;
    onChange: (emoji: string) => void;
}

export default function EmojiPicer({
    children,
    asChild,
    onChange,
}: EmojiProps) {
    const { resolvedTheme } = useTheme();

    const currentTheme = (resolvedTheme || "light") as keyof typeof themeMap;

    const themeMap = {
        dark: Theme.DARK,
        light: Theme.LIGHT,
    };

    const theme = themeMap[currentTheme];

    return (
        <Popover>
            <PopoverTrigger asChild={asChild}>{children}</PopoverTrigger>
            <PopoverContent
                side="bottom"
                align="start"
                sideOffset={10}
                avoidCollisions={false}
                className="p-0 w-full border-none shadow-none z-99999"
            >
                <div className="max-h-100 overflow-y-auto overflow-x-hidden scrollbar-hide">
                    <EmojiPicker
                        theme={theme}
                        height={350}
                        width="100%"
                        onEmojiClick={(data) => onChange(data.emoji)}
                    />
                </div>
            </PopoverContent>
        </Popover>
    );
}
