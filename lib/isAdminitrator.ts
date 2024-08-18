export const isAdminitrator = (userId: string | undefined | null) => {
  return userId === process.env.NEXT_PUBLIC_ADMINISTRATOR;
};
