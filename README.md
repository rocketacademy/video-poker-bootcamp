# RA-Bootcamp

## Project 1 - Video Poker

### Motivation & Objectives
Create a video poker game using concepts learnt from Module 1: Frontend Basics. Here I will document my thought process and steps I have taken to finish this project. To try playing the game click here - https://staceyng.github.io/video-poker-bootcamp/
#### Base Deliverables 
- [x] Working Video Poker Game
- [x] Functions are to have JS doc strings

#### Comfortable Deliverables 
- [x] Responsive design (working on both desktop browsers and mobile)
- [x] Modular functions 
- [x] Design makes sense (consistent and flow)

#### More Comforable Deliverables
- [ ] Calculate probability of achieving closest hand when user swaps out card
- [ ] Implement 7 card draw instead of a 5 card draw 

### Breakdown of tasks to complete Video Poker
A. Planning phase
1. Read and understand rules of Video poker, know the winning hands to determine win conditions
2. Wireframe design - behavior and layout

B. Coding phase
1. Create individual functions for checking each hand
   a. handSimp - from user hand (array of card obj), extract only card name and count instances of card name
   b. calculateHand - from handSimp, determine different win patterns - example 5 different cards - RF etc, 3 different cards - 2 pairs, 3 kind,  2 different cards - FH etc
2. Create frontend components (buttons, cards, displays)
3. Integrate and test flow of game (find bugs from here and fix)

C. Improvements
1. Add tests - Mocha? Jest? 
2. Dockerize application? For deployment vs using github pages
#### A.2 Wireframe design 
![wireframe design image](/assets/images/wireframe.png)