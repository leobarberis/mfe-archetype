import { normalize } from "@angular-devkit/core";
import { Rule, SchematicsException, Tree } from "@angular-devkit/schematics";
const prettier = require("prettier");

export const validatePort = (port: any) => {
  if (!Number(port)) {
    throw new SchematicsException("Invalid port");
  }
};

export function formatFile(path: string, tree: Tree): Rule {
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

export function updateFile(
  path: string,
  appendRef: string,
  newContent: string,
  tree: Tree
) {
  const normPath = normalize(path);
  const buffer = tree.read(normPath);
  const content = buffer?.toString();
  if (!content) {
    throw new SchematicsException(`${path} not found`);
  }

  const _appendIndex = content.indexOf(appendRef);
  const updatedContent =
    content.slice(0, _appendIndex) + newContent + content.slice(_appendIndex);
  tree.overwrite(
    normPath,
    prettier.format(updatedContent, { semi: true, parser: "babel" })
  );
}

export function deleteFromFile(path: string, oldContent: string, tree: Tree) {
  const normPath = normalize(path);
  const buffer = tree.read(normPath);
  const content = buffer?.toString();
  if (!content) {
    throw new SchematicsException(`${path} not found`);
  }

  const updatedContent = content.replace(oldContent, "");
  tree.overwrite(
    normPath,
    prettier.format(updatedContent, { semi: true, parser: "babel" })
  );
}
