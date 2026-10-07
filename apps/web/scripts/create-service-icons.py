"""Draw the HTSV service icon set. No remote assets or raster dependencies."""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/assets/service-icons'
OUT.mkdir(parents=True, exist_ok=True)


def rect(x, y, w, h, fill, radius=4):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{radius}" fill="{fill}"/>'


def path(d, fill, stroke=None, width=3):
    return f'<path d="{d}" fill="{fill}"' + (f' stroke="{stroke}" stroke-width="{width}" stroke-linecap="round" stroke-linejoin="round"' if stroke else '') + '/>'


def circle(x, y, r, fill):
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{fill}"/>'


def lines(x=26, y=32, length=25, count=3):
    return ''.join(rect(x, y + i * 7, length - (6 if i == count - 1 else 0), 3, '#c4cdd4', 1.5) for i in range(count))


def page():
    return rect(22, 17, 37, 48, '#bcc8cd', 5) + rect(19, 13, 37, 48, 'url(#paper)', 5) + rect(25, 21, 16, 4, 'url(#gold)', 2)


def medal(x=55, y=54):
    return path(f'M{x-7} {y+5}l-3 17 10-5 9 5-3-17', '#b73934') + circle(x, y, 11, '#bd7b13') + circle(x-1, y-1, 10, 'url(#gold)') + path(f'M{x-1} {y-6}l2 4 5 1-4 3 1 5-4-2-4 2 1-5-4-3 5-1Z', '#fff9df')


def person(x, y, color):
    return circle(x, y, 7, '#e2b68b') + path(f'M{x-12} {y+25}v-5a12 12 0 0 1 24 0v5Z', color) + path(f'M{x-5} {y+12}l5 4 5-4', 'none', '#ffffffb3', 2)


def book():
    return path('M14 25l26-7 26 7v34l-26 8-26-8Z', '#98713c') + path('M14 20l26-7 26 7v35l-26 8-26-8Z', 'url(#gold)') + path('M18 24l22-6 22 6v28l-22 6-22-6Z', 'url(#paper)') + path('M40 18v40M23 31l11-3m-11 10 11-3m12-7 11 3m-11 4 11 3', 'none', '#b4bec5', 2)


def briefcase():
    return path('M30 25v-6h20v6', 'none', '#9d6413', 5) + rect(15, 29, 53, 34, '#b47924', 6) + rect(12, 25, 53, 34, 'url(#gold)', 6) + path('M12 37q26 12 53 0', 'none', '#a86b1b', 2) + rect(35, 36, 8, 10, '#fff7dd', 2)


