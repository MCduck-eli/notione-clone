import { api } from "@/convex/_generated/api";
import { useCoverImage } from "@/hook/use-cover";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { MultiImageDropzoneUsage } from "../singleImage-dropzone-usage";
import { Id } from "@/convex/_generated/dataModel";

// EdgeModal.tsx ichida
export default function EdgeModal() {
    const params = useParams();
    const update = useMutation(api.document.updateFields);
    const coverImage = useCoverImage();
    const [isSubmitting, setIsSubmitting] = useState(false);
    // EdgeModal.tsx

    const onUploadSuccess = async (url: string) => {
        try {
            setIsSubmitting(true);

            // 1. Convex'ga yuborish
            await update({
                id: params.documentId as Id<"documents">,
                coverImage: url,
            });

            // 2. Modalni yopish (Bu juda muhim!)
            coverImage.onClose();
        } catch (error) {
            console.log("Xatolik:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Cover Image</DialogTitle>
                </DialogHeader>
                <MultiImageDropzoneUsage
                    disabled={isSubmitting}
                    onChange={onUploadSuccess} // Funksiyani ulaymiz
                />
            </DialogContent>
        </Dialog>
    );
}
