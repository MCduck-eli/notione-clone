"use client";

import { ImageUploader } from "@/components/upload/multi-image";
import {
    UploaderProvider,
    type UploadFn,
} from "@/components/upload/uploader-provider";
import { Id } from "@/convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";
import * as React from "react";
import { Doc } from "zod/v4/core";

interface multiImageProps {
    disabled: boolean;
    onChange?: (url: string) => void;
}

export function MultiImageDropzoneUsage({
    disabled,
    onChange,
}: multiImageProps) {
    const { edgestore } = useEdgeStore();

    const uploadFn: UploadFn = React.useCallback(
        async ({ file, onProgressChange, signal }) => {
            // @ts-ignore
            const res = await edgestore.publicImages.upload({
                file,
                signal,
                onProgressChange,
            });

            if (res.url && onChange) {
                await onChange(res.url);
            }

            return res;
        },
        [edgestore, onChange],
    );

    return (
        <UploaderProvider uploadFn={uploadFn} autoUpload>
            <ImageUploader maxFiles={1} maxSize={1024 * 1024 * 2} />
        </UploaderProvider>
    );
}