icons = {}
icons['forum'] = rect(12, 17, 44, 31, '#9d6413', 9) + rect(10, 13, 44, 31, 'url(#gold)', 9) + path('M20 43v9l12-9', 'url(#gold)') + rect(34, 36, 34, 23, '#a53432', 8) + rect(31, 32, 34, 23, 'url(#red)', 8) + path('M53 54v8l-11-8', 'url(#red)') + ''.join(circle(x, 27, 2.5, '#7b511b') for x in [22, 32, 42]) + lines(40, 40, 17, 2)
icons['report'] = path('M42 15l25 8v19q-1 20-25 29Q18 62 18 42V23Z', '#992e2b') + path('M39 11l25 8v19q-1 20-25 29Q15 58 15 38V19Z', 'url(#red)') + path('M39 19l17 6v13q0 13-17 21-17-8-17-21V25Z', '#fff8ee') + rect(37, 28, 4, 15, '#b43e35', 2) + circle(39, 49, 2.5, '#b43e35')
icons['faq'] = book() + circle(59, 24, 13, '#b4781c') + circle(57, 21, 13, 'url(#gold)') + path('M53 17a5 5 0 1 1 7 5q-3 1-3 4', 'none', '#79511d', 3) + circle(57, 31, 1.5, '#79511d')
icons['support'] = path('M16 44v-9a24 24 0 0 1 48 0v15', 'none', '#9c6728', 8) + path('M15 40v-9a24 24 0 0 1 48 0v15', 'none', 'url(#gold)', 7) + rect(10, 33, 13, 24, '#b27a2c', 5) + rect(8, 30, 13, 24, 'url(#gold)', 5) + rect(59, 33, 13, 24, '#b27a2c', 5) + rect(57, 30, 13, 24, 'url(#gold)', 5) + path('M63 52v7q0 6-15 6', 'none', '#36524c', 3) + rect(39, 60, 13, 7, 'url(#green)', 3)
icons['confirmation'] = page() + lines() + medal()
icons['feedback'] = rect(12, 18, 51, 39, '#bdc9ce', 9) + rect(9, 14, 51, 39, 'url(#paper)', 9) + path('M23 52v12l14-12', '#edf2f2') + lines(18, 25, 30, 3) + '<g transform="rotate(35 57 45)">' + rect(53, 23, 8, 37, 'url(#gold)', 2) + rect(53, 20, 8, 7, 'url(#red)', 2) + path('M53 60l4 9 4-9', '#b28b55') + path('M55 65l2 4 2-4', '#394a4b') + '</g>'
icons['conduct-score'] = rect(12, 21, 53, 37, '#a07c36', 5) + rect(9, 17, 53, 37, 'url(#gold)', 5) + rect(14, 22, 43, 27, 'url(#paper)', 2) + rect(23, 38, 5, 7, '#c7a363', 1) + rect(32, 32, 5, 13, '#dbab39', 1) + rect(41, 27, 5, 18, 'url(#green)', 1) + path('M5 58h63l-5 6H10Z', '#b9c5ca') + medal(60, 24)
icons['grade-appeal'] = page() + lines() + circle(53, 47, 13, '#4c7167') + circle(51, 44, 12, 'url(#green)') + circle(51, 44, 8, '#f7fbf6') + path('M59 53l9 10', 'none', '#3e6359', 6) + path('M46 44h10m-5-5v10', 'none', '#52786a', 2)
icons['class-sections'] = path('M22 33l18-10 18 10M22 33v16m36-16v16', 'none', '#a4b4b9', 3) + person(40, 18, 'url(#gold)') + person(20, 46, 'url(#green)') + person(60, 46, 'url(#red)')
icons['transcript'] = page() + rect(26, 37, 5, 13, '#cda657', 1) + rect(35, 31, 5, 19, 'url(#gold)', 1) + rect(44, 26, 5, 24, 'url(#green)', 1) + path('M54 55l7-7 7 7-7 7Z', 'url(#red)')
icons['tuition'] = rect(14, 24, 51, 35, '#99672c', 6) + rect(11, 20, 51, 35, 'url(#gold)', 6) + rect(44, 32, 23, 16, '#946428', 4) + rect(42, 29, 23, 16, 'url(#red)', 4) + circle(49, 37, 2.5, '#ffe4cc') + circle(26, 56, 12, '#b08026') + circle(24, 53, 12, 'url(#gold)') + circle(24, 53, 8, '#f5d274') + path('M21 49h6m-6 4h6m-6 4h6', 'none', '#956721', 2)
icons['scholarship'] = (
    # A graduation cap above a tied diploma, with enough space between objects.
    path('M23 26v12q16 10 32 0V26Z', '#355f53')
    + path('M11 24l28-12 28 12-28 12Z', '#315346')
    + path('M11 21l28-12 28 12-28 12Z', 'url(#green)')
    + path('M39 21l22 1v17', 'none', '#daa63a', 2.5)
    + rect(58, 37, 6, 9, 'url(#gold)', 2)
    + rect(16, 51, 49, 16, '#b3c3c1', 7)
    + rect(13, 48, 49, 16, 'url(#paper)', 7)
    + '<ellipse cx="61" cy="56" rx="4" ry="8" fill="#cedbd7"/>'
    + '<ellipse cx="61" cy="56" rx="2" ry="5" fill="#f7faf5"/>'
    + path('M32 56l-2 15 7-4 6 4-2-15Z', '#b53c34')
    + rect(32, 48, 9, 16, 'url(#red)', 2)
    + circle(36.5, 55, 4, 'url(#gold)')
)
icons['jobs'] = briefcase()
icons['cv-builder'] = page() + circle(31, 33, 5, '#e5bb8b') + path('M23 47v-3a8 8 0 0 1 16 0v3Z', 'url(#green)') + lines(42, 32, 8, 3) + '<g transform="rotate(35 58 49)">' + rect(54, 29, 8, 32, 'url(#gold)', 2) + path('M54 61l4 9 4-9', '#a37b42') + '</g>'
icons['career-guidance'] = circle(41, 40, 26, '#b67b22') + circle(38, 36, 26, 'url(#gold)') + circle(38, 36, 20, 'url(#paper)') + path('M38 15v4m0 34v4M17 36h4m34 0h4', 'none', '#a7b8ba', 2) + path('M38 20l-8 24 8-6 8-9Z', 'url(#red)') + path('M38 52l8-23-8 9-8 6Z', 'url(#green)') + circle(38, 36, 3, '#ffe6a1')
icons['development-path'] = path('M18 62h39q14 0 14-11T57 40H28q-12 0-12-10t12-10h25', 'none', '#bac8bf', 8) + path('M18 58h36q14 0 14-11T54 36H25q-12 0-12-10t12-10h25', 'none', 'url(#gold)', 7) + circle(18, 58, 6, 'url(#green)') + circle(47, 36, 5, '#fff7dd') + path('M51 9v21m0-21h16l-4 6 4 6H51Z', 'url(#red)')
icons['personal-path'] = path('M12 24l18-7 20 7 18-7v41l-18 7-20-7-18 7Z', '#afbeb5') + path('M9 20l18-7 20 7 18-7v41l-18 7-20-7-18 7Z', 'url(#paper)') + path('M27 13v41m20-34v41', 'none', '#cbd7cd', 2) + path('M18 45l16-14 13 12 11-10', 'none', '#cc9a34', 3) + circle(18, 45, 4, 'url(#gold)') + path('M54 17a10 10 0 0 1 20 0q0 8-10 20-10-12-10-20Z', 'url(#green)') + circle(64, 17, 4, '#f0faf2')
icons['interview-practice'] = rect(20, 12, 24, 35, '#9a661d', 12) + rect(17, 9, 24, 35, 'url(#gold)', 12) + path('M12 34v4a17 17 0 0 0 34 0v-4M29 55v9m-10 0h20', 'none', '#46665b', 4) + path('M24 19h10m-10 7h10m-10 7h10', 'none', '#b48937', 2) + rect(48, 24, 25, 21, 'url(#red)', 7) + path('M52 44v7l9-7', 'url(#red)') + ''.join(circle(x, 34, 1.5, '#fff5e3') for x in [55, 61, 67])
icons['staff-portal'] = rect(14, 19, 51, 43, '#b6c3c4', 6) + rect(11, 15, 51, 43, 'url(#paper)', 6) + rect(22, 10, 29, 10, 'url(#gold)', 3) + person(29, 31, 'url(#green)') + lines(46, 31, 9, 3)
icons['facility-report'] = (
    '<g transform="rotate(-38 30 36)">'
    + '<g transform="translate(2 3)">'
    + path('M22 8C15 13 15 25 23 30V60a7 7 0 0 0 14 0V30C45 25 45 13 38 8V21L30 26 22 21Z', '#6c8388')
    + '</g>'
    + path('M22 8C15 13 15 25 23 30V60a7 7 0 0 0 14 0V30C45 25 45 13 38 8V21L30 26 22 21Z', 'url(#steel)')
    + path('M26 34v19', 'none', '#e5eeeb', 2)
    + circle(30, 60, 3, '#526b70')
    + '</g>'
    + path('M58 43l15 25H43Z', '#a6342e')
    + path('M56 40l15 25H41Z', 'url(#red)')
    + rect(54.5, 48, 3, 8, '#fff5e8', 1.5)
    + circle(56, 60, 1.8, '#fff5e8')
)
icons['lost-found'] = (
    path('M23 33h8v11h8v7h-5v5h5v9H23Z', '#b7842b')
    + path('M20 30h8v11h8v7h-5v5h5v9H20Z', 'url(#gold)')
    + '<circle cx="26" cy="25" r="10" fill="none" stroke="#b7842b" stroke-width="8"/>'
    + '<circle cx="24" cy="22" r="10" fill="none" stroke="url(#gold)" stroke-width="8"/>'
    + path('M23 38v18', 'none', '#ffe4a3', 2)
    + path('M64 46l8 11', 'none', '#355a4e', 6)
    + circle(56, 36, 12, '#eff7f1')
    + '<circle cx="56" cy="36" r="12" fill="none" stroke="url(#green)" stroke-width="6"/>'
    + path('M50 35q0-6 6-6', 'none', '#ffffff', 2.5)
)
icons['dorm'] = path('M14 32l28-21 28 21v4H14Z', '#a33631') + path('M11 28l28-21 28 21v4H11Z', 'url(#red)') + rect(19, 31, 41, 33, '#b89550', 3) + rect(16, 28, 41, 33, 'url(#gold)', 3) + rect(31, 42, 12, 19, '#fff8e1', 2) + rect(22, 36, 5, 7, '#687d73', 1) + rect(47, 36, 5, 7, '#687d73', 1) + circle(55, 55, 10, '#b17925') + circle(53, 53, 9, 'url(#gold)') + circle(53, 53, 3, '#ae7a27') + path('M56 58l10 11m-4-6 4-4', 'none', '#c98d24', 5)
icons['campus-map'] = path('M12 24l18-7 20 7 18-7v41l-18 7-20-7-18 7Z', '#aabbad') + path('M9 20l18-7 20 7 18-7v41l-18 7-20-7-18 7Z', 'url(#paper)') + path('M27 13v41m20-34v41M14 34l40 10', 'none', '#c8d6cd', 2) + path('M32 27a13 13 0 0 1 26 0q0 10-13 26-13-16-13-26Z', 'url(#red)') + circle(45, 27, 5, '#fff9e8')
icons['library'] = rect(14, 19, 14, 44, '#b9852c', 3) + rect(11, 15, 14, 44, 'url(#gold)', 3) + rect(31, 14, 14, 49, '#3c6654', 3) + rect(28, 10, 14, 49, 'url(#green)', 3) + '<g transform="rotate(-12 55 39)">' + rect(51, 18, 14, 45, '#a3352f', 3) + rect(48, 14, 14, 45, 'url(#red)', 3) + rect(51, 21, 8, 3, '#fff0db', 1) + rect(51, 48, 8, 3, '#fff0db', 1) + '</g>' + rect(14, 23, 8, 3, '#fff5dd', 1) + rect(31, 19, 8, 3, '#f2f7e6', 1) + rect(14, 49, 8, 3, '#fff5dd', 1) + rect(31, 49, 8, 3, '#f2f7e6', 1)

