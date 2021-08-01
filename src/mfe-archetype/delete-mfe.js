"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMFE = void 0;
const core_1 = require("@angular-devkit/core");
const strings_1 = require("@angular-devkit/core/src/utils/strings");
const schematics_1 = require("@angular-devkit/schematics");
const helper_1 = require("./helper");
function deleteMFE(_options) {
    return (tree, _context) => {
        const { name, port } = _options;
        helper_1.validatePort(port);
        helper_1.deleteFromFile("./src/App.js", `<Route path="/${name}" component={${strings_1.capitalize(name)}Lazy} />`, tree);
        helper_1.deleteFromFile("./src/App.js", `const ${strings_1.capitalize(name)}Lazy = lazy(() => import("./components/${strings_1.capitalize(name)}App"));`, tree);
        helper_1.deleteFromFile("./config/webpack.dev.js", `${strings_1.camelize(name)}: "${strings_1.camelize(name)}@http://localhost:${port}/remoteEntry.js",`, tree);
        helper_1.deleteFromFile("./config/webpack.prod.js", `${strings_1.camelize(name)}: \`${strings_1.camelize(name)}@\${${name}_domain}/remoteEntry.js\`,`, tree);
        const oldFilePath = core_1.normalize(`./src/components/${strings_1.classify(name)}App.js`);
        const oldFileBuffer = tree.read(oldFilePath);
        if (!oldFileBuffer) {
            throw new schematics_1.SchematicsException(`${oldFilePath} not found`);
        }
        tree.delete(oldFilePath);
    };
}
exports.deleteMFE = deleteMFE;
//# sourceMappingURL=delete-mfe.js.map