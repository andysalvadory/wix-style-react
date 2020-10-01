# What should I do when I get in trouble?

In this doc we will share how we troubleshoot issues that we experience when we struggle with a component or a testkit usage:

1. Check whether there is an example that fits your scenario in the [storybook](https://www.wix-style-react.com).
2. Check our [Cheetsheet](https://www.wix-style-react.com/?path=/story/introduction-cheatsheet--components-cheatsheet) which includes a view of most of the library components inventory and links to the relevant documentation pages.
3. Use the [Playground](https://www.wix-style-react.com/?path=/story/introduction-playground--playground) to easily test the component abilities.
4. You may find an answer to your question in our [Frequently Asked Questions](https://github.com/wix/wix-style-react/tree/master/docs/FAQ#frequently-asked-questions) article.
5. Each component within the library is tested with our on drivers. This is a great way to document the proper usage of the component and drivers. You can learn from the tests on how the component should properly used / tested. Checkout the [sourcecode](https://github.com/wix/wix-style-react). Each component's tests files are listed under:
`src/ComponentName/test/...`.
6. Strip down abilities until you get to the bottom of it. Saying we have for example the `<Table/>` component which does not work as we expect it to. All the above steps did not help us. The thing we would do is one of the two:
    - Take the most basic and clean table example and on top of it add your own feature in small parts.
    - Take your current code which does not work and strip it's features slowly, one by one, until you reach to the point where things are working, then slowly add them back again so you will be able to find the root cause of the problem.
7. Still stuck? Let's debug.
   It is very easy to run the storybook on your local machine.
   Instructions can be found [here](https://github.com/wix/wix-style-react/blob/master/CONTRIBUTING.md).
   We suggest placing `debugger` inside the story of your rebellious component. For example [Table story](https://github.com/wix/wix-style-react/blob/1b3e00fb624929927b3921905f8db8bdb011c427/src/Table/docs/index.story.js).
8. Still stuck? Use our slack channel `#wix-style-react`. Often you will be able to find your answer by using the Search in the channel and if not, just talk to us. (You are of course welcome to talk to us before step 8 :-) )

