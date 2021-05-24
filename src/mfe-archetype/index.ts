import {
  apply,
  chain,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  SchematicsException,
  template,
  Tree,
  url,
} from "@angular-devkit/schematics";
import { Schema } from "./schema";
import { Framework } from "./framework";
import { normalize, strings } from "@angular-devkit/core";
import { NodePackageInstallTask } from "@angular-devkit/schematics/tasks";
import { camelize, capitalize } from "@angular-devkit/core/src/utils/strings";

export function addMFE(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const { name, port } = _options;
    function updateAppRoute(tree: Tree) {
      const path = normalize("./container/src/App.js");
      const buffer = tree.read(path);
      const content = buffer?.toString();
      if (!content) {
        throw new SchematicsException("App.js not found");
      }

      const appendIndex = content.indexOf("</Switch>");
      const content2Append = `<Route path="/${name}" component={${capitalize(
        name
      )}Lazy} /> \n`;
      const updatedContent =
        content.slice(0, appendIndex) +
        content2Append +
        content.slice(appendIndex);
      tree.overwrite(path, updatedContent);
    }

    function updateAppWrapper(tree: Tree) {
      const path = normalize("./container/src/App.js");
      const buffer = tree.read(path);
      const content = buffer?.toString();
      if (!content) {
        throw new SchematicsException("App.js not found");
      }

      const appendIndex = content.indexOf("const history");
      const content2Append = `const ${capitalize(
        name
      )}Lazy = lazy(() => import("./components/${capitalize(name)}App")); \n`;
      const updatedContent =
        content.slice(0, appendIndex) +
        content2Append +
        content.slice(appendIndex);
      tree.overwrite(path, updatedContent);
    }

    function updateAppWebPackDev(tree: Tree) {
      const path = normalize("./container/config/webpack.dev.js");
      const buffer = tree.read(path);
      const content = buffer?.toString();
      if (!content) {
        throw new SchematicsException("webpack.dev.js not found");
      }

      const appendIndex = content.indexOf("// mfeRemotesEntries");
      const content2Append = `${camelize(name)}: "${camelize(
        name
      )}@http://localhost:${port}/remoteEntry.js", \n`;
      const updatedContent =
        content.slice(0, appendIndex) +
        content2Append +
        content.slice(appendIndex);
      tree.overwrite(path, updatedContent);
    }

    function updateAppWebPackProd(tree: Tree) {
      const path = normalize("./container/config/webpack.prod.js");
      const buffer = tree.read(path);
      const content = buffer?.toString();
      if (!content) {
        throw new SchematicsException("webpack.prod.js not found");
      }

      const appendIndex = content.indexOf("// mfeRemotesEntries");
      const content2Append = `${camelize(name)}: \`${camelize(
        name
      )}@\${domain}/remoteEntry.js\`, \n`;
      const updatedContent =
        content.slice(0, appendIndex) +
        content2Append +
        content.slice(appendIndex);
      tree.overwrite(path, updatedContent);
    }

    function generateWrapper(): Rule {
      const templateSource = apply(url("./files/wrapper"), [
        template({ ..._options, ...strings }),
        move(normalize("./container/src/components")),
      ]);
      return mergeWith(templateSource, MergeStrategy.Overwrite);
    }

    updateAppRoute(tree);
    updateAppWrapper(tree);
    updateAppWebPackDev(tree);
    updateAppWebPackProd(tree);

    const rule = chain([generateWrapper]);
    return rule(tree, _context) as Rule;
  };
}

export function newContainer(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    function generateContainer(): Rule {
      const templateSource = apply(url("./files/container"), [
        template({ ..._options, ...strings }),
      ]);
      return mergeWith(templateSource, MergeStrategy.Overwrite);
    }

    function updateContainer(context: SchematicContext): Rule {
      return () => {
        context.addTask(
          new NodePackageInstallTask({
            packageManager: "npm",
            workingDirectory: "container",
          })
        );
      };
    }

    const rule = chain([generateContainer, updateContainer(_context)]);
    return rule(tree, _context) as Rule;
  };
}

export function newMfe(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const { fw, routing, name } = _options;

    function generateMfe(): Rule {
      const templateSource = apply(
        url(`./files/${fw}/${routing ? "routing" : "no-routing"}`),
        [template({ ..._options, ...strings })]
      );
      return mergeWith(templateSource, MergeStrategy.Overwrite);
    }

    function updateMFE(context: SchematicContext): Rule {
      return fw == Framework.angular
        ? () => {
            context.addTask(
              new NodePackageInstallTask({
                packageManager: "yarn",
                workingDirectory: name,
              }),
              []
            );
          }
        : () => {
            context.addTask(
              new NodePackageInstallTask({
                packageManager: "npm",
                workingDirectory: name,
              }),
              []
            );
          };
    }

    const rule = chain([generateMfe, updateMFE(_context)]);

    return rule(tree, _context) as Rule;
  };
}
