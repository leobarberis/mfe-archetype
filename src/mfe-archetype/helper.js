"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFromFile = exports.updateFile = exports.formatFile = exports.validatePort = void 0;
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const prettier = require("prettier");
const validatePort = (port) => {
    if (!Number(port)) {
        throw new schematics_1.SchematicsException("Invalid port");
    }
};
exports.validatePort = validatePort;
function formatFile(path, tree) {
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
exports.formatFile = formatFile;
function updateFile(path, appendRef, newContent, tree) {
    const normPath = core_1.normalize(path);
    const buffer = tree.read(normPath);
    const content = buffer === null || buffer === void 0 ? void 0 : buffer.toString();
    if (!content) {
        throw new schematics_1.SchematicsException(`${path} not found`);
    }
    const _appendIndex = content.indexOf(appendRef);
    const updatedContent = content.slice(0, _appendIndex) + newContent + content.slice(_appendIndex);
    tree.overwrite(normPath, prettier.format(updatedContent, { semi: true, parser: "babel" }));
}
exports.updateFile = updateFile;
function deleteFromFile(path, oldContent, tree) {
    const normPath = core_1.normalize(path);
    const buffer = tree.read(normPath);
    const content = buffer === null || buffer === void 0 ? void 0 : buffer.toString();
    if (!content) {
        throw new schematics_1.SchematicsException(`${path} not found`);
    }
    const updatedContent = content.replace(oldContent, "");
    tree.overwrite(normPath, prettier.format(updatedContent, { semi: true, parser: "babel" }));
}
exports.deleteFromFile = deleteFromFile;
//# sourceMappingURL=helper.js.map