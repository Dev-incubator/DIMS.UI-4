import changeColorScheme from '../changeColorScheme';

export default function cardHeaderAnimation() {
  return {
    initState: {
      config: { duration: 200 },
      background: changeColorScheme.currentColors.primaryBg,
      transform: 'scale(1)',
    },
    finalState: {
      config: { duration: 200 },
      background: changeColorScheme.currentColors.highlightBg,
      transform: 'scale(1.01)',
    },
  };
}
