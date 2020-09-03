/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/react-in-jsx-scope */
// Context
// Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。
// 在一个典型的 React 应用中，数据是通过 props 属性自上而下（由父及子）进行传递的，
// 但这种做法对于某些类型的属性而言是极其繁琐的（例如：地区偏好，UI 主题），这些属性是应用程序中许多组件都需要的。
// Context 提供了一种在组件之间共享此类值的方式，而不必显式地通过组件树的逐层传递 props。

// 何时使用 Context
// Context 设计目的是为了共享那些对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言。
// 举个例子，在下面的代码中，我们通过一个 “theme” 属性手动调整一个按钮组件的样式：

function Toolbar(props) {
  // Toolbar 组件接受一个额外的“theme”属性，然后传递给 ThemedButton 组件。
  // 如果应用中每一个单独的按钮都需要知道 theme 的值，这会是件很麻烦的事，
  // 因为必须将这个值层层传递所有组件。
  return (
    <div>
      <ThemedButton theme={props.theme} />
    </div>
  );
}

class ThemedButton extends React.Component {
  render() {
    return <Button theme={this.props.theme} />;
  }
}

class App extends React.Component {
  render() {
    return <Toolbar theme="dark" />;
  }
}

// 使用 context, 我们可以避免通过中间元素传递 props：

// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“light”为默认值）。
const ThemeContext = React.createContext('light');

class App1 extends React.Component {
  render() {
    // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    // 无论多深，任何组件都能读取这个值。
    // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar1 />
      </ThemeContext.Provider>
    );
  }
}

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar1() {
  return (
    <div>
      <ThemedButton1 />
    </div>
  );
}

class ThemedButton1 extends React.Component {
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}

// 使用 Context 之前的考虑
// Context 主要应用场景在于很多不同层级的组件需要访问同样一些的数据。请谨慎使用，因为这会使得组件的复用性变差。

// 如果你只是想避免层层传递一些属性，组件组合（component composition）有时候是一个比 context 更好的解决方案。

// 一种无需 context 的解决方案是将 Avatar 组件自身传递下去，因而中间组件无需知道 user 或者 avatarSize 等 props：

function Page(props) {
  const user = props.user;
  const userLink = (
    <Link href={user.permalink}>
      <Avatar user={user} size={props.avatarSize} />
    </Link>
  );
  return <PageLayout userLink={userLink} />;
}
// 这种对组件的控制反转减少了在你的应用中要传递的 props 数量，这在很多场景下会使得你的代码更加干净，使你对根组件有更多的把控。
// 但是，这并不适用于每一个场景：这种将逻辑提升到组件树的更高层次来处理，会使得这些高层组件变得更复杂，
// 并且会强行将低层组件适应这样的形式，这可能不会是你想要的。


// 错误边界

// 过去，组件内的 JavaScript 错误会导致 React 的内部状态被破坏，并且在下一次渲染时 产生 可能无法追踪的 错误。
// 这些错误基本上是由较早的其他代码（非 React 组件代码）错误引起的，但 React 并没有提供一种在组件中优雅处理这些错误的方式，也无法从错误中恢复。

// 错误边界（Error Boundaries）
// 部分 UI 的 JavaScript 错误不应该导致整个应用崩溃，为了解决这个问题，React 16 引入了一个新的概念 —— 错误边界。

// 错误边界是一种 React 组件，这种组件可以捕获并打印发生在其子组件树任何位置的 JavaScript 错误，
// 并且，它会渲染出备用 UI，而不是渲染那些崩溃了的子组件树。错误边界在渲染期间、生命周期方法和整个组件树的构造函数中捕获错误。

// 注意

// 错误边界无法捕获以下场景中产生的错误：

// 事件处理（了解更多）
// 异步代码（例如 setTimeout 或 requestAnimationFrame 回调函数）
// 服务端渲染
// 它自身抛出来的错误（并非它的子组件）

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}

// 错误边界的工作方式类似于 JavaScript 的 catch {}，不同的地方在于错误边界只针对 React 组件。只有 class 组件才可以成为错误边界组件。
// 大多数情况下, 你只需要声明一次错误边界组件, 并在整个应用中使用它。
// 注意错误边界仅可以捕获其子组件的错误，它无法捕获其自身的错误。
// 如果一个错误边界无法渲染错误信息，则错误会冒泡至最近的上层错误边界，这也类似于 JavaScript 中 catch {} 的工作机制。

// Web Components
// React 和 Web Components 为了解决不同的问题而生。
// Web Components 为可复用组件提供了强大的封装，而 React 则提供了声明式的解决方案，使 DOM 与数据保持同步。
// 两者旨在互补。作为开发人员，可以自由选择在 Web Components 中使用 React，或者在 React 中使用 Web Components，或者两者共存。


class HelloMessage extends React.Component {
  render() {
    return <div>Hello <x-search>{this.props.name}</x-search>!</div>;
  }
}

// 注意：

// Web Components 通常暴露的是命令式 API。
// 例如，Web Components 的组件 video 可能会公开 play() 和 pause() 方法。
// 要访问 Web Components 的命令式 API，你需要使用 ref 直接与 DOM 节点进行交互。
// 如果你使用的是第三方 Web Components，那么最好的解决方案是编写 React 组件包装该 Web Components。

// Web Components 触发的事件可能无法通过 React 渲染树正确的传递。 
// 你需要在 React 组件中手动添加事件处理器来处理这些事件。

// 常见的误区是在 Web Components 中使用的是 class 而非 className。

function BrickFlipbox() {
  return (
    <brick-flipbox class="demo">
      <div>front</div>
      <div>back</div>
    </brick-flipbox>
  );
}


// =======================================================

// 深入 JSX

// 实际上，JSX 仅仅只是 React.createElement(component, props, ...children) 函数的语法糖。如下 JSX 代码：
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>

React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
);

<div className="sidebar" />

React.createElement(
  'div',
  { className: 'sidebar' }
);


