import React from "react";
export interface ExistingImage {
    imageId: string;
    url: string;
}
export interface ImageUploadWithExistingProps {
    existingImages: ExistingImage[];
    onImagesChange: (params: {
        newImages: Array<{
            file: File;
            preview: string;
            id: string;
        }>;
        imageIdsToDelete: string[];
        imagesOrdering: string[];
    }) => void;
    label?: string;
    maxSize: number;
    maxFiles: number;
}
export declare function ImageUploadWithExisting({ existingImages, onImagesChange, maxSize, maxFiles, label, }: ImageUploadWithExistingProps): React.JSX.Element;
