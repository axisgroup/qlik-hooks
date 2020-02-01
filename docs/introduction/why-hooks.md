# Why Qlik Hooks?

[React Hooks](https://reactjs.org/docs/hooks-intro.html) are functions that let you "hook into" React state from functional components. They provide a method to extract stateful logic from React components so they can be shared and reused in a declarative format, lessening the need for Class-based React components.

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

By using Hooks, we can convert our Class component into a functional component, and manage state more easily across components in our application.
