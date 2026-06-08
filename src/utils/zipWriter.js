// src/utils/zipWriter.js
// Pure-JavaScript ZIP file builder. No external library needed.
// Supports storing files with DEFLATE or STORE compression.
// We use STORE (no compression) — audio files are already compressed,
// and CSV/JSON are small. This keeps the code simple and reliable.
//
// ZIP spec reference: https://pkware.cachefly.net/webdocs/casestudies/APPNOTE.TXT
// All multi-byte integers are little-endian.

// ── Utility ──────────────────────────────────────────────────────────────────

function u16(n) {
  return [n & 0xff, (n >> 8) & 0xff];
}
function u32(n) {
  return [n & 0xff, (n >> 8) & 0xff, (n >> 16) & 0xff, (n >> 24) & 0xff];
}

// DOS date/time encoding for current time
function dosDateTime() {
  const d = new Date();
  const date = ((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate();
  const time = (d.getHours() << 11) | (d.getMinutes() << 5) | Math.floor(d.getSeconds() / 2);
  return { date, time };
}

// CRC-32 table
const crcTable = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

// Encode a JS string to a Uint8Array of UTF-8 bytes
function utf8(str) {
  const bytes = [];
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    if (code < 0x80) {
      bytes.push(code);
    } else if (code < 0x800) {
      bytes.push(0xc0 | (code >> 6), 0x80 | (code & 0x3f));
    } else {
      bytes.push(0xe0 | (code >> 12), 0x80 | ((code >> 6) & 0x3f), 0x80 | (code & 0x3f));
    }
  }
  return new Uint8Array(bytes);
}

// Concat multiple Uint8Array / plain arrays into one Uint8Array
function concat(...parts) {
  let total = 0;
  const arrays = parts.map(p => p instanceof Uint8Array ? p : new Uint8Array(p));
  arrays.forEach(a => { total += a.length; });
  const out = new Uint8Array(total);
  let offset = 0;
  arrays.forEach(a => { out.set(a, offset); offset += a.length; });
  return out;
}

// base64 → Uint8Array (for binary files read from FileSystem)
function base64ToBytes(b64) {
  const binary = atob(b64);
  const bytes  = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

// Uint8Array → base64 string (for writing the finished zip)
function bytesToBase64(bytes) {
  let binary = '';
  const chunkSize = 8192;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

// ── Core builder ──────────────────────────────────────────────────────────────

// entry = { name: string, data: Uint8Array }
function buildZip(entries) {
  const localHeaders  = [];
  const centralDirs   = [];
  let   offset        = 0;
  const { date, time } = dosDateTime();

  for (const entry of entries) {
    const nameBytes = utf8(entry.name);
    const data      = entry.data;
    const crc       = crc32(data);
    const size      = data.length;

    // Local file header (signature 0x04034b50)
    const localHeader = new Uint8Array([
      0x50, 0x4b, 0x03, 0x04,   // signature
      ...u16(20),                // version needed: 2.0
      ...u16(0x0800),            // flags: UTF-8 names
      ...u16(0),                 // compression: STORE
      ...u16(time),
      ...u16(date),
      ...u32(crc),
      ...u32(size),              // compressed size (= uncompressed for STORE)
      ...u32(size),
      ...u16(nameBytes.length),
      ...u16(0),                 // extra field length
    ]);

    const localRecord = concat(localHeader, nameBytes, data);
    localHeaders.push(localRecord);

    // Central directory entry (signature 0x02014b50)
    const centralDir = new Uint8Array([
      0x50, 0x4b, 0x01, 0x02,   // signature
      ...u16(20),                // version made by
      ...u16(20),                // version needed
      ...u16(0x0800),            // flags
      ...u16(0),                 // STORE
      ...u16(time),
      ...u16(date),
      ...u32(crc),
      ...u32(size),
      ...u32(size),
      ...u16(nameBytes.length),
      ...u16(0),                 // extra
      ...u16(0),                 // comment
      ...u16(0),                 // disk start
      ...u16(0),                 // internal attrs
      ...u32(0),                 // external attrs
      ...u32(offset),            // local header offset
    ]);

    centralDirs.push(concat(centralDir, nameBytes));
    offset += localRecord.length;
  }

  const centralDirData   = concat(...centralDirs);
  const centralDirOffset = offset;
  const centralDirSize   = centralDirData.length;

  // End of central directory record (signature 0x06054b50)
  const eocd = new Uint8Array([
    0x50, 0x4b, 0x05, 0x06,
    ...u16(0),                         // disk number
    ...u16(0),                         // disk with central dir
    ...u16(entries.length),
    ...u16(entries.length),
    ...u32(centralDirSize),
    ...u32(centralDirOffset),
    ...u16(0),                         // comment length
  ]);

  return concat(...localHeaders, centralDirData, eocd);
}

// ── Public API ────────────────────────────────────────────────────────────────

export { buildZip, base64ToBytes, bytesToBase64, utf8 };
