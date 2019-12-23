const validateUser = require("./validateUser");

const cases = [
  {
    description: "null",
    user: null,
    valid: false
  },
  {
    description: "undefined",
    user: undefined,
    valid: false
  },
  {
    description: "no email",
    user: {
      firstName: "Alex",
      lastName: "Fooooo",
      password: "foobarA"
    },
    valid: false
  },
  {
    description: "no password",
    user: {
      email: "some10@gmail.com",
      firstName: "Alex",
      lastName: "Fooooo"
    },
    valid: false
  },
  {
    description: "no firstName",
    user: {
      email: "some10@gmail.com",
      lastName: "Fooooo",
      password: "foobarA"
    },
    valid: false
  },
  {
    description: "no lastName",
    user: {
      email: "some10@gmail.com",
      firstName: "Alex",
      password: "foobarA"
    },
    valid: false
  },
  {
    description: "invalid email format 1",
    user: {
      email: "foobar",
      firstName: "Alex",
      lastName: "Fooooo",
      password: "fo0bAr3"
    },
    valid: false
  },
  {
    description: "invalid email format 2",
    user: {
      email: "foobar@",
      firstName: "Alex",
      lastName: "Fooooo",
      password: "fo0bAr3"
    },
    valid: false
  },
  {
    description: "invalid email format 3",
    user: {
      email: "foobar@.",
      firstName: "Alex",
      lastName: "Fooooo",
      password: "fo0bAr3"
    },
    valid: false
  },
  {
    description: "short password (<= 6 chars)",
    user: {
      email: "some10@gmail.com",
      firstName: "Alex",
      lastName: "Fooooo",
      password: "fo0bAr"
    },
    valid: false
  },
  {
    description: "no capital letter in the password",
    user: {
      email: "some10@gmail.com",
      firstName: "Alex",
      lastName: "Fooooo",
      password: "foobaar"
    },
    valid: false
  },
  {
    description: "log firstName (26 chars)",
    user: {
      email: "some10@gmail.com",
      firstName: "foooooooooooooooooooooooo",
      lastName: "Fooooo",
      password: "foob"
    },
    valid: false
  },
  {
    description: "log lastName (26 chars)",
    user: {
      email: "some10@gmail.com",
      firstName: "Fooooo",
      lastName: "foooooooooooooooooooooooo",
      password: "foob"
    },
    valid: false
  },
  {
    description: "long city",
    user: {
      email: "some10@gmail.com",
      firstName: "Alex",
      lastName: "Fooooo",
      password: "foobarA",
      city: "Fooooooooooooooooooooo"
    },
    valid: true
  },
  {
    description: "valid without a city",
    user: {
      email: "some10@gmail.com",
      firstName: "Alex",
      lastName: "Fooooo",
      password: "foobarA"
    },
    valid: true
  },
  {
    description: "valid with a city",
    user: {
      email: "some10@gmail.com",
      firstName: "Alex",
      lastName: "Fooooo",
      password: "foobarA",
      city: "Kiev"
    },
    valid: true
  }
];

describe("validateUser", () => {
  describe(`returns validation error as a string if user is invalid`, () => {
    cases.forEach(({ description, user, valid }) =>
      it(description, () => {
        const err = validateUser(user);
        if (valid) expect(err).toBeFalsy();
        else {
          expect(typeof err).toBe("string");
          expect(err.length).toBeGreaterThan(0);
        }
      })
    );
  });
});
