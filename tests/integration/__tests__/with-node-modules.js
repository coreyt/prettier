import runPrettier from "../run-prettier.js";
import jestPathSerializer from "../path-serializer.js";

expect.addSnapshotSerializer(jestPathSerializer);

describe("ignores node_modules by default", () => {
  runPrettier("cli/with-node-modules", ["**/*.js", "-l"]).test({
    status: 1,
  });
});

describe("ignores node_modules by with ./**/*.js", () => {
  runPrettier("cli/with-node-modules", ["./**/*.js", "-l"]).test({
    status: 1,
  });
});

describe("doesn't ignore node_modules with --with-node-modules flag", () => {
  runPrettier("cli/with-node-modules", [
    "**/*.js",
    "-l",
    "--with-node-modules",
  ]).test({
    status: 1,
  });
});

describe("ignores node_modules by default for file list", () => {
  runPrettier("cli/with-node-modules", [
    "node_modules/node-module.js",
    "not_node_modules/file.js",
    "nested/node_modules/node-module.js",
    "regular-module.js",
    "-l",
  ]).test({
    status: 1,
  });
});

describe("doesn't ignore node_modules with --with-node-modules flag for file list", () => {
  runPrettier("cli/with-node-modules", [
    "node_modules/node-module.js",
    "not_node_modules/file.js",
    "nested/node_modules/node-module.js",
    "regular-module.js",
    "-l",
    "--with-node-modules",
  ]).test({
    status: 1,
  });
});
