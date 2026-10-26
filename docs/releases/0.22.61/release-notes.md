# The Hollow Below / Alpha 0.22.61

Borderless and windowed play now release mouse capture when the game loses Windows focus, including when another app or screenshot tool takes the foreground. The game stays visible in these modes.

Exclusive fullscreen minimizes when you switch to another application. Returning to the game leaves the mouse free until you choose Resume or press Escape.

A shared focus policy prevents multiplayer from locking the pointer again every frame while another application is active. Local movement, look, interaction and microphone capture stop outside the game; the online session continues.

Solo play pauses on focus loss, including during an attack. Resume works from the visible button or Escape. Fresh input is cleared when returning so the camera does not jump from old mouse motion.

An unconfirmed resolution change waits until focus returns before rolling back, so it cannot change the desktop underneath another tool. Shutdown no longer queries cursor capture through destroyed game windows.

The maze replayability update is included: actual difficulty previews at a common scale and 24 possible objective sites per difficulty in both playable levels, with three chosen per run. The Last Harvest and The Ossuary remain Coming Soon.

Windows download only. Close the game, then choose Update & restart in the launcher. Everyone in a lobby should use the same version.
