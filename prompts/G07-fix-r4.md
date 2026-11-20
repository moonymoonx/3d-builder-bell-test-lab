# Gemini brief 07 — fix round 4 (R4: clarity 4, ease 4, beauty 4, smooth 4, delight 3)
Same sandbox rules. Read ALL of ref/REVIEW-R4.md. Keep every 4. Lift delight to ≥ 4 (aim 4.5) and beauty toward 4.5. Implement its 8 ranked fixes and the 3 wording notes in its physics section exactly:
- Step 5: "Can any hidden card beat 75% — and keep it there?"; Step 6: "No hidden card … can keep this up"; Step 7: "looks like pure coin flips".
- Shatter: its own unobstructed beat (UI rail dims/slides for ~1.2 s, no overlay text over shards), no ringed halo sprite (smooth radial falloff), shards with tinted refraction-like body + thin bright edges, not flat white rims.
- Teacher: the 3D lever truly hidden (not on stage) until "The class has voted — reveal lever"; then it rises from the stage with a satisfying sound.
- Phone hero: closer, tactile, alive (camera framing for portrait so boxes fill ~85% width, gentle idle motion, lamps blooming).
- Step 7: frosted screen fully opaque to Alice's lamp; Bob's readout starts from an honest fresh tally, never stale.
Verify with rebuild + `node tools/shots.mjs index.html --out=screenshots/r5 --steps=tools/steps.json` and open every PNG; iterate. Commit (no push), log DECISIONS.md + LOG.md. 6-line summary.
