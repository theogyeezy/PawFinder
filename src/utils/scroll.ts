import { ScrollTarget } from '../types/scroll';

export const scrollToElement = (elementId: ScrollTarget) => {
  const element = document.querySelector(`#${elementId}`);
  element?.scrollIntoView({ behavior: 'smooth' });
};