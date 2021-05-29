"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gitignore = void 0;
exports.gitignore = `
# See http://help.github.com/ignore-files/ for more about ignoring files.

# compiled output
/dist
/tmp
/out-tsc

# dependencies
node_modules

# IDEs and editors
/.idea
.project
.classpath
.c9/
*.launch
.settings/
*.sublime-workspace

# IDE - VSCode
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json

# misc
/.sass-cache
/connect.lock
/coverage
/libpeerconnection.log
npm-debug.log
testem.log
/typings

# e2e
/e2e/*.js
/e2e/*.map

# System Files
.DS_Store
Thumbs.db

# yarn
yarn-error.log

# dist artifacts
@angular-react/

# ng-packagr (temporary files)
.ng_pkg_build/

.nyc-output/

#dev-container
/container
`;
//# sourceMappingURL=gitignore.js.map