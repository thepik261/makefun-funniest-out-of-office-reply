// Funniest One-Line Out-of-Office Reply — make.fun entry.
// Writes a single funny one-line out-of-office reply to /output/entry.txt.
// Pure Node stdlib only. Deterministic: the same line on every run.
import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "I'm out of office until Monday \u2014 my auto-reply is covering for me, and frankly it's already outperforming me.";

const OUT = "/output/entry.txt";

function main(): void {
  // One line, UTF-8, 1-160 characters, not only whitespace (the gate).
  const text = LINE.trim();
  if (text.length < 1 || text.length > 160) {
    throw new Error(`entry must be 1-160 characters, got ${text.length}`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  mkdirSync(dirname(OUT), { recursive: true });
  // No trailing newline: the gate counts characters, so the file holds
  // exactly the one line and nothing else.
  writeFileSync(OUT, text, "utf8");
  // The grader collects outputs as another user: leave the file world-readable.
  // Never chmod /output itself — only the file this program creates.
  try {
    chmodSync(OUT, 0o644);
  } catch {
    // Non-fatal: the default umask usually already leaves it readable.
  }
}

main();
