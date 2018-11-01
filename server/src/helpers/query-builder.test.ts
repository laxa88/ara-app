import SQL from "sql-template-strings";
import builder from "./query-builder";

describe("query helper", () => {
  it("should return single SQL", () => {
    const result = builder(SQL`aaa`);
    expect(result).toEqual(SQL`aaa`);
  });

  it("should return appended SQLs", () => {
    const result = builder(SQL`aaa`, SQL`bbb`, SQL`ccc`);
    expect(result).toEqual(SQL`aaabbbccc`);
  });
});
