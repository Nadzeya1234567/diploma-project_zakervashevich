import { getEmailError, getPasswordError } from "../validation";

describe("Get email error", () => {
  describe("Invalid", () => {
    const values = ["", "sdfrs", "dtdrd456", "dtdrd456@e", "dt6@eeeee.", "@eeeee.rtrrr", "erer@.rtrrr"];
    values.forEach((email, i) => {
      test(`${i}. Email - ${email}`, () => {
        const result = getEmailError(email);
        expect(result).toEqual("Email is not valid");
      });
    });
  });

  describe("Valid", () => {
    const values = ["sdfrs@tytyt.tyu", "df@df.df", "dfsaaa@rtttt.t", "dfaa@dfar.dfs", "1df@t.ydpppk", "1@2.3"];
    values.forEach((email, i) => {
      test(`${i}. Email - ${email}`, () => {
        const result = getEmailError(email);
        expect(result).toEqual("");
      });
    });
  });
});

describe("Get password error", () => {
  describe("Invalid", () => {
    const values = ["", "a", "1d", "dhd", "123", "@32", "..."];
    values.forEach((password, i) => {
      test(`${i}. Password - ${password}`, () => {
        const result = getPasswordError(password);
        expect(result).toEqual("Password is not valid");
      });
    });
  });

  describe("Valid", () => {
    const values = ["fgfh", "1fdrsf", "dgdgll9876", "1234"];
    values.forEach((password, i) => {
      test(`${i}. Password - ${password}`, () => {
        const result = getPasswordError(password);
        expect(result).toEqual("");
      });
    });
  });
});
