// Az Android-alkalmazás kapcsolata a készülékkel (Capacitor). Csak az alkalmazásba kerül (www/native.js, a
// scripts/build-www.mjs fordítja), a webes változatba nem. Az app.js a window.OrgonatarNative-on keresztül éri el.
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

window.OrgonatarNative = { Capacitor, Filesystem, Directory, Encoding, Share };
