export const calculateHeightOf = (element: HTMLElement): number => {
  const computed = window.getComputedStyle(element);

  const borderTopWidth = Number.parseInt(computed.getPropertyValue('border-top-width'));
  const borderBottomWidth = Number.parseInt(computed.getPropertyValue('border-bottom-width'));

  const paddingTop = Number.parseInt(computed.getPropertyValue('padding-top'));
  const paddingBottom = Number.parseInt(computed.getPropertyValue('padding-bottom'));

  const marginTop = Number.parseInt(computed.getPropertyValue('margin-top'));
  const marginBottom = Number.parseInt(computed.getPropertyValue('margin-bottom'));

  const { scrollHeight } = element;

  return borderTopWidth + borderBottomWidth + paddingTop + paddingBottom + marginBottom + marginTop + scrollHeight;
};
