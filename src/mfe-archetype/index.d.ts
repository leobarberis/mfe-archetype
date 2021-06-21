import { Rule, SchematicContext, Tree } from "@angular-devkit/schematics";
import { Schema } from "./schema";
export declare function deleteMFE(_options: Schema): (tree: Tree, _context: SchematicContext) => void;
export declare function addMFE(_options: Schema): Rule;
export declare function newContainer(_options: Schema): Rule;
export declare function buildContainer(_options: Schema): Rule;
export declare function newMfe(_options: Schema): Rule;
