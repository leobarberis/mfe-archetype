import { strings } from "@angular-devkit/core";
import { dasherize } from "@angular-devkit/core/src/utils/strings";
import {
  apply,
  chain,
  MergeStrategy,
  mergeWith,
  Rule,
  SchematicContext,
  template,
  Tree,
  url,
} from "@angular-devkit/schematics";
import { NodePackageInstallTask } from "@angular-devkit/schematics/tasks";
import { gitignore } from "./gitignore";
import { validatePort } from "./helper";
import { Schema } from "./schema";

export function newMfe(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const { fw, routing, name, port } = _options;
    validatePort(port);

    function generateMfe(): Rule {
      const templateSource = apply(
        url(`./files/${fw}/${routing ? "routing" : "no-routing"}`),
        [
          template({ ..._options, ...strings }),
          () => {
            tree.create(`./fe-obe-${dasherize(name)}/.gitignore`, gitignore);
          },
        ]
      );
      return mergeWith(templateSource, MergeStrategy.Overwrite);
    }

    function updateMFE(context: SchematicContext): Rule {
      return () => {
        context.addTask(
          new NodePackageInstallTask({
            workingDirectory: `fe-obe-${dasherize(name)}`,
          }),
          []
        );
      };
    }

    const rule = chain([generateMfe, updateMFE(_context)]);

    return rule(tree, _context) as Rule;
  };
}
