"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newMfe = exports.newContainer = exports.addMFE = exports.newContainerMfe = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const framework_1 = require("./framework");
const core_1 = require("@angular-devkit/core");
const tasks_1 = require("@angular-devkit/schematics/tasks");
const strings_1 = require("@angular-devkit/core/src/utils/strings");
const prettier = require("prettier");
function newContainerMfe(_options) {
    return (tree, _context) => {
        const container = newContainer(_options);
        const mfe = newMfe(_options);
        const addMfe = addMFE(_options);
        const rule = schematics_1.chain([container, mfe, addMfe]);
        return rule(tree, _context);
    };
}
exports.newContainerMfe = newContainerMfe;
function addMFE(_options) {
    return (tree, _context) => {
        const { name, port } = _options;
        function updateAppRoute(tree) {
            const path = core_1.normalize("./container/src/App.js");
            const buffer = tree.read(path);
            const content = buffer === null || buffer === void 0 ? void 0 : buffer.toString();
            if (!content) {
                throw new schematics_1.SchematicsException("App.js not found");
            }
            const appendIndex = content.indexOf("</Switch>");
            const content2Append = `<Route path="/${name}" component={${strings_1.capitalize(name)}Lazy} /> \n`;
            const updatedContent = content.slice(0, appendIndex) +
                content2Append +
                content.slice(appendIndex);
            tree.overwrite(path, prettier.format(updatedContent, { semi: true, parser: "babel" }));
        }
        function updateAppWrapper(tree) {
            const path = core_1.normalize("./container/src/App.js");
            const buffer = tree.read(path);
            const content = buffer === null || buffer === void 0 ? void 0 : buffer.toString();
            if (!content) {
                throw new schematics_1.SchematicsException("App.js not found");
            }
            const appendIndex = content.indexOf("const history");
            const content2Append = `const ${strings_1.capitalize(name)}Lazy = lazy(() => import("./components/${strings_1.capitalize(name)}App")); \n`;
            const updatedContent = content.slice(0, appendIndex) +
                content2Append +
                content.slice(appendIndex);
            tree.overwrite(path, prettier.format(updatedContent, { semi: true, parser: "babel" }));
        }
        function updateAppWebPackDev(tree) {
            const path = core_1.normalize("./container/config/webpack.dev.js");
            const buffer = tree.read(path);
            const content = buffer === null || buffer === void 0 ? void 0 : buffer.toString();
            if (!content) {
                throw new schematics_1.SchematicsException("webpack.dev.js not found");
            }
            const appendIndex = content.indexOf("// mfeRemotesEntries");
            const content2Append = `${strings_1.camelize(name)}: "${strings_1.camelize(name)}@http://localhost:${port}/remoteEntry.js", \n`;
            const updatedContent = content.slice(0, appendIndex) +
                content2Append +
                content.slice(appendIndex);
            tree.overwrite(path, prettier.format(updatedContent, { semi: true, parser: "babel" }));
        }
        function updateAppWebPackProd(tree) {
            const path = core_1.normalize("./container/config/webpack.prod.js");
            const buffer = tree.read(path);
            const content = buffer === null || buffer === void 0 ? void 0 : buffer.toString();
            if (!content) {
                throw new schematics_1.SchematicsException("webpack.prod.js not found");
            }
            const appendIndex = content.indexOf("// mfeRemotesEntries");
            const content2Append = `${strings_1.camelize(name)}: \`${strings_1.camelize(name)}@\${${name}_domain}/remoteEntry.js\`, \n`;
            const updatedContent = content.slice(0, appendIndex) +
                content2Append +
                content.slice(appendIndex);
            tree.overwrite(path, prettier.format(updatedContent, { semi: true, parser: "babel" }));
        }
        function generateWrapper() {
            const templateSource = schematics_1.apply(schematics_1.url("./files/wrapper"), [
                schematics_1.template(Object.assign(Object.assign({}, _options), core_1.strings)),
                schematics_1.move(core_1.normalize("./container/src/components")),
            ]);
            return schematics_1.mergeWith(templateSource, schematics_1.MergeStrategy.Overwrite);
        }
        function formatWrapper() {
            return () => {
                const path = `./container/src/components/${strings_1.classify(name)}App.js`;
                const content = tree.read(path);
                if (content) {
                    const formatted = prettier.format(content.toString(), {
                        semi: true,
                        parser: "babel",
                    });
                    tree.overwrite(path, formatted);
                }
            };
        }
        updateAppRoute(tree);
        updateAppWrapper(tree);
        updateAppWebPackDev(tree);
        updateAppWebPackProd(tree);
        const rule = schematics_1.chain([generateWrapper, formatWrapper]);
        return rule(tree, _context);
    };
}
exports.addMFE = addMFE;
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
                    packageManager: "npm",
                    workingDirectory: "container",
                }));
            };
        }
        const rule = schematics_1.chain([generateContainer, updateContainer(_context)]);
        return rule(tree, _context);
    };
}
exports.newContainer = newContainer;
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