# Why Qlik Hooks?

[React Hooks](https://reactjs.org/docs/hooks-intro.html) are functions that let you "hook into" React state from function components. They provide a method to extract stateful logic from React components, so they can be shared and reused between components. Hooks greatly lessen the need for Class-based React components, allowing for functional components to used while still preserving the stateful nature of a Class.

_Class-Component_

```jsx
export default class Dog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "Baxter",
    }

    this.handleNameChange = this.handleNameChange.bind(this)
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value })
  }

  render() {
    return (
      <div>
        <div>Your dog's name is: {this.state.name}</div>
        <input value={this.state.name} onChange={this.handleNameChange} />
      </div>
    )
  }
}
```

_Function Component with Hooks_

```jsx
export default function Dog(props) {
  const [name, setName] = useState("Baxter")

  function handleNameChange(e) {
    setName(e.target.value)
  }

  return (
    <div>
      <div>Your dog's name is: {name}</div>
      <input value={name} onChange={handleNameChange} />
    </div>
  )
}
```

By using Hooks, we can convert our Class component into a functional component, and

# Why Rx?

[Reactive programming](https://en.wikipedia.org/wiki/Reactive_programming) is a declarative style of programming that enables developers to define variables as entities that change over time, with their behavior and interdependencies clearly defined. This approach is best represented in the following pseudocode examples:

_Non-reactive_

```
a = 1;
b = a + 1;
a = 2;

print a; // -> 2
print b; // -> 2
```

_Reactive_

```
a = 1;
b = a + 1;
a = 2;

print a; // -> 2
print b; // -> 3
```

In the reactive example, the variable `b` is declared as depending on `a`, so when `a` changes, `b` necessarily changes.

Because of this feature, reactive programming is useful in highly interactive interfaces, especially when complex relationships exist between various variables. It also lends itself to asynchronous operations, where time delays affect when and how variables in a program change. When used properly, Rx enables scalable and maintainable code for complex, dynamic applications.

Let's take a simple example. [Say you want to create a component that can be dragged and dropped around the screen.](https://codesandbox.io/embed/9ol0rvokpo) The Rx code for this is concise, easy to read, and easy to modify:

```javascript
import { fromEvent } from "rxjs/observable/fromEvent"
import { switchMap, takeUntil } from "rxjs/operators"

const box = document.querySelector("#box")

const mousedown$ = fromEvent(box, "mousedown")
const mouseup$ = fromEvent(document, "mouseup")
const mousemove$ = fromEvent(document, "mousemove")

const move$ = mousedown$.pipe(switchMap(() => mousemove$.pipe(takeUntil(mouseup$))))

move$.subscribe(evt => {
  const top = parseInt(box.style.top)
  const left = parseInt(box.style.left)
  box.style.top = `${top + evt.movementY}px`
  box.style.left = `${left + evt.movementX}px`
})
```

For more on Rx, we highly recommend this guide to get started: [The introduction to Reactive Programming you've been missing](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754), by [André Staltz](https://gist.github.com/staltz).

Or if you're looking for a quicker summary, try this [shorter read](https://branch-blog.qlik.com/what-is-reactive-programming-a1e82cf28575).

## Rx & Qlik

Because Rx works so well with dynamic applications, it pairs well with Qlik and it's engine. At its core, the Qlik Associative Engine (QAE) can be thought of as a reactive interface. It models data into a **state** that is modified by interactions like filtering data, causing the state of the model to update and any existing calculations to be recalculated based on this new state. In other words, the data model state in the engine is a dynamic entity that can change over time. This fits perfectly with Rx's strengths!

RxQ bridges the gap between RxJS and QAE, enabling developers to leverage reactive programming when working with Qlik.
