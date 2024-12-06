import React from "react";
import { GripVertical, Upload, X } from "lucide-react";
import { useCallback } from "react";


import { Button } from "@/components/shadcn/button";
import { Card, CardContent } from "@/components/shadcn/card";
import { useToast } from "@/hooks/use-toast";



export interface ImageUploadProps {
  images: Array<{ file: File; preview: string; id: string }>;
  onImagesChange: (images: Array<{ file: File; preview: string; id: string }>) => void;
  label?: string;
  maxSize: number; // in MB
  maxFiles: number;
}

export function ImageUpload({
  images,
  onImagesChange,
  maxSize = 2,
  maxFiles = 3,
}: ImageUploadProps) {
  const { toast } = useToast();

  const validateAndAddFiles = useCallback(
    (files: File[]) => {
      const validImageTypes = ["image/jpeg"];
      let hasError = false;

      if (files.length + images.length > maxFiles) {
        toast({
          variant: "destructive",
          title: "Too many files",
          description: `You can only upload up to ${maxFiles.toString()} images`,
          duration: 3000,
        });
        return;
      }

      const newImages = files
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
              console.log(file.size);
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
        .map((file) => ({
          file,
          preview: URL.createObjectURL(file),
          id: Math.random().toString(36).substring(7),
        }));

      if (newImages.length > 0) {
        onImagesChange([...images, ...newImages]);
        toast({
          title: "Images Added",
          description: `Successfully added ${newImages.length.toString()} image(s)`,
          duration: 3000,
        });
      }
    },
    [images, maxFiles, maxSize, onImagesChange, toast],
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
      const newImages = images.filter((img) => img.id !== id);
      images.filter((img) => img.id === id).forEach((img) => URL.revokeObjectURL(img.preview));
      onImagesChange(newImages);
      toast({
        title: "Image removed",
        description: "The image has been removed from the upload list",
        duration: 3000,
      });
    },
    [images, onImagesChange, toast],
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

      const newImages = [...images];
      const [draggedImage] = newImages.splice(dragIndex, 1);
      newImages.splice(dropIndex, 0, draggedImage);
      onImagesChange(newImages);

      toast({
        title: "Images reordered",
        description: "The image order has been updated",
        duration: 3000,
      });
    },
    [images, onImagesChange, toast],
  );

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
            <p className="text-gray-600 mb-2">Add your images here!</p>
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

          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {images.map((image, index) => (
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
                    {(index + 1).toString()}
                    {index === 0 && " (Default)"}
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

