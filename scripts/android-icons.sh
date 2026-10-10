#!/bin/sh
# Az Android-alkalmazás ikonjai és indítóképe az icons/favicon.svg-ből (ImageMagick kell hozzá: convert).
# Ha a logó változik, ezt újra kell futtatni: sh scripts/android-icons.sh
set -e
cd "$(dirname "$0")/.."
RES=android/app/src/main/res
BG='#F7F4EB'   # az icons/icon-192.png háttere
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT
# a sötét módú színváltás nélkül (az ikon háttere mindig világos)
sed 's/@media[^}]*}}//' icons/favicon.svg > "$TMP/logo.svg"
# SVG-rajzoló: rsvg-convert (librsvg2-bin), ennek hiányában Chromium (CHROME=/út/a/chrome)
if command -v rsvg-convert >/dev/null 2>&1; then
    rsvg-convert -w 1024 -h 1024 "$TMP/logo.svg" -o "$TMP/logo.png"
else
    printf '<html><body style="margin:0;background:transparent"><img src="logo.svg" style="width:1024px;height:1024px;display:block"></body></html>' > "$TMP/logo.html"
    "${CHROME:-chromium}" --headless --no-sandbox --disable-gpu --hide-scrollbars --default-background-color=00000000 \
        --window-size=1024,1024 --screenshot="$TMP/logo.png" "file://$TMP/logo.html" >/dev/null 2>&1
fi

for d in mdpi:1 hdpi:1.5 xhdpi:2 xxhdpi:3 xxxhdpi:4; do
    name=${d%%:*}; scale=${d#*:}
    icon=$(awk "BEGIN{print int(48*$scale)}")
    logo=$(awk "BEGIN{print int(36*$scale)}")
    fg=$(awk "BEGIN{print int(108*$scale)}")
    fglogo=$(awk "BEGIN{print int(62*$scale)}")
    convert -size ${icon}x${icon} xc:"$BG" \( "$TMP/logo.png" -resize ${logo}x${logo} \) -gravity center -composite "$RES/mipmap-$name/ic_launcher.png"
    convert -size ${icon}x${icon} xc:none -fill "$BG" -draw "circle $((icon/2)),$((icon/2)) $((icon/2)),0" \
        \( "$TMP/logo.png" -resize ${logo}x${logo} \) -gravity center -composite "$RES/mipmap-$name/ic_launcher_round.png"
    convert -size ${fg}x${fg} xc:none \( "$TMP/logo.png" -resize ${fglogo}x${fglogo} \) -gravity center -composite "$RES/mipmap-$name/ic_launcher_foreground.png"
done

for f in "$RES"/drawable*/splash.png; do
    size=$(identify -format '%wx%h' "$f")
    w=${size%x*}; h=${size#*x}
    side=$(( (w < h ? w : h) * 2 / 5 ))
    convert -size "$size" xc:"$BG" \( "$TMP/logo.png" -resize ${side}x${side} \) -gravity center -composite "$f"
done

cat > "$RES/values/ic_launcher_background.xml" <<XML
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="ic_launcher_background">$BG</color>
</resources>
XML
echo "Az ikonok elkészültek ($RES)"
