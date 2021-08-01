import { normalize } from "@angular-devkit/core";
import {
  camelize,
  capitalize,
  classify,
} from "@angular-devkit/core/src/utils/strings";
import {
  SchematicContext,
  SchematicsException,
  Tree,
} from "@angular-devkit/schematics";
import { deleteFromFile, validatePort } from "./helper";
import { Schema } from "./schema";

export function deleteMFE(_options: Schema) {
  return (tree: Tree, _context: SchematicContext) => {
    const { name, port } = _options;
    validatePort(port);

    deleteFromFile(
      "./src/App.js",
      `<Route path="/${name}" component={${capitalize(name)}Lazy} />`,
      tree
    );
    deleteFromFile(
      "./src/App.js",
      `const ${capitalize(
        name
      )}Lazy = lazy(() => import("./components/${capitalize(name)}App"));`,
      tree
    );
    deleteFromFile(
      "./config/webpack.dev.js",
      `${camelize(name)}: "${camelize(
        name
      )}@http://localhost:${port}/remoteEntry.js",`,
      tree
    );
    deleteFromFile(
      "./config/webpack.prod.js",
      `${camelize(name)}: \`${camelize(
        name
      )}@\${${name}_domain}/remoteEntry.js\`,`,
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
