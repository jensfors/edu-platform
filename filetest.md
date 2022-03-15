# Use Headings to Show Hierarchical Relationships of Content

## Exercise

When Peter uses his screen reader, he is able to get a summary of a web page by having it read only the headings. This means it is important structuring the HTML headers (`h1` through `h6`) to indicate what content the different sections contain and indicate the hierarchical relationships of your content. Headers also need to be in the right order and NOT skip a header rank. Headers should NOT be chosen based on its text size, this can be done with CSS.

If you were writing a paper with an introduction, a body, and a conclusion, it wouldn't make much sense to put the conclusion as a subsection of the body in your outline, because Peter's screen reader would not tell him that there is a conclusion section. It should instead be its own section. Similarly, the heading tags in a webpage need to go in order and indicate the hierarchical relationships of your content. Figure 1 shows, on the left the correct order and on the right, the wrong order.

| ![Figure 1: Example of how to structure a paper](https://media.discordapp.net/attachments/473943043117023244/913056463604297768/Headers.png) |
| :------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                  _Figure 1_                                                                  |

- Help Peter using the web site by fixing the HTML code, so the correct heading tags are used

## Examples

Here are two examples of using the correct and wrong order of HTML heading tags

**Wronger order, where** `h3` **is skipped:**

```html
<h1>Section</h1>
<h2>Subsection1</h2>
<h4>Subsubsection</h4>
<h2>Subsection2</h2>
```

**Correct order:**

```html
<h1>Section</h1>
<h2>Subsection1</h2>
<h3>Subsubsection</h3>
<h2>Subsection2</h2>
```
