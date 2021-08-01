import { strings } from "@angular-devkit/core";
import { apply, chain, MergeStrategy, mergeWith, Rule, SchematicContext, template, Tree, url } from "@angular-devkit/schematics";
import { NodePackageInstallTask } from "@angular-devkit/schematics/tasks";
import { Schema } from "./schema";

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
              workingDirectory: "fe-obe-container",
            })
          );
        };
      }
  
      const rule = chain([generateContainer, updateContainer(_context)]);
      return rule(tree, _context) as Rule;
    };
  }