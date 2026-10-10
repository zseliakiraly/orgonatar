// Az Android-alkalmazás kapcsolata a készülékkel (Capacitor). Csak az alkalmazásba kerül (www/native.js, a
// scripts/build-www.mjs fordítja), a webes változatba nem. Az app.js a window.OrgonatarNative-on keresztül éri el.
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

// A telefon vissza gombja a programon belül lép vissza (mint a böngésző vissza gombja: a program minden
// nézetváltása egy előzmény-bejegyzés), és csak a kezdőlapon lép ki az alkalmazásból
if (Capacitor.isNativePlatform()) {
    App.addListener('backButton', ({ canGoBack }) => {
        if (canGoBack) window.history.back();
        else App.exitApp();
    });
}

window.OrgonatarNative = { Capacitor, Filesystem, Directory, Encoding, Share };
