// Portable download support. The launcher uses the same published release manifest.
const hashPattern = /^[a-f0-9]{64}$/;
export function validateRelease(release) {
  if (!release || release.schema !== 1 || !/^\d+\.\d+\.\d+(?:-[a-zA-Z0-9.-]+)?$/.test(release.version)
      || !hashPattern.test(release.archiveSha256) || release.executable !== 'The Hollow Below.exe'
      || !Number.isSafeInteger(release.archiveSize) || release.archiveSize <= 0 || release.archiveSize > 512 * 1024 * 1024
      || !Array.isArray(release.chunks) || !release.chunks.length || release.chunks.length > 128) {
    throw new Error('The release information is incomplete. Please try again later.');
  }
  let size = 0;
  const paths = new Set();
  for (const chunk of release.chunks) {
    if (!chunk || typeof chunk.path !== 'string' || !/^releases\/[a-zA-Z0-9._/-]+$/.test(chunk.path)
        || chunk.path.split('/').some(part => !part || part === '.' || part === '..')
        || paths.has(chunk.path) || !hashPattern.test(chunk.sha256)
        || !Number.isSafeInteger(chunk.size) || chunk.size <= 0 || chunk.size > 16 * 1024 * 1024) {
      throw new Error('The release contains invalid download information.');
    }
    paths.add(chunk.path);
    size += chunk.size;
  }
  if (size !== release.archiveSize) throw new Error('The release size does not match its download files.');
  return release;
}
export async function readRelease(signal) {
  const response = await fetch(new URL('releases/latest.json', import.meta.url), { signal, cache: 'no-cache', redirect: 'error' });
  if (!response.ok) throw new Error('The alpha download is unavailable. Please try again shortly.');
  const text = await response.text();
  if (text.length > 1024 * 1024) throw new Error('The release information is invalid.');
  return validateRelease(JSON.parse(text));
}
export async function sha256(bytes) {
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
}
export async function downloadPortable({ signal, onProgress = () => {} } = {}) {
  if (!globalThis.crypto?.subtle) throw new Error('Use the secure website address to download the alpha.');
  const release = await readRelease(signal);
  const pieces = [];
  let complete = 0;
  onProgress({ percent: 0, message: 'Preparing Windows alpha…' });
  for (const chunk of release.chunks) {
    const response = await fetch('/' + chunk.path, { signal, redirect: 'error' });
    if (!response.ok || !response.body) throw new Error('A download was interrupted. Please try again.');
    const reader = response.body.getReader();
    const blocks = [];
    let length = 0;
    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        length += value.byteLength;
        if (length > chunk.size) throw new Error('A download did not match the release. Please try again.');
        blocks.push(value);
        onProgress({ percent: Math.floor((complete + length) / release.archiveSize * 95),
          message: `Downloading ${((complete + length) / 1000000).toFixed(1)} / ${(release.archiveSize / 1000000).toFixed(1)} MB` });
      }
    } finally { await reader.cancel().catch(() => {}); reader.releaseLock(); }
    const bytes = new Uint8Array(length);
    let offset = 0;
    for (const block of blocks) { bytes.set(block, offset); offset += block.byteLength; }
    if (length !== chunk.size || await sha256(bytes) !== chunk.sha256) throw new Error('A download failed its file check. Please try again.');
    pieces.push(bytes);
    complete += length;
  }
  signal?.throwIfAborted();
  onProgress({ percent: 97, message: 'Checking the complete ZIP…' });
  const blob = new Blob(pieces, { type: 'application/zip' });
  if (await sha256(await blob.arrayBuffer()) !== release.archiveSha256) throw new Error('The complete ZIP failed its file check. Please try again.');
  signal?.throwIfAborted();
  const link = document.createElement('a');
  const objectUrl = URL.createObjectURL(blob);
  link.href = objectUrl;
  link.download = `The-Hollow-Below-Alpha-${release.version}-Windows.zip`;
  document.body.append(link);
  link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(objectUrl), 60000);
  onProgress({ percent: 100, message: 'ZIP ready. Extract it, then open The Hollow Below.exe.' });
}
