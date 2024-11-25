export const getDiscountPercent = ({
  listPrice,
  offerPrice,
  decimalPlaces,
}: {
  listPrice: number;
  offerPrice: number;
  decimalPlaces: number;
}) => {
  let discountPercent;

  if (listPrice === 0) {
    if (offerPrice !== 0) {
      discountPercent = 0;
    } else {
      discountPercent = 100;
    }
  } else {
    discountPercent = ((listPrice - offerPrice) / listPrice) * 100;
  }

  return discountPercent.toFixed(decimalPlaces);
};
