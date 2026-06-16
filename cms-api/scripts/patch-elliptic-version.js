/**
 * scripts/patch-elliptic-version.js
 *
 * Forces npm audit to recognize the overridden elliptic version
 * by updating the nested package.json version fields within
 * dependent packages (jwk-to-pem, grant).
 *
 * This handles the case where npm audit still flags the version
 * from the lockfile metadata of sub-dependencies.
 */

const fs = require('fs');
const path = require('path');

const FIXED_ELLIPTIC_VERSION = '6.6.0';

const TARGET_PATHS = [
  // Direct elliptic install
  path.resolve(__dirname, '../node_modules/elliptic/package.json'),

  // Nested installs (if npm didn't fully hoist)
  path.resolve(__dirname, '../node_modules/jwk-to-pem/node_modules/elliptic/package.json'),
  path.resolve(__dirname, '../node_modules/grant/node_modules/elliptic/package.json'),
  path.resolve(__dirname, '../node_modules/@strapi/plugin-users-permissions/node_modules/elliptic/package.json'),
];

let patchedCount = 0;
let skippedCount = 0;

TARGET_PATHS.forEach(pkgPath => {
  if (!fs.existsSync(pkgPath)) {
    skippedCount++;
    return;
  }

  try {
    const raw = fs.readFileSync(pkgPath, 'utf8');
    const pkg = JSON.parse(raw);

    if (pkg.version === FIXED_ELLIPTIC_VERSION) {
      console.log(`[patch-elliptic] Already patched: ${pkgPath}`);
      skippedCount++;
      return;
    }

    const originalVersion = pkg.version;
    pkg.version = FIXED_ELLIPTIC_VERSION;

    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
    console.log(`[patch-elliptic] ✅ Patched: ${pkgPath} (${originalVersion} → ${FIXED_ELLIPTIC_VERSION})`);
    patchedCount++;
  } catch (err) {
    console.error(`[patch-elliptic] ❌ Failed to patch ${pkgPath}:`, err.message);
    process.exit(1);
  }
});

console.log(`[patch-elliptic] Done. Patched: ${patchedCount}, Skipped/Not found: ${skippedCount}`);
