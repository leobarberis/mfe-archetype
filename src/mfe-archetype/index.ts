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
import { Schema } from "./schema";
import { normalize, strings } from "@angular-devkit/core";
import { camelize, classify } from "@angular-devkit/core/src/utils/strings";
import { formatFile, updateFile, validatePort } from "./helper";
import { newContainer } from "./new-container";

export function buildContainer(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const { port } = _options;
    validatePort(port);
    const container = newContainer(_options);
    const addMfe = initMfe(_options);
    const rule = chain([container, addMfe]);
    return rule(tree, _context) as Rule;
  };
}

function initMfe(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const { name, port, route, baseDevUrl } = _options;
    validatePort(port);

    updateFile(
      "./fe-obe-container/src/App.js",
      "</Switch>",
      `<Route path="/${route}" component={${classify(name)}Lazy} /> \n`,
      tree
    );
    updateFile(
      "./fe-obe-container/src/App.js",
      "const history",
      `const ${classify(name)}Lazy = lazy(() => import("./components/${classify(
        name
      )}App")); \n`,
      tree
    );
    updateFile(
      "./fe-obe-container/config/webpack.dev.js",
      "// mfeRemotesEntries",
      `${camelize(name)}: "${camelize(
        name
      )}@http://localhost:${port}${baseDevUrl}remoteEntry.js", \n`,
      tree
    );
    updateFile(
      "./fe-obe-container/config/webpack.prod.js",
      "// mfeRemotesEntries",
      `${camelize(name)}: \`${camelize(
        name
      )}@http://localhost/obe/modulos/${name}/remoteEntry.js\`, \n`,
      tree
    );

    function generateWrapper(): Rule {
      const templateSource = apply(url("./files/wrapper"), [
        template({ ..._options, ...strings }),
        move(normalize("./fe-obe-container/src/components")),
      ]);
      return mergeWith(templateSource, MergeStrategy.Overwrite);
    }

    const rule = chain([
      generateWrapper,
      formatFile(
        `./fe-obe-container/src/components/${classify(name)}App.js`,
        tree
      ),
    ]);
    return rule(tree, _context) as Rule;
  };
}
