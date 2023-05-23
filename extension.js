// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

const gulp = require("gulp");
const { compressCss } = require("gulp-css-format-oneline");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */

function formatCSSFile(inputFilePath, outputFilePath) {
  return gulp
    .src(inputFilePath)
    .pipe(compressCss({ clearLine: false }))
    .pipe(gulp.dest(outputFilePath));
}

function formatActiveCSS() {
  const editor = vscode.window.activeTextEditor;

  if (editor && editor.document.languageId === "css") {
    const inputFilePath = editor.document.uri.fsPath;
    const outputFilePath = inputFilePath; // overwrite the original file

    formatCSSFile(inputFilePath, outputFilePath)
      .on("end", () => {
        vscode.window.showInformationMessage("CSS file formatted");
      })
      .on("error", (err) => {
        vscode.window.showErrorMessage(
          `Error formatting CSS file: ${err.message}`
        );
      });
  } else {
    vscode.window.showInformationMessage("No active CSS editor found");
  }
}

function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "css-on-line" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "css-on-line.cssOnLine",
    function () {
      // The code you place here will be executed every time your command is executed
      formatActiveCSS();

      // Display a message box to the user
      vscode.window.showInformationMessage("Hello World from CSS On Line!");
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
