import {decodeUser} from "../../utils/tools";
import {getToken, user} from "../utils";


test("decode user", () => {

  const token = getToken();

  expect(decodeUser("bad_token")).toBe(null);
  expect(decodeUser(undefined)).toBe(null);
  expect(decodeUser(false)).toBe(null);
  expect(decodeUser(token)).toHaveProperty("_id");
  expect(decodeUser(token)).toHaveProperty("firstName", user.firstName);
  expect(decodeUser(token)).toHaveProperty("lastName", user.lastName);
  expect(decodeUser(token)).toHaveProperty("email", user.email);
  expect(decodeUser(token)).toHaveProperty("phone", user.phone);
  expect(decodeUser(token)).toHaveProperty("su", user.su);

});