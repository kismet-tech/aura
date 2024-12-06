import React, { useState } from "react";

import { Meta, StoryObj } from "@storybook/react";
import { ExistingImage, ImageUploadWithExisting, ImageUploadWithExistingProps } from ".";

import { AppViewport } from "../AppViewport";
import { Toaster } from "@/components/shadcn/toaster";

const meta: Meta<typeof ImageUploadWithExisting> = {
  title: "Atoms/ImageUploadWithExisting",
  component: ImageUploadWithExisting,
};

export default meta;

type Story = StoryObj<typeof ImageUploadWithExisting>;

const StoryWrapper = () => {

  const existingImageData: ExistingImage[] = [
    {
      imageId: "testImage1",
      url: "https://upload.wikimedia.org/wikipedia/en/a/ab/The_Faust_Hotel.jpeg",
    },
    {
      imageId: "testImage2",
      url: "https://upload.wikimedia.org/wikipedia/en/5/5e/Dreamland_Ballroom_decorated.jpg"
    }
  ]

  const [imageChanges, setImageChanges] = useState<{
    newImages: Array<{ file: File; preview: string; id: string }>;
    imageIdsToDelete: string[];
    imagesOrdering: string[];
  } | null>(null);

  return (
    <AppViewport>
      <ImageUploadWithExisting
        existingImages={existingImageData}
        onImagesChange={(changes) => {
          setImageChanges(changes);
        }}
        maxSize={5}
        maxFiles={3}
      />
    </AppViewport>
  );
};

export const IsCollapsed_Example: Story = {
  render: () =>
    <>
      <StoryWrapper />
      <Toaster />
    </>
};
