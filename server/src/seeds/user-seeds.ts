import { User } from "../models/user.js";

export const seedUsers = async () => {
  await User.bulkCreate(
    [
      { username: "ScriptWizard", password: "semicolon" },
      { username: "BugHunter", password: "debugging" },
      { username: "ReactRandy", password: "jsxalltheway" },
      { username: "SQLSally", password: "3nFUN" },
      { username: "MongoMona", password: "nosqlforme" },
    ],
    { individualHooks: true }
  );
};
