export const getProfiles = async () => {
  //simulates 1 second loading time
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    {
      pname: "Jason Cornish",
      proNoun: "He/They",
      profilePicture: "TBD",
      city: "Austin",
      state: "TX",
      maxRouteV: "V7",
      maxRouteFont: "5.14a",
    },
    {
      pname: "Ben Ballard",
      proNoun: "He/Him",
      profilePicture: "TBD",
      city: "Austin",
      state: "TX",
      maxRouteV: "V99",
      maxRouteFont: "5.99c",
    },
  ];
};
