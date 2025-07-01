import * as vscode from "vscode";
import { getWebviewContent } from "./webview";

let currentPanel: vscode.WebviewPanel | undefined = undefined;

export function activate(context: vscode.ExtensionContext) {
  console.log("Live Tailwind Previewer extension is now active!");

  const startPreviewCommand = vscode.commands.registerCommand("tailwindPreviewer.startPreview", () => {
    if (currentPanel) {
      currentPanel.reveal(vscode.ViewColumn.Two);
    } else {
      createWebviewPanel(context);
    }
  });

  const togglePreviewCommand = vscode.commands.registerCommand("tailwindPreviewer.togglePreview", () => {
    if (currentPanel) {
      currentPanel.dispose();
      currentPanel = undefined;
    } else {
      createWebviewPanel(context);
    }
  });

  context.subscriptions.push(startPreviewCommand, togglePreviewCommand);
}

function createWebviewPanel(context: vscode.ExtensionContext) {
  currentPanel = vscode.window.createWebviewPanel("tailwindPreviewer", "Tailwind CSS Previewer", vscode.ViewColumn.Two, {
    enableScripts: true,
    retainContextWhenHidden: true,
    localResourceRoots: [context.extensionUri],
  });

  currentPanel.webview.html = getWebviewContent();
  currentPanel.webview.onDidReceiveMessage(
    (message) => {
      switch (message.type) {
        case "info":
          vscode.window.showInformationMessage(message.value);
          return;
        case "error":
          vscode.window.showErrorMessage(message.value);
          return;
        case "classes-updated":
          console.log("Classes updated:", message.classes);
          return;
        case "copy-classes":
          vscode.env.clipboard.writeText(message.classes).then(() => {
            vscode.window.showInformationMessage("Classes copied to clipboard!");
          });
          return;
      }
    },
    undefined,
    context.subscriptions
  );

  currentPanel.onDidDispose(
    () => {
      currentPanel = undefined;
    },
    null,
    context.subscriptions
  );

  currentPanel.onDidChangeViewState(
    (e) => {
      if (e.webviewPanel.visible) {
        console.log("Tailwind preview panel is now visible");
      } else {
        console.log("Tailwind preview panel is now hidden");
      }
    },
    null,
    context.subscriptions
  );
}

export function deactivate() {
  if (currentPanel) {
    currentPanel.dispose();
  }
}
