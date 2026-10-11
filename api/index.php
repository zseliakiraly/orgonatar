<?php
// OrgonaTár – a kottakönyvek API-ja (az Android-alkalmazás innen tölti le az adatokat és a kottákat).
// Egyszerű tárhelyen (shared hosting) is fut: csak PHP kell hozzá (7.4 vagy újabb), adatbázis és Composer nem.
// A data/ mappa fájljait adja ki, ugyanazokkal a címekkel, ahogy a webes program is eléri őket:
//   GET api/?path=data/kottakonyvek.json      a könyvek listája
//   GET api/?path=data/enek.json              az énekek
//   GET api/?path=data/genfi/index.json       egy könyv adatai
//   GET api/?path=data/genfi/001.mxl          egy kottafájl
//   GET api/                                  az API adatai (működik-e)
// Feltételes kérésekkel (If-None-Match, If-Modified-Since) a változatlan fájl nem jön le újra (304).
// Más webhelyről (az alkalmazás a https://localhost címről kérdez) is hívható (CORS).

const API_VERSION = 1;
// A data/ mappa helye: alapesetben az api/ mappa mellett (a webes program gyökerében)
define('DATA_DIR', dirname(__DIR__) . DIRECTORY_SEPARATOR . 'data');

const CONTENT_TYPES = [
    'json' => 'application/json; charset=utf-8',
    'mxl' => 'application/vnd.recordare.musicxml',
    'musicxml' => 'application/vnd.recordare.musicxml+xml',
    'xml' => 'application/xml',
    'mei' => 'application/mei+xml',
    'png' => 'image/png',
    'jpg' => 'image/jpeg',
    'jpeg' => 'image/jpeg',
    'gif' => 'image/gif',
    'webp' => 'image/webp',
    'svg' => 'image/svg+xml',
];

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, HEAD, OPTIONS');
header('Access-Control-Allow-Headers: If-None-Match, If-Modified-Since, X-Letoltes');
header('Access-Control-Expose-Headers: ETag, Last-Modified');
header('Access-Control-Max-Age: 86400');
header('X-Content-Type-Options: nosniff');

function fail($status, $message) {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode(['error' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

$method = isset($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : 'GET';
if ($method === 'OPTIONS') {
    http_response_code(204);
    exit;
}
if ($method !== 'GET' && $method !== 'HEAD') {
    header('Allow: GET, HEAD, OPTIONS');
    fail(405, 'csak olvasni lehet');
}

$path = isset($_GET['path']) ? (string) $_GET['path'] : '';
if ($path === '') {
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode(['name' => 'orgonatar', 'version' => API_VERSION, 'php' => PHP_VERSION]);
    exit;
}

// Csak a data/ mappán belüli, nem rejtett fájl kérhető (pl. a .htaccess nem; a ".." sem vihet ki a mappából)
$segments = explode('/', $path);
if (count($segments) < 2 || $segments[0] !== 'data') fail(404, 'nincs ilyen fájl');
foreach (array_slice($segments, 1) as $segment) {
    if ($segment === '' || $segment[0] === '.' || preg_match('/[\\\\\x00-\x1f]/', $segment)) fail(404, 'nincs ilyen fájl');
}
$extension = strtolower(pathinfo($path, PATHINFO_EXTENSION));
if (!isset(CONTENT_TYPES[$extension])) fail(404, 'nincs ilyen fájl');

$root = realpath(DATA_DIR);
$file = realpath(DATA_DIR . DIRECTORY_SEPARATOR . implode(DIRECTORY_SEPARATOR, array_slice($segments, 1)));
if ($root === false || $file === false || strpos($file, $root . DIRECTORY_SEPARATOR) !== 0 || !is_file($file) || !is_readable($file)) {
    fail(404, 'nincs ilyen fájl');
}

$size = filesize($file);
$modified = filemtime($file);
$etag = sprintf('"%x-%x"', $modified, $size);
$lastModified = gmdate('D, d M Y H:i:s', $modified) . ' GMT';

header('Content-Type: ' . CONTENT_TYPES[$extension]);
header('ETag: ' . $etag);
header('Last-Modified: ' . $lastModified);
// A kliens minden alkalommal rákérdez, de a változatlan fájl nem jön le újra
header('Cache-Control: no-cache');

$ifNoneMatch = isset($_SERVER['HTTP_IF_NONE_MATCH']) ? $_SERVER['HTTP_IF_NONE_MATCH'] : null;
$ifModifiedSince = isset($_SERVER['HTTP_IF_MODIFIED_SINCE']) ? $_SERVER['HTTP_IF_MODIFIED_SINCE'] : null;
$notModified = $ifNoneMatch !== null
    ? in_array($etag, array_map('trim', explode(',', $ifNoneMatch)), true) || trim($ifNoneMatch) === '*'
    : ($ifModifiedSince !== null && strtotime($ifModifiedSince) !== false && strtotime($ifModifiedSince) >= $modified);
if ($notModified) {
    http_response_code(304);
    exit;
}

header('Content-Length: ' . $size);
if ($method === 'HEAD') exit;
readfile($file);
