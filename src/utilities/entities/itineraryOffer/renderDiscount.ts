interface RenderDiscountProps {
  listPriceInCents: number;
  offerPriceInCents: number;
}

export const renderDiscount = ({
  listPriceInCents,
  offerPriceInCents,
}: RenderDiscountProps): string => {
  const discount = listPriceInCents
    ? Math.round(
        ((listPriceInCents - offerPriceInCents) / listPriceInCents) * 100
      )
    : 0;

  return discount > 0 ? `${discount}%  off` : "";
};
