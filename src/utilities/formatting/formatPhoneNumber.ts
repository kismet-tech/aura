interface FormatPhoneNumberProps {
  phoneNumber: string;
}

export const formatPhoneNumber = ({ phoneNumber }: FormatPhoneNumberProps) => {
  if (phoneNumber.length < 10) {
    return phoneNumber;
  }

  const areaCode = phoneNumber.slice(0, 3);
  const centralOfficeCode = phoneNumber.slice(3, 6);
  const lineNumber = phoneNumber.slice(6);

  return `(${areaCode})-${centralOfficeCode}-${lineNumber}`;
};
