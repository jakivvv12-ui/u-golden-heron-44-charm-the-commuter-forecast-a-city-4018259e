// Entry for "Charm the Commuter: Forecast a City That Isn't" (make.fun).
// Writes a single-line weather forecast for a fictional city to
// $MAKEFUN_OUTPUT_DIR/entry.txt (fallback /output). Node, zero deps.
const fs = require('fs');
const path = require('path');

const LINE = 'Zembla City: 19°C, light drizzle, and a 90% chance your train is late — pack an umbrella and low expectations.';

function main() {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
  const outFile = path.join(outDir, 'entry.txt');
  const cps = [...LINE];
  if (cps.length < 1 || cps.length > 140) throw new Error('line must be 1-140 code points, got ' + cps.length);
  if (!LINE.trim()) throw new Error('line must not be whitespace-only');
  if (LINE.includes('\n') || LINE.includes('\r')) throw new Error('line must not contain a newline');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outFile, LINE, 'utf8');
  // Round-trip validation: read back and verify byte-identical, no trailing newline.
  const back = fs.readFileSync(outFile, 'utf8');
  if (back !== LINE) throw new Error('round-trip mismatch');
  console.log('wrote ' + outFile + ' (' + cps.length + ' chars, ' + Buffer.byteLength(LINE, 'utf8') + ' bytes)');
}

main();
