/* eslint-disable react/jsx-key */
// 元素渲染

// 元素是构成 React 应用的最小砖块。

// 与浏览器的 DOM 元素不同，React 元素是创建开销极小的普通对象。React DOM 会负责更新 DOM 来与 React 元素保持一致。
// 注意：

// 你可能会将元素与另一个被熟知的概念——“组件”混淆起来。
// 我们会在下一个章节介绍组件。组件是由元素构成的。我们强烈建议你不要觉得繁琐而跳过本章节，应当深入阅读这一章节。

// 仅使用 React 构建的应用通常只有单一的根 DOM 节点。
// 如果你在将 React 集成进一个已有应用，那么你可以在应用中包含任意多的独立根 DOM 节点。

// 想要将一个 React 元素渲染到根 DOM 节点中，只需把它们一起传入 ReactDOM.render()：

// 更新已渲染的元素
// React 元素是不可变对象。一旦被创建，你就无法更改它的子元素或者属性。一个元素就像电影的单帧：它代表了某个特定时刻的 UI。

// 根据我们已有的知识，更新 UI 唯一的方式是创建一个全新的元素，并将其传入 ReactDOM.render()。


// 组件 & Props

// 注意： 组件名称必须以大写字母开头。

// React 会将以小写字母开头的组件视为原生 DOM 标签。
// 例如，<div /> 代表 HTML 的 div 标签，而 <Welcome /> 则代表一个组件，并且需在作用域内使用 Welcome。

// 你可以在深入 JSX 中了解更多关于此规范的原因。

import React from 'react'

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  // eslint-disable-next-line react/react-in-jsx-scope
  <App />,
  document.getElementById('App')
);

// 我们可以为 class 组件声明一些特殊的方法，当组件挂载或卸载时就会去执行这些方法：

// componentDidMount() 方法会在组件已经被渲染到 DOM 中后运行

// componentWillUnmount() 

// 现在时钟每秒都会刷新。

// 让我们来快速概括一下发生了什么和这些方法的调用顺序：

// 当 <Clock /> 被传给 ReactDOM.render()的时候，React 会调用 Clock 组件的构造函数。
// 因为 Clock 需要显示当前的时间，所以它会用一个包含当前时间的对象来初始化 this.state。我们会在之后更新 state。

// 之后 React 会调用组件的 render() 方法。这就是 React 确定该在页面上展示什么的方式。
// 然后 React 更新 DOM 来匹配 Clock 渲染的输出。

// 当 Clock 的输出被插入到 DOM 中后，React 就会调用 ComponentDidMount() 生命周期方法。
// 在这个方法中，Clock 组件向浏览器请求设置一个计时器来每秒调用一次组件的 tick() 方法。

// 浏览器每秒都会调用一次 tick() 方法。 
// 在这方法之中，Clock 组件会通过调用 setState() 来计划进行一次 UI 更新。
// 得益于 setState() 的调用，React 能够知道 state 已经改变了，然后会重新调用 render() 方法来确定页面上该显示什么。

// 这一次，render() 方法中的 this.state.date 就不一样了，如此以来就会渲染输出更新过的时间。React 也会相应的更新 DOM。
// 一旦 Clock 组件从 DOM 中被移除，React 就会调用 componentWillUnmount() 生命周期方法，这样计时器就停止了。




// 列表 & Key

const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);

const listItems = numbers.map((number) =>
  // eslint-disable-next-line react/jsx-key
  <li>{number}</li>
);

// 我们把整个 listItems 插入到 <ul> 元素中，然后渲染进 DOM：

ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);

// 基础列表组件
// 通常你需要在一个组件中渲染列表。

// 我们可以把前面的例子重构成一个组件，这个组件接收 numbers 数组作为参数并输出一个元素列表。

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);

// 当我们运行这段代码，将会看到一个警告 a key should be provided for list items，
// 意思是当你创建一个元素时，必须包括一个特殊的 key 属性。我们将在下一节讨论这是为什么。
// key
// key 帮助 React 识别哪些元素改变了，比如被添加或删除。因此你应当给数组中的每一个元素赋予一个确定的标识。

// 如果列表项目的顺序可能会变化，我们不建议使用索引来用作 key 值，因为这样做会导致性能变差，还可能引起组件状态的问题。
// 可以看看 Robin Pokorny 的深度解析使用索引作为 key 的负面影响这一篇文章。
// 如果你选择不指定显式的 key 值，那么 React 将默认使用索引用作为列表项目的 key 值。

// 用 key 提取组件
// 元素的 key 只有放在就近的数组上下文中才有意义。

// 比方说，如果你提取出一个 ListItem 组件，你应该把 key 保留在数组中的这个 <ListItem /> 元素上，
// 而不是放在 ListItem 组件中的 <li> 元素上。

function ListItem(props) {
  const value = props.value;
  return (
    // 错误！你不需要在这里指定 key：
    <li key={value.toString()}>
      {value}
    </li>
  );
}

function ANumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // 错误！元素的 key 应该在这里指定：
    <ListItem key={number.toString()} value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

ReactDOM.render(
  <ANumberList numbers={numbers} />,
  document.getElementById('root')
);


function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );
  const content = props.posts.map((post) =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];

var arr = [1, 2, 3, 4]

ReactDOM.render(
  <Blog posts={posts} />,
  document.getElementById('root')
);