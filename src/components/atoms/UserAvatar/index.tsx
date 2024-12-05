import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/avatar";
import React from "react";

export interface UserAvatarProps {
  name?: string;
  emailAddress?: string;
}

export function UserAvatar({ name, emailAddress }: UserAvatarProps) {
  let avatarText = "";
  if (name) {
    const nameParts: string[] = name.trim().split(" ");
    if (nameParts.length === 1) {
      // If only one name part, return the first letter of it twice
      avatarText =
        nameParts[0].charAt(0).toUpperCase() +
        nameParts[0].charAt(0).toUpperCase();
    } else {
      const firstNameInitial: string = nameParts[0].charAt(0).toUpperCase();
      const lastNameInitial: string = nameParts[nameParts.length - 1]
        .charAt(0)
        .toUpperCase();

      avatarText = firstNameInitial + lastNameInitial;
    }
  } else if (emailAddress) {
    const [localPart, domainPart] = emailAddress.split("@");

    if (!localPart || !domainPart) {
      throw new Error("Invalid email address");
    }

    const firstLetterLocal = localPart.charAt(0).toUpperCase();
    const firstLetterDomain = domainPart.charAt(0).toUpperCase();

    avatarText = firstLetterLocal + firstLetterDomain;
  }

  if (avatarText && avatarText.length > 0) {
    return (
      <Avatar>
        <AvatarFallback>{avatarText}</AvatarFallback>
        <AvatarImage />
      </Avatar>
    );
  } else {
    return (
      <Avatar>
        <AvatarImage src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y" />
      </Avatar>
    );
  }
}
