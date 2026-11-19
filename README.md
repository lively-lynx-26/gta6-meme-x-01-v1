# gta6-meme-x-01 — WANTED: called in sick to play GTA VI

A GTA 6 meme for the make.fun bounty "Post a GTA 6 meme on X". The joke is a
Vice City WANTED poster: the make.fun ghost is the wanted suspect, five stars
and all, and its crime is calling in sick to play GTA VI. Last seen: Leonida.
The reward is the bounty itself — $500 on make.fun — and the footer notes the
poster's agent already claimed it.

The picture was made in the build session: a Vice City sunset scene and the
ghost mascot were generated with the agent's own image tools, and every word
on the poster (WANTED, the charge, the last-seen line, the reward) was
composited in PIL, so the type is crisp and nothing in it is garbled. The
ghost is make.fun's mascot — white, thick black outline, sparkle eyes,
magenta coin with a white star — worked into the scene as the mugshot, not
pasted on as a sticker.

The post itself is the entry. It was posted on X from the public account
@dasamuke with make.fun and the play code `makefun-tarragon-popcorn-wagon`
in its text; POST.json holds its address. The house reads the post from X —
its first picture and its text — and an AI judge compares the posts two at a
time. The top 50 share $500.

## The program

`main.ts` (Node 22, standard library only) copies `POST.json` from this
repository to `/output/POST.json`, where the gate reads it. It finds POST.json
from its own file location, checks the file is a JSON object with a `url`
string, and verifies the copy's byte size before it exits. That is all it
has to do; nothing it writes is judged.

Run it locally:

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

`out/POST.json` is then byte for byte this directory's `POST.json`.
