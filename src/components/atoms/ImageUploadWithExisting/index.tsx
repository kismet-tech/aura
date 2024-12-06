import { Button } from "@/components/shadcn/button";
import { Card, CardContent } from "@/components/shadcn/card";
import { useToast } from "@/hooks/use-toast";
import { GripVertical, Upload, X } from "lucide-react";
import React from "react";
import { useCallback, useEffect, useState } from "react";

export interface ExistingImage {
  imageId: string;
  url: string;
}

export interface ImageUploadWithExistingProps {
  existingImages: ExistingImage[];
  onImagesChange: (params: {
    newImages: Array<{ file: File; preview: string; id: string }>;
    imageIdsToDelete: string[];
    imagesOrdering: string[];
  }) => void;
  label?: string;
  maxSize: number; // in MB
  maxFiles: number;
}

export function ImageUploadWithExisting({
  existingImages,
  onImagesChange,
  maxSize = 2,
  maxFiles = 3,
  label = "Add your images here!",
}: ImageUploadWithExistingProps) {
  const { toast } = useToast();
  const [newImages, setNewImages] = useState<Array<{ file: File; preview: string; id: string }>>(
    [],
  );
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [allImages, setAllImages] = useState<
    Array<{ id: string; preview: string; isNew?: boolean }>
  >(
    existingImages.map((img) => ({
      id: img.imageId,
      preview: img.url,
      isNew: false,
    })),
  );

  const updateParent = useCallback(
    (
      currentNewImages: Array<{ file: File; preview: string; id: string }>,
      currentImagesToDelete: string[],
      currentAllImages: Array<{ id: string; preview: string; isNew?: boolean }>,
    ) => {
      onImagesChange({
        newImages: currentNewImages,
        imageIdsToDelete: currentImagesToDelete,
        imagesOrdering: currentAllImages.map((img) => img.id),
      });
    },
    [onImagesChange],
  );

  const validateAndAddFiles = useCallback(
    (files: File[]) => {
      const validImageTypes = ["image/jpeg"];
      let hasError = false;

      const remainingSlots = maxFiles - (allImages.length - imagesToDelete.length);
      if (files.length > remainingSlots) {
        toast({
          variant: "destructive",
          title: "Too many files",
          description: `You can only upload up to ${maxFiles.toString()} images in total`,
          duration: 3000,
        });
        return;
      }

      const validatedFiles = files
        .filter((file) => {
          if (!validImageTypes.includes(file.type)) {
            if (!hasError) {
              toast({
                variant: "destructive",
                title: "Invalid file type",
                description: "Please upload only image files (JPEG)",
                duration: 3000,
              });
              hasError = true;
            }
            return false;
          }
          if (file.size > maxSize * 1024 * 1024) {
            if (!hasError) {
              toast({
                variant: "destructive",
                title: "File too large",
                description: `Image size should be less than ${maxSize.toString()}MB`,
                duration: 3000,
              });
              hasError = true;
            }
            return false;
          }
          return true;
        })
        .map((file, index) => ({
          file,
          preview: URL.createObjectURL(file),
          id: `new-${(newImages.length + index).toString()}`,
        }));

      if (validatedFiles.length > 0) {
        const newValidatedImages = validatedFiles.map((img) => ({
          id: img.id,
          preview: img.preview,
          isNew: true,
        }));

        const updatedNewImages = [...newImages, ...validatedFiles];
        const updatedAllImages = [...allImages, ...newValidatedImages];

        setNewImages(updatedNewImages);
        setAllImages(updatedAllImages);

        toast({
          title: "Images Added",
          description: `Successfully added ${validatedFiles.length.toString()} image(s)`,
          duration: 3000,
        });

        updateParent(updatedNewImages, imagesToDelete, updatedAllImages);
      }
    },
    [allImages, imagesToDelete, maxFiles, maxSize, newImages, toast, updateParent],
  );

  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const files = Array.from(event.target.files);
        validateAndAddFiles(files);
      }
    },
    [validateAndAddFiles],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files);
      validateAndAddFiles(files);
    },
    [validateAndAddFiles],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const removeImage = useCallback(
    (id: string) => {
      if (id.startsWith("new-")) {
        const updatedNewImages = newImages.filter((img) => img.id !== id);
        const updatedAllImages = allImages.filter((img) => img.id !== id);
        setNewImages(updatedNewImages);
        setAllImages(updatedAllImages);
        updateParent(updatedNewImages, imagesToDelete, updatedAllImages);
      } else {
        const updatedImagesToDelete = [...imagesToDelete, id];
        const updatedAllImages = allImages.filter((img) => img.id !== id);
        setImagesToDelete(updatedImagesToDelete);
        setAllImages(updatedAllImages);
        updateParent(newImages, updatedImagesToDelete, updatedAllImages);
      }

      toast({
        title: "Image removed",
        description: "The image has been removed from the list",
        duration: 3000,
      });

      const imageToRemove = allImages.find(img => img.id === id);
      if (imageToRemove?.isNew) {
        URL.revokeObjectURL(imageToRemove.preview);
      }
    },
    [allImages, imagesToDelete, newImages, toast, updateParent],
  );

  const handleImageDragStart = useCallback((e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("text/plain", index.toString());
  }, []);

  const handleImageDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleImageDrop = useCallback(
    (e: React.DragEvent, dropIndex: number) => {
      e.preventDefault();
      const dragIndex = parseInt(e.dataTransfer.getData("text/plain"));

      if (dragIndex === dropIndex) return;

      const newAllImages = [...allImages];
      const [draggedImage] = newAllImages.splice(dragIndex, 1);
      newAllImages.splice(dropIndex, 0, draggedImage);
      setAllImages(newAllImages);

      updateParent(newImages, imagesToDelete, newAllImages);

      toast({
        title: "Images reordered",
        description: "The image order has been updated",
        duration: 3000,
      });
    },
    [allImages, imagesToDelete, newImages, onImagesChange, toast],
  );

  useEffect(() => {
    return () => {
      allImages.forEach((img) => {
        if (img.isNew) {
          URL.revokeObjectURL(img.preview);
        }
      });
    };
  }, [allImages]);

  const visibleImages = allImages.filter((img) => !imagesToDelete.includes(img.id));

  return (
    <div className="flex-1 sm:ml-8">
      <Card className="w-full">
        <CardContent className="p-4">
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center mb-4 hover:border-blue-500 transition-colors cursor-pointer"
          >
            <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
            <p className="text-gray-600 mb-2">{label}</p>
            <Button
              variant="outline"
              onClick={() => {
                const input = document.getElementById("file-upload") as HTMLInputElement;
                input.click();
              }}
            >
              Browse Files
            </Button>
            <p className="text-sm text-gray-500 mt-1">
              JPEG only, up to {maxSize}MB (max {maxFiles} files)
            </p>
            <input
              id="file-upload"
              type="file"
              multiple
              accept="image/jpeg"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          {visibleImages.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {visibleImages.map((image, index) => (
                <div
                  key={image.id}
                  className="relative group border rounded-lg overflow-hidden transition-transform hover:shadow-md"
                  draggable
                  onDragStart={(e) => handleImageDragStart(e, index)}
                  onDragOver={handleImageDragOver}
                  onDrop={(e) => handleImageDrop(e, index)}
                  onDragEnter={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.add("scale-105", "border-blue-500");
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.remove("scale-105", "border-blue-500");
                  }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/20 transition-opacity" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-move">
                    <GripVertical className="h-6 w-6 text-white" />
                  </div>
                  <img
                    src={image.preview}
                    alt={`Upload ${(index + 1).toString()}`}
                    className="w-full h-24 object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded-md text-xs flex gap-2">
                    {index + 1}
                    {index === 0 && " (Default)"}
                    {image.isNew && " (New)"}
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(image.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

