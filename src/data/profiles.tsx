export const getProfile = async () => {
  //simulates 1 second loading time
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    // name: "Fallen Oak Myco",
    // email: "jasoncornish14@gmail.com",
    // profilePicture: "TBD",
  };
};
