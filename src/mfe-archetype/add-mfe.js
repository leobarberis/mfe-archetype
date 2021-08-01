"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMFE = void 0;
const core_1 = require("@angular-devkit/core");
const strings_1 = require("@angular-devkit/core/src/utils/strings");
const schematics_1 = require("@angular-devkit/schematics");
const helper_1 = require("./helper");
function addMFE(_options) {
    return (tree, _context) => {
        const { name, port, route } = _options;
        helper_1.validatePort(port);
        helper_1.updateFile("./src/App.js", "</Switch>", `<Route path="/${route}" component={${strings_1.classify(name)}Lazy} /> \n`, tree);
        helper_1.updateFile("./src/App.js", "const history", `const ${strings_1.classify(name)}Lazy = lazy(() => import("./components/${strings_1.classify(name)}App")); \n`, tree);
        helper_1.updateFile("./config/webpack.dev.js", "// mfeRemotesEntries", `${strings_1.camelize(name)}: "${strings_1.camelize(name)}@http://localhost:${port}/remoteEntry.js", \n`, tree);
        helper_1.updateFile("./config/webpack.prod.js", "// mfeRemotesEntries", `${strings_1.camelize(name)}: \`${strings_1.camelize(name)}@/obe/modulos/${name}/remoteEntry.js\`, \n`, tree);
        function generateWrapper() {
            const templateSource = schematics_1.apply(schematics_1.url("./files/wrapper"), [
                schematics_1.template(Object.assign(Object.assign({}, _options), core_1.strings)),
                schematics_1.move(core_1.normalize("./src/components")),
            ]);
            return schematics_1.mergeWith(templateSource, schematics_1.MergeStrategy.Overwrite);
        }
        const rule = schematics_1.chain([
            generateWrapper,
            helper_1.formatFile(`./src/components/${strings_1.classify(name)}App.js`, tree),
        ]);
        return rule(tree, _context);
    };
}
exports.addMFE = addMFE;
//# sourceMappingURL=add-mfe.js.map