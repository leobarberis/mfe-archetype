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
import {
  camelize,
  capitalize,
  classify,
} from "@angular-devkit/core/src/utils/strings";
const prettier = require("prettier");

export function newContainerMfe(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const container = newContainer(_options);
    const mfe = newMfe(_options);
    const addMfe = addMFE(_options);
    const rule = chain([container, mfe, addMfe]);
    return rule(tree, _context) as Rule;
  };
}

export function deleteMFE(_options: Schema) {
  return (tree: Tree, _context: SchematicContext) => {
    const { name, port } = _options; 

    function deleteFromFile(path: string, oldContent: string) {
      const normPath = normalize(path);
      const buffer = tree.read(normPath);
      const content = buffer?.toString();
      if(!content) {
        throw new SchematicsException(`${path} not found`);
      }

      const updatedContent = content.replace(oldContent, '');
      tree.overwrite(normPath, prettier.format(updatedContent, { semi: true, parser: "babel" }));
    }

    deleteFromFile("./container/src/App.js",`<Route path="/${name}" component={${capitalize(name)}Lazy} />`);
    deleteFromFile("./container/src/App.js",`const ${capitalize(name)}Lazy = lazy(() => import("./components/${capitalize(name)}App"));`);
    deleteFromFile("./container/config/webpack.dev.js",`${camelize(name)}: "${camelize(name)}@http://localhost:${port}/remoteEntry.js",`)
    deleteFromFile("./container/config/webpack.prod.js",`${camelize(name)}: \`${camelize(name)}@\${${name}_domain}/remoteEntry.js\`,`);

    const oldFilePath = normalize(`./container/src/components/${classify(name)}App.js`);
    const oldFileBuffer = tree.read(oldFilePath);
    if(!oldFileBuffer){
      throw new SchematicsException(`${oldFilePath} not found`); 
    }

    tree.delete(oldFilePath);

  }
}

export function addMFE(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const { name, port } = _options;

    function formatFile(path: string): Rule {
      return () => {
        const normPath = normalize(path);
        const content = tree.read(normPath);
        if (content) {
          const formatted = prettier.format(content.toString(), {
            semi: true,
            parser: "babel",
          });
          tree.overwrite(normPath, formatted);
        }
      };
    } 

    function updateFile(path: string, appendRef: string, newContent: string) {
      const normPath = normalize(path);
      const buffer = tree.read(normPath);
      const content = buffer?.toString();
      if(!content) {
        throw new SchematicsException(`${path} not found`);
      }

      const _appendIndex = content.indexOf(appendRef);
      const updatedContent = content.slice(0, _appendIndex) + newContent + content.slice(_appendIndex);
      tree.overwrite(normPath, prettier.format(updatedContent, { semi: true, parser: "babel" }));
    }

    updateFile("./container/src/App.js","</Switch>",`<Route path="/${name}" component={${capitalize(name)}Lazy} /> \n`);
    updateFile("./container/src/App.js","const history",`const ${capitalize(name)}Lazy = lazy(() => import("./components/${capitalize(name)}App")); \n`);
    updateFile("./container/config/webpack.dev.js","// mfeRemotesEntries",`${camelize(name)}: "${camelize(name)}@http://localhost:${port}/remoteEntry.js", \n`)
    updateFile("./container/config/webpack.prod.js","// mfeRemotesEntries",`${camelize(name)}: \`${camelize(name)}@\${${name}_domain}/remoteEntry.js\`, \n`);

    function generateWrapper(): Rule {
      const templateSource = apply(url("./files/wrapper"), [
        template({ ..._options, ...strings }),
        move(normalize("./container/src/components")),
      ]);
      return mergeWith(templateSource, MergeStrategy.Overwrite);
    }  

    const rule = chain([generateWrapper, formatFile(`./container/src/components/${classify(name)}App.js`)]);
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
