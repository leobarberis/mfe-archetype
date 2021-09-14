"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildContainer = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const core_1 = require("@angular-devkit/core");
const strings_1 = require("@angular-devkit/core/src/utils/strings");
const helper_1 = require("./helper");
const new_container_1 = require("./new-container");
function buildContainer(_options) {
    return (tree, _context) => {
        const { port } = _options;
        helper_1.validatePort(port);
        const container = new_container_1.newContainer(_options);
        const addMfe = initMfe(_options);
        const rule = schematics_1.chain([container, addMfe]);
        return rule(tree, _context);
    };
}
exports.buildContainer = buildContainer;
function initMfe(_options) {
    return (tree, _context) => {
        const { name, port, route, baseDevUrl } = _options;
        helper_1.validatePort(port);
        helper_1.updateFile("./fe-obe-container/src/App.js", "</Switch>", `<Route path="/${route}" component={${strings_1.classify(name)}Lazy} /> \n`, tree);
        helper_1.updateFile("./fe-obe-container/src/App.js", "const history", `const ${strings_1.classify(name)}Lazy = lazy(() => import("./components/${strings_1.classify(name)}App")); \n`, tree);
        helper_1.updateFile("./fe-obe-container/config/webpack.dev.js", "// mfeRemotesEntries", `${strings_1.camelize(name)}: "${strings_1.camelize(name)}@http://localhost:${port}${baseDevUrl}remoteEntry.js", \n`, tree);
        helper_1.updateFile("./fe-obe-container/config/webpack.prod.js", "// mfeRemotesEntries", `${strings_1.camelize(name)}: \`${strings_1.camelize(name)}@http://localhost/obe/modulos/${name}/remoteEntry.js\`, \n`, tree);
        function generateWrapper() {
            const templateSource = schematics_1.apply(schematics_1.url("./files/wrapper"), [
                schematics_1.template(Object.assign(Object.assign({}, _options), core_1.strings)),
                schematics_1.move(core_1.normalize("./fe-obe-container/src/components")),
            ]);
            return schematics_1.mergeWith(templateSource, schematics_1.MergeStrategy.Overwrite);
        }
        const rule = schematics_1.chain([
            generateWrapper,
            helper_1.formatFile(`./fe-obe-container/src/components/${strings_1.classify(name)}App.js`, tree),
        ]);
        return rule(tree, _context);
    };
}
//# sourceMappingURL=index.js.map