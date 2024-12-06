import React from "react";
export interface ImageUploadProps {
    images: Array<{
        file: File;
        preview: string;
        id: string;
    }>;
    onImagesChange: (images: Array<{
        file: File;
        preview: string;
        id: string;
    }>) => void;
    label?: string;
    maxSize: number;
    maxFiles: number;
}
export declare function ImageUpload({ images, onImagesChange, maxSize, maxFiles, }: ImageUploadProps): React.JSX.Element;
