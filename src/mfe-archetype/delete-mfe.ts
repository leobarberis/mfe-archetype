import { normalize } from "@angular-devkit/core";
import { camelize, classify } from "@angular-devkit/core/src/utils/strings";
import {
  SchematicContext,
  SchematicsException,
  Tree,
} from "@angular-devkit/schematics";
import { deleteFromFile, validatePort } from "./helper";
import { Schema } from "./schema";

export function deleteMFE(_options: Schema) {
  return (tree: Tree, _context: SchematicContext) => {
    const { name, port, route } = _options;
    validatePort(port);

    deleteFromFile(
      "./src/App.js",
      `<Route path="/${route}" component={${classify(name)}Lazy} /> \n`,
      tree
    );
    deleteFromFile(
      "./src/App.js",
      `const ${classify(name)}Lazy = lazy(() => import("./components/${classify(
        name
      )}App")); \n`,
      tree
    );
    deleteFromFile(
      "./config/webpack.dev.js",
      `${camelize(name)}: "${camelize(
        name
      )}@http://localhost:${port}/remoteEntry.js", \n`,
      tree
    );
    deleteFromFile(
      "./config/webpack.prod.js",
      `${camelize(name)}: \`${camelize(
        name
      )}@/obe/modulos/${name}/remoteEntry.js\`, \n`,
      tree
    );

    const oldFilePath = normalize(`./src/components/${classify(name)}App.js`);
    const oldFileBuffer = tree.read(oldFilePath);
    if (!oldFileBuffer) {
      throw new SchematicsException(`${oldFilePath} not found`);
    }

    tree.delete(oldFilePath);
  };
}
