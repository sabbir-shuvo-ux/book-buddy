export const getWelcomeMessage = (name: string): string => {
  const hour = new Date().getHours();

  let greeting = "Hello";

  if (hour >= 5 && hour < 12) {
    greeting = "Good morning";
  } else if (hour >= 12 && hour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  return `${greeting}, ${name}!`;
};
