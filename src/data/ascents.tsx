export const getAscents = async () => {
  //simulates 1 second loading time
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    {
      name: "Sophies Problem",
      routeType: "boulders",
      grade: "V8",
      attempts: 3,
      date: 1693516428,
      angle: 45,
      location: "Moonboard",
      id: 7,
    },
    {
      name: "Red Route",
      routeType: "Routes",
      grade: "11a",
      attempts: 3,
      date: 1693516428,
      angle: 15,
      location: "Mesa Rim",
      id: 8,
    },
    {
      name: "Jonah's Problem",
      routeType: "Boulders",
      grade: "V7",
      attempts: 2,
      date: 1693516428,
      angle: 45,
      location: "Moonboard",
      id: 9,
    },
    {
      name: "Tom Eatz Brickz",
      routeType: "Boulders",
      grade: "V7",
      attempts: 1,
      date: 1693516428,
      angle: 45,
      location: "Moonboard",
      id: 1,
    },
    {
      name: "Sophies Problem",
      routeType: "Boulders",
      grade: "V7",
      attempts: 1,
      date: 1693516428,
      angle: 45,
      location: "Moonboard",
      id: 2,
    },
    {
      name: "Sophies Problem",
      routeType: "Boulders",
      grade: "V7",
      attempts: 1,
      date: 1693516428,
      angle: 45,
      location: "Moonboard",
      id: 3,
    },
    {
      name: "Sophies Problem",
      routeType: "Boulders",
      grade: "V7",
      attempts: 1,
      date: 1693516428,
      angle: 45,
      location: "Moonboard",
      id: 5,
    },
    {
      name: "Sophies Problem",
      routeType: "Boulders",
      grade: "V7",
      attempts: 1,
      date: 1693516428,
      angle: 45,
      location: "Moonboard",
      id: 6,
    },
  ];
};
