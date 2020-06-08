export default function cardBodyAnimation() {
  return {
    config: { duration: 100 },
    initState: {
      opacity: 1,
      height: 65,
      transform: 'scaleY(1)',
    },
    finalState: { opacity: 0, height: 30, transform: 'scaleY(0)' },
  };
}
