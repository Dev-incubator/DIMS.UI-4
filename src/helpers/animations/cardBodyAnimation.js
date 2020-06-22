export default function cardBodyAnimation() {
  return {
    config: { duration: 100 },
    initState: {
      opacity: 1,
      transform: 'scaleY(1)',
    },
    finalState: { opacity: 0, transform: 'scaleY(0)' },
  };
}
