import React, { useState } from "react";

import { Meta, StoryObj } from "@storybook/react";
import { ImageUpload, ImageUploadProps } from ".";
import { AppViewport } from "../AppViewport";
import { Toaster } from "@/components/shadcn/toaster";

const meta: Meta<typeof ImageUpload> = {
  title: "Atoms/ImageUpload",
  component: ImageUpload,
};

export default meta;

type Story = StoryObj<typeof ImageUpload>;

const StoryWrapper = () => {
  const [images, setImages] = useState<Array<{ file: File; preview: string; id: string }>>([]);

  return (
    <AppViewport>
      <ImageUpload
        images={images}
        onImagesChange={setImages}
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
