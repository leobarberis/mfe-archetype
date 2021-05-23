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
import { Schema } from "./schema";
import { Framework } from "./framework";
import { strings } from "@angular-devkit/core";
import { NodePackageInstallTask } from "@angular-devkit/schematics/tasks";

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