defs = '''<defs>
<linearGradient id="gold" x1="0" y1="0" x2="0.8" y2="1"><stop stop-color="#f8d77f"/><stop offset="1" stop-color="#dea52f"/></linearGradient>
<linearGradient id="red" x1="0" y1="0" x2="0.8" y2="1"><stop stop-color="#ec7770"/><stop offset="1" stop-color="#bf4037"/></linearGradient>
<linearGradient id="green" x1="0" y1="0" x2="0.8" y2="1"><stop stop-color="#78a993"/><stop offset="1" stop-color="#3e7059"/></linearGradient>
<linearGradient id="paper" x1="0" y1="0" x2="0.8" y2="1"><stop stop-color="#ffffff"/><stop offset="1" stop-color="#e5ecea"/></linearGradient>
<linearGradient id="steel" x1="0" y1="0" x2="0.8" y2="1"><stop stop-color="#c0ced0"/><stop offset="1" stop-color="#8ca3a7"/></linearGradient>
</defs>'''
for name, body in icons.items():
    used_defs = '<defs>' + ''.join(match.group(0) for match in re.finditer(r'<linearGradient id="([^"]+)".*?</linearGradient>', defs, re.S) if f'url(#{match.group(1)})' in body) + '</defs>'
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">{used_defs}<ellipse cx="40" cy="71" rx="24" ry="4" fill="#776440" opacity=".12"/><g transform="rotate(-6 40 40)">{body}</g></svg>\n'
    (OUT / f'{name}.svg').write_text(svg, encoding='utf-8')
print(f'Drew {len(icons)} service icons.')
