"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newMfe = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const framework_1 = require("./framework");
const core_1 = require("@angular-devkit/core");
const tasks_1 = require("@angular-devkit/schematics/tasks");
function newMfe(_options) {
    return (tree, _context) => {
        const { fw, routing, name } = _options;
        function generateMfe() {
            const templateSource = schematics_1.apply(schematics_1.url(`./files/${fw}/${routing ? "routing" : "no-routing"}`), [schematics_1.template(Object.assign(Object.assign({}, _options), core_1.strings))]);
            return schematics_1.mergeWith(templateSource, schematics_1.MergeStrategy.Overwrite);
        }
        function updateMFE(context) {
            return fw == framework_1.Framework.angular
                ? () => {
                    context.addTask(new tasks_1.NodePackageInstallTask({
                        packageManager: "yarn",
                        workingDirectory: name,
                    }), []);
                }
                : () => {
                    context.addTask(new tasks_1.NodePackageInstallTask({
                        packageManager: "npm",
                        workingDirectory: name,
                    }), []);
                };
        }
        const rule = schematics_1.chain([generateMfe, updateMFE(_context)]);
        return rule(tree, _context);
    };
}
exports.newMfe = newMfe;
//# sourceMappingURL=index.js.map