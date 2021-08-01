import { Rule, Tree } from "@angular-devkit/schematics";
export declare const validatePort: (port: any) => void;
export declare function formatFile(path: string, tree: Tree): Rule;
export declare function updateFile(path: string, appendRef: string, newContent: string, tree: Tree): void;
export declare function deleteFromFile(path: string, oldContent: string, tree: Tree): void;
