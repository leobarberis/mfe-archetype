"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newMfe = exports.buildContainer = exports.newContainer = exports.addMFE = exports.deleteMFE = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const core_1 = require("@angular-devkit/core");
const tasks_1 = require("@angular-devkit/schematics/tasks");
const strings_1 = require("@angular-devkit/core/src/utils/strings");
const gitignore_1 = require("./gitignore");
const prettier = require("prettier");
const validatePort = (port) => {
    if (!Number(port)) {
        throw new schematics_1.SchematicsException("Invalid port");
    }
};
function deleteMFE(_options) {
    return (tree, _context) => {
        const { name, port } = _options;
        validatePort(port);
        function deleteFromFile(path, oldContent) {
            const normPath = core_1.normalize(path);
            const buffer = tree.read(normPath);
            const content = buffer === null || buffer === void 0 ? void 0 : buffer.toString();
            if (!content) {
                throw new schematics_1.SchematicsException(`${path} not found`);
            }
            const updatedContent = content.replace(oldContent, "");
            tree.overwrite(normPath, prettier.format(updatedContent, { semi: true, parser: "babel" }));
        }
        deleteFromFile("./container/src/App.js", `<Route path="/${name}" component={${strings_1.capitalize(name)}Lazy} />`);
        deleteFromFile("./container/src/App.js", `const ${strings_1.capitalize(name)}Lazy = lazy(() => import("./components/${strings_1.capitalize(name)}App"));`);
        deleteFromFile("./container/config/webpack.dev.js", `${strings_1.camelize(name)}: "${strings_1.camelize(name)}@http://localhost:${port}/remoteEntry.js",`);
        deleteFromFile("./container/config/webpack.prod.js", `${strings_1.camelize(name)}: \`${strings_1.camelize(name)}@\${${name}_domain}/remoteEntry.js\`,`);
        const oldFilePath = core_1.normalize(`./container/src/components/${strings_1.classify(name)}App.js`);
        const oldFileBuffer = tree.read(oldFilePath);
        if (!oldFileBuffer) {
            throw new schematics_1.SchematicsException(`${oldFilePath} not found`);
        }
        tree.delete(oldFilePath);
    };
}
exports.deleteMFE = deleteMFE;
function addMFE(_options) {
    return (tree, _context) => {
        const { name, port, route } = _options;
        validatePort(port);
        function formatFile(path) {
            return () => {
                const normPath = core_1.normalize(path);
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
        function updateFile(path, appendRef, newContent) {
            const normPath = core_1.normalize(path);
            const buffer = tree.read(normPath);
            const content = buffer === null || buffer === void 0 ? void 0 : buffer.toString();
            if (!content) {
                throw new schematics_1.SchematicsException(`${path} not found`);
            }
            const _appendIndex = content.indexOf(appendRef);
            const updatedContent = content.slice(0, _appendIndex) +
                newContent +
                content.slice(_appendIndex);
            tree.overwrite(normPath, prettier.format(updatedContent, { semi: true, parser: "babel" }));
        }
        updateFile("./container/src/App.js", "</Switch>", `<Route path="/${route}" component={${strings_1.classify(name)}Lazy} /> \n`);
        updateFile("./container/src/App.js", "const history", `const ${strings_1.classify(name)}Lazy = lazy(() => import("./components/${strings_1.classify(name)}App")); \n`);
        updateFile("./container/config/webpack.dev.js", "// mfeRemotesEntries", `${strings_1.camelize(name)}: "${strings_1.camelize(name)}@http://localhost:${port}/remoteEntry.js", \n`);
        updateFile("./container/config/webpack.prod.js", "// mfeRemotesEntries", `${strings_1.camelize(name)}: \`${strings_1.camelize(name)}@\${${strings_1.camelize(name)}_domain}/remoteEntry.js\`, \n`);
        function generateWrapper() {
            const templateSource = schematics_1.apply(schematics_1.url("./files/wrapper"), [
                schematics_1.template(Object.assign(Object.assign({}, _options), core_1.strings)),
                schematics_1.move(core_1.normalize("./container/src/components")),
            ]);
            return schematics_1.mergeWith(templateSource, schematics_1.MergeStrategy.Overwrite);
        }
        const rule = schematics_1.chain([
            generateWrapper,
            formatFile(`./container/src/components/${strings_1.classify(name)}App.js`),
        ]);
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
                    workingDirectory: "container",
                }));
            };
        }
        const rule = schematics_1.chain([generateContainer, updateContainer(_context)]);
        return rule(tree, _context);
    };
}
exports.newContainer = newContainer;
function buildContainer(_options) {
    return (tree, _context) => {
        const { port, env } = _options;
        validatePort(port);
        if (env == "dev") {
            const container = newContainer(_options);
            const addMfe = addMFE(_options);
            const rule = schematics_1.chain([container, addMfe]);
            return rule(tree, _context);
        }
    };
}
exports.buildContainer = buildContainer;
function newMfe(_options) {
    return (tree, _context) => {
        const { fw, routing, name, port } = _options;
        validatePort(port);
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
//# sourceMappingURL=index.js.map