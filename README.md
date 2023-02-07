# Pokermon: Pokemon Video Poker
## Overview
![pokermon-logo](https://user-images.githubusercontent.com/17814490/148029887-b316643f-f27a-4f93-8a4d-eccd6934373a.png)

Pokermon is a video poker game with Pokemon theme, done in 8-bit gaming style.

**LIVE LINK** : https://hertantoirawan.github.io/pokermon/

## Features

<img src="https://user-images.githubusercontent.com/17814490/147749905-de12cdb1-0e7a-4fd9-aa7d-156da3866eeb.png" width="200"> <img src="https://user-images.githubusercontent.com/17814490/147762408-0e58d4c3-cb20-41ea-a237-6699129ff90e.png" width="200"> <img src="https://user-images.githubusercontent.com/17814490/147765759-50a0c545-9eaf-4231-b805-c6e6f49312aa.png" width="200"> <img src="https://user-images.githubusercontent.com/17814490/147750002-9de609f0-7480-4c41-9a5e-62dd511ae7bb.png" width="200">

- This video poker game uses the ["Jacks or Better"](https://en.wikipedia.org/wiki/Video_poker#Jacks_or_Better) rule. 
- Game scoring also follows the ["Jacks or Better"](https://en.wikipedia.org/wiki/Video_poker#Jacks_or_Better) rule.
- Game music can be turned on/off during game.
- Player starts with 100 credits.
- "Bet 5" is to add bet 5 credits at a time.
- Player can bet as many credits (no max) as he/she wants.
- Extra multiplier (800x) when getting Royal Flush applies to bet of 5 or more credits.
- Pokemon character host, game music, and hints settings can be changed in Option menu.
- Secret codes
  - [*Konami code*](https://en.wikipedia.org/wiki/Konami_Code): Up, Up, Down, Down, Left, Right, Left, Right, B, A
    - Increase credits by 30
  - *Royal Flush code*: Up, Down, Left, Right, B, A
    - Deals Royal Flush, and deck is not shuffled
- Hint is given during select-cards-to-keep round, if Hints is enabled in Option menu.
  - Hint is the result of API call to [Flask API wrapper](https://github.com/hertantoirawan/video_poker_analyzer) of [Video Poker Analyzer code by Brad Jacobs](https://github.com/BradAJ/video_poker_analyzer)

## Tech Used / Dependencies

- This is a vanilla Javascript app with HTML and CSS
- UI is only tested in iPhone X and Chrome browser dimensions
- Components from [NES.css](https://nostalgic-css.github.io/NES.css/)
- Color inspiration from [Online Palette](https://www.onlinepalette.com/pokemon/)
- Fonts from [Google Fonts](https://fonts.google.com/specimen/Press+Start+2P)
- 8-bit card deck from [drawsgood](https://drawsgood.itch.io/)
- 8-bit pokemon card back image modified from [Tumblr](https://66.media.tumblr.com/2c0f485a7b6c4c3e3ddd5bdb3d70794b/tumblr_mfluqxX5FE1rfjowdo1_540.gif)
- Music and sounds from [Mobcup](https://mobcup.net/)
- Pokermon logo made using [Font Meme](https://fontmeme.com/pokemon-font/)
- README.md format from [article in Medium](https://medium.com/chingu/keys-to-a-well-written-readme-55c53d34fe6d)
- Poker hand score calculation is unit tested using [Cypress](https://www.npmjs.com/package/cypress)
- Code is formatted using [Prettier](https://www.npmjs.com/package/prettier)
- Code is linted using [ESLint](https://www.npmjs.com/package/eslint) 

## Documentation
More documentation about the development of the game in [Wiki](https://github.com/hertantoirawan/video-poker-bootcamp/wiki).

