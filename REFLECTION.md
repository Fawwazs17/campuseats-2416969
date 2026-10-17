# Week 1 reflection

1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?

   With plain DOM code I tell the browser every step: create the element, set its text, append it, and change it again by hand when data changes. With React I describe what the screen should look like for the current data, and React works out the DOM changes for me.

2. Why must a component name start with a capital letter?

   JSX treats lowercase tags like `<header>` as normal HTML elements, and capitalised tags like `<Header />` as components. If I named it `header`, React would render an empty HTML header tag instead of calling my function.

3. What does a fragment `<>...</>` do, and why not just use a `<div>`?

   A component must return one element, and a fragment groups several elements without adding anything to the page. A `<div>` would add an extra box to the DOM that can break the layout or CSS, such as a grid or flex parent.

4. Name one benefit of splitting the UI into small components.

   Each piece can be reused and changed in one place. For example, MenuItemCard is written once, and later the same card can show every dish on the menu.
