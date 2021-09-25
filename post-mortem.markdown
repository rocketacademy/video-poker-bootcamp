# Video Poker Post-Motem

## Technical Review

1. What went well? Please share a link to the specific code.

   - Layout sequencing of DOM elements leveraging on divs defined in index.html
     - Remove the need to think about how I want sequence DOM placements in js. Appendchild to the specific div directly.
     - https://github.com/makck/video-poker-bootcamp/blob/2942531d16136e3ab38c4f181d685bfa79a65819/index.html#L103
   - Using the includes function on the array
     - Used mainly to check for winning conditions for the different winning hand combinations
     - Saved time since didn’t have to write a loop to run through each elements in the array
     - https://github.com/makck/video-poker-bootcamp/blob/2942531d16136e3ab38c4f181d685bfa79a65819/script.js#L316

2. What were the biggest challenges you faced? Please share a link to the specific code.

   - Mostly on the css front, centering the divs and making sure things look presentable

3. What would you do differently next time?
   - Score table implementation
     - Score table is currently hardcoded in html
     - Will probably want to leverage js DOM to implement that
   - Implement +/- buttons for bet amount instead of dropdown
   - Enable reset game function when credits run out
   - Including sound effects

## Process Review

1. What went well?

   - Completed base in time
   - Starting out on the game flow first before moving on to the calcHandScore function

2. What could have been better?
   - Could have set aside more time to include additional features such as sound effects
3. What would you do differently next time?
   - Nothing in particular for now

## Questions

- How can we make use of js doc comments?
