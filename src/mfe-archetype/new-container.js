"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newContainer = void 0;
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const tasks_1 = require("@angular-devkit/schematics/tasks");
function newContainer(_options) {
    return (tree, _context) => {
        function generateContainer() {
            const templateSource = schematics_1.apply(schematics_1.url("./files/container"), [
                schematics_1.template(Object.assign(Object.assign({}, _options), core_1.strings)),
            ]);
            return schematics_1.mergeWith(templateSource, schematics_1.MergeStrategy.Overwrite);
        }
        function updateContainer(context) {
            return () => {
                context.addTask(new tasks_1.NodePackageInstallTask({
                    workingDirectory: "fe-obe-container",
                }));
            };
        }
        const rule = schematics_1.chain([generateContainer, updateContainer(_context)]);
        return rule(tree, _context);
    };
}
exports.newContainer = newContainer;
//# sourceMappingURL=new-container.js.map