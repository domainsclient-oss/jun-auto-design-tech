// Starts `next dev --webpack` from a path with an upper-case drive letter.
// On Windows, a terminal opened at "d:\..." makes Webpack's module paths disagree in case
// with the React Client Manifest ("Could not find the module ... in the React Client Manifest").
import { spawn } from "node:child_process";
import { createRequire } from "node:module";

const upperDrive = (path) => path.replace(/^[a-z]:/, (drive) => drive.toUpperCase());
const cwd = upperDrive(process.cwd());
// Next resolves its own loaders from where it was loaded, so its path needs the same fix.
const nextBin = upperDrive(createRequire(import.meta.url).resolve("next/dist/bin/next"));

const child = spawn(process.execPath, [nextBin, "dev", "--webpack", ...process.argv.slice(2)], {
  cwd,
  stdio: "inherit",
});
child.on("exit", (code) => process.exit(code ?? 0));
