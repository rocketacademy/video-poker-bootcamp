# Rocket Academy Coding Bootcamp: Video Poker

Technical Review
"Technical" refers to software logic and syntax.
What went well? Please share a link to the specific code.

- Animations, sounds, click events working ok
- calcHandScore and probability logic

What were the biggest challenges you faced? Please share a link to the specific code.

- Scoring table was hard coded with HTML. Probably could have used CSS Grid and some javascript to propagate the score patterns
- Making the layout responsive. The large score table looks to be making the layout off center in mobile view
- App hangs when it runs loop with too many iterations. Unexpected behaviour when user clicks around while loop is running. There will be some "click event backlog"

What would you do differently next time?

- Separate UI code and game logic code into different files
- Use CSS grid or flexbox
- Optimise the probability calculation algo

Process Review
"Process" refers to app development steps and strategy.
What went well?

- The advice to use test hands to make calcHandScore working first. Helps to focus on cleaning up possible edge cases for calcHandScore
- Build the probability logic in chunks. Have clear pseudo code first
- Container divs for each section was done up first and outputting correctly. Design was done later.

What could have been better?

- Not sure if UI layout and colour combinations are the best

## What would you do differently next time?
