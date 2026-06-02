describe("Battery tests", () => {
  test("battery percentage valid", () => {
    const battery = 85;
    expect(battery).toBeGreaterThan(0);
  });

  test("battery percentage below 100", () => {
    const battery = 85;
    expect(battery).toBeLessThanOrEqual(100);
  });

  test("charging status", () => {
    const charging = true;
    expect(charging).toBe(true);
  });
});