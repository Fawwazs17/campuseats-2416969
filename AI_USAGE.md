# AI usage log

Using AI never costs marks; a vague or missing log does.
Add a new section every week, before you tag. Did not use AI? Write "None" under Tool(s).

## Week 1
- Tool(s): Claude Code (Claude Opus 5.5)
- What I asked for: To check my repo against the lab status page and the Week 1-2 lab sheet, then finish what was missing. It wrote VendorCard (B2) for my restaurant, Kedai Ayam Gunting at Mahallah Zubair, put all four components in App.jsx (B3), and drafted this log and REFLECTION.md.
- What I kept, changed or rejected, and why: I kept the VendorCard and App.jsx code because it follows the lab sheet. I reworded the reflection answers in my own words. I checked the location and opening hours against the real stall, because the AI did not know them.
- One thing the AI got wrong and how I fixed it: Its first check only used the status page, and it missed that VendorCard.jsx did not exist at all. I asked it to read the actual lab sheet on iTa'LeEm, and then it found B2 and all of Part C were missing.

## Week 2
- Tool(s): Claude Code (Claude Opus 5.5)
- What I asked for: To finish Part C of the lab. It made src/data/vendors.js with Kedai Ayam Gunting first, changed MenuItemCard to take props, added MenuList with .map(), made VendorCard clickable with useState in App, and passed onAdd down so Add to cart updates the badge. It ran the app and checked that the badge counts up, Sold out cannot be added, and switching vendor changes the menu.
- What I kept, changed or rejected, and why: I kept the code because it follows the lab sheet step by step. I kept the extra CSS for .vendor-grid, .selected and .tag, because the starter CSS had no styles for them and the vendor buttons looked like plain browser buttons. I changed the Kedai Ayam Gunting menu to match the real stall, because the AI made up example dishes.
- One thing the AI got wrong and how I fixed it: It guessed my restaurant's menu, including Cheesy Fries and Teh Ais, which the stall does not sell. I had it remove them and add Sosej Gunting and Ayam Cheese in vendors.js.

## Week 3
- Tool(s): Claude Code (Claude Opus 5.5)
- What I asked for: To build the cart page (quantities with – / +, total), the checkout form with validation, and my personal feature for matric digit 9, Recently viewed (newest first, no duplicates, max 5, Clear button). It tested each part in the browser and helped me draft my M1 report.
- What I kept, changed or rejected, and why: I kept the cart, checkout and Recently viewed code because they work and I can explain them: the cart is lifted to App, the total is derived with reduce, and the form inputs are controlled. I did not yet change the form to the lab's Mahallah dropdown, or load the menu with fetch from public/api/vendors.json. Those are listed as not done yet in my M1 submission.
- One thing the AI got wrong and how I fixed it: It built Week 3 from the "CampusEats by Week 4" overview before we found the Week 3 lab sheet in the SLIDES FOLDER. So its checkout form asks for a phone number instead of a mahallah, and the cart shows under the menu instead of in a separate view. I noted the differences against the lab sheet to fix next.
