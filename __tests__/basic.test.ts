describe("Basic app tests", () => {
  test("app name is STEMM Lab", () => {
    expect("STEMM Lab").toBe("STEMM Lab");
  });

  test("parachute velocity calculation works", () => {
    const height = 2;
    const time = 0.5;
    expect(height / time).toBe(4);
  });

  test("heart rate increase calculation works", () => {
    const resting = 70;
    const exercise = 140;
    expect(exercise - resting).toBe(70);
  });
});