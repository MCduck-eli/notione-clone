import { Doc } from "@/convex/_generated/dataModel";
import { Button } from "../ui/button";
import { ImageIcon, Smile, X } from "lucide-react";
import EmojiPicer from "./emoji-picer";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ElementRef, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useCoverImage } from "@/hook/use-cover";

interface TolbarProps {
    document?: Doc<"documents">;
    preview?: boolean;
}

export default function Toolbar({ document, preview }: TolbarProps) {
    const documentField = useMutation(api.document.updateFields);
    const coverImage = useCoverImage();

    const textareaRef = useRef<ElementRef<"textarea">>(null);
    const [value, setValue] = useState(document?.title);
    const [isEditing, setIsEditing] = useState(false);

    const disableInput = () => setIsEditing(false);

    const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            disableInput();
        }
    };

    const onIconChange = (icon: string) => {
        documentField({
            // @ts-ignore
            id: document?._id,
            icon,
        });
    };

    const onEmoji = (icon: string) => {
        documentField({
            // @ts-ignore
            id: document?._id,
            icon,
        });
    };

    const removeEmoji = () => {
        documentField({
            // @ts-ignore
            id: document?._id,
            icon: "",
        });
    };

    const onInput = (value: string) => {
        setValue(value);
        documentField({
            // @ts-ignore
            id: document?._id,
            title: value || "Untitled",
        });
    };

    const enableInput = () => {
        if (preview) return;

        setIsEditing(true);
        setTimeout(() => {
            setValue(document?.title);
            textareaRef.current?.focus();
        }, 0);
    };

    return (
        <div className="relative group mt-10 gap-2">
            {!!document?.icon && !preview && (
                <div className="flex items-center">
                    <EmojiPicer onChange={onEmoji}>
                        <p className="text-6xl hover:opacity-75 transition mr-5">
                            {document.icon}
                        </p>
                    </EmojiPicer>
                    <div className="flex items-center">
                        <Button
                            variant={"outline"}
                            size={"icon"}
                            className="text-muted transition opacity-0 group-hover:opacity-100 rounded-full"
                            onClick={removeEmoji}
                        >
                            <X />
                        </Button>
                    </div>
                </div>
            )}

            {!!document && preview && (
                <p className="text-6xl pt-19">{document.icon}</p>
            )}

            <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-2 pl-4">
                {!document?.icon && !preview && (
                    <EmojiPicer asChild onChange={onIconChange}>
                        <Button
                            size={"sm"}
                            variant={"outline"}
                            className="text-muted-foreground text-xs"
                        >
                            <Smile className="h-4 w-4 mr-2" />
                            <span>Add icon</span>
                        </Button>
                    </EmojiPicer>
                )}

                {!document?.coverImage && !preview && (
                    <Button
                        size={"sm"}
                        variant={"outline"}
                        className="text-muted-foreground text-xs"
                        onClick={coverImage.onOpen}
                    >
                        <ImageIcon className="h-4 w-4 mr-2" />
                        <span>Add cover</span>
                    </Button>
                )}
            </div>

            {!isEditing && !preview ? (
                <TextareaAutosize
                    ref={textareaRef}
                    onBlur={disableInput}
                    onKeyDown={onKeyDown}
                    value={value}
                    onChange={(event) => onInput(event.target.value)}
                    className="text-5xl bg-transparent font-bold wrap-break-word outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none pl-4"
                />
            ) : (
                <div
                    onClick={enableInput}
                    className="pb-[11.5px] text-5xl font-bold wrap-break-word outline-none text-[#3F3F3F] dark:text-[#CFCFCF]"
                >
                    {document?.title}
                </div>
            )}
        </div>
    );
}
