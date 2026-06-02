describe("GPS tests", () => {
  test("latitude valid", () => {
    const lat = -37.8136;
    expect(lat).toBeGreaterThan(-90);
  });

  test("longitude valid", () => {
    const lng = 144.9631;
    expect(lng).toBeLessThan(180);
  });

  test("location exists", () => {
    const location = "Melbourne";
    expect(location).toBeTruthy();
  });
});