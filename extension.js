// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const fs = require("fs");

function formatCSSFile(inputFilePath) {
  const cssContent = fs.readFileSync(inputFilePath, "utf8");
  // Remove leading and trailing white spaces
  const formattedCSS = cssContent.trim();

  // Format the CSS by removing unnecessary line breaks and extra spaces
  let updatedCSS = formattedCSS
    .replace(/\s*\{\s*/g, " {")
    .replace(/\s*\}\s*/g, "}\n")
    .replace(/\;\s*/g, ";")
    .replace(/\n\s*\n/g, "\n");

  updatedCSS = updatedCSS.replace(/(@keyframes|@media)\s*[^{]*{/g, (match) => {
    return match.replace("{", "{\n");
  });

  // Write the formatted CSS back to the same file
  fs.writeFileSync(inputFilePath, updatedCSS, "utf8");

  return updatedCSS;
}

function activate(context) {
  // Register CSS formatter
  vscode.languages.registerDocumentFormattingEditProvider("css", {
    provideDocumentFormattingEdits(document) {
      const inputFilePath = document.uri.fsPath;

      formatCSSFile(inputFilePath);
    },
  });

  let disposable = vscode.commands.registerCommand(
    "css-on-line.cssOnLine",
    () => {
      // Get the active text editor
      const editor = vscode.window.activeTextEditor;
      if (editor && editor.document.languageId === "css") {
        // Get the document and its content
        const document = editor.document;

        // Get the file path
        const filePath = document.fileName;

        formatCSSFile(filePath);

        vscode.window.showInformationMessage("CSS file formatted");
      } else {
        vscode.window.showInformationMessage("No active CSS editor found");
      }
    }
  );

  console.log('Congratulations, your extension "css-on-line" is now active!');
  context.subscriptions.push(disposable);
}

module.exports = {
  activate,
};
