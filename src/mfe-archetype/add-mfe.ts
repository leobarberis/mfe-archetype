import { normalize, strings } from "@angular-devkit/core";
import { camelize, classify } from "@angular-devkit/core/src/utils/strings";
import {
  apply,
  chain,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  template,
  Tree,
  url,
} from "@angular-devkit/schematics";
import { formatFile, updateFile, validatePort } from "./helper";
import { Schema } from "./schema";

export function addMFE(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const { name, port, route } = _options;
    validatePort(port);

    updateFile(
      "./src/App.js",
      "</Switch>",
      `<Route path="/${route}" component={${classify(name)}Lazy} /> \n`,
      tree
    );
    updateFile(
      "./src/App.js",
      "const history",
      `const ${classify(name)}Lazy = lazy(() => import("./components/${classify(
        name
      )}App")); \n`,
      tree
    );
    updateFile(
      "./config/webpack.dev.js",
      "// mfeRemotesEntries",
      `${camelize(name)}: "${camelize(
        name
      )}@http://localhost:${port}/remoteEntry.js", \n`,
      tree
    );
    updateFile(
      "./config/webpack.prod.js",
      "// mfeRemotesEntries",
      `${camelize(name)}: \`${camelize(
        name
      )}@/obe/modulos/${name}/remoteEntry.js\`, \n`,
      tree
    );

    function generateWrapper(): Rule {
      const templateSource = apply(url("./files/wrapper"), [
        template({ ..._options, ...strings }),
        move(normalize("./src/components")),
      ]);
      return mergeWith(templateSource, MergeStrategy.Overwrite);
    }

    const rule = chain([
      generateWrapper,
      formatFile(`./src/components/${classify(name)}App.js`, tree),
    ]);
    return rule(tree, _context) as Rule;
  };
}
