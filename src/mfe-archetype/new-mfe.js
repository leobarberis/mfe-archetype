"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newMfe = void 0;
const core_1 = require("@angular-devkit/core");
const strings_1 = require("@angular-devkit/core/src/utils/strings");
const schematics_1 = require("@angular-devkit/schematics");
const tasks_1 = require("@angular-devkit/schematics/tasks");
const gitignore_1 = require("./gitignore");
const helper_1 = require("./helper");
function newMfe(_options) {
    return (tree, _context) => {
        const { fw, routing, name, port } = _options;
        helper_1.validatePort(port);
        function generateMfe() {
            const templateSource = schematics_1.apply(schematics_1.url(`./files/${fw}/${routing ? "routing" : "no-routing"}`), [
                schematics_1.template(Object.assign(Object.assign({}, _options), core_1.strings)),
                () => {
                    tree.create(`./fe-obe-${strings_1.dasherize(name)}/.gitignore`, gitignore_1.gitignore);
                },
            ]);
            return schematics_1.mergeWith(templateSource, schematics_1.MergeStrategy.Overwrite);
        }
        function updateMFE(context) {
            return () => {
                context.addTask(new tasks_1.NodePackageInstallTask({
                    workingDirectory: `fe-obe-${strings_1.dasherize(name)}`,
                }), []);
            };
        }
        const rule = schematics_1.chain([generateMfe, updateMFE(_context)]);
        return rule(tree, _context);
    };
}
exports.newMfe = newMfe;
//# sourceMappingURL=new-mfe.js.map