// React 文档

import React from 'react'

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
)

// 它将在页面上展示一个 “Hello, world!” 的标题。

// JSX 简介

const element = <h1>Hello, world!</h1>;
// 这个有趣的标签语法既不是字符串也不是 HTML。

// 它被称为 JSX，是一个 JavaScript 的语法扩展。
// 我们建议在 React 中配合使用 JSX，JSX 可以很好地描述 UI 应该呈现出它应有交互的本质形式。
// JSX 可能会使人联想到模版语言，但它具有 JavaScript 的全部功能。

// JSX 可以生成 React “元素”。我们将在下一章节中探讨如何将这些元素渲染为 DOM。
// 下面我们看下学习 JSX 所需的基础知识。


// 为什么使用 JSX？
// React 认为渲染逻辑本质上与其他 UI 逻辑内在耦合，
// 比如，在 UI 中需要绑定处理事件、在某些时刻状态发生变化时需要通知到 UI，以及需要在 UI 中展示准备好的数据。

// React 并没有采用将标记与逻辑进行分离到不同文件这种人为地分离方式，
// 而是通过将二者共同存放在称之为“组件”的松散耦合单元之中，来实现关注点分离。
// 我们将在后面章节中深入学习组件。如果你还没有适应在 JS 中使用标记语言，这个会议讨论应该可以说服你。

// React 不强制要求使用 JSX，但是大多数人发现，在 JavaScript 代码中将 JSX 和 UI 放在一起时，会在视觉上有辅助作用。
// 它还可以使 React 显示更多有用的错误和警告消息。

// 搞清楚这个问题后，我们就开始学习 JSX 吧！

const name = 'Josh Perez';
const element1 = <h1>Hello, {name}</h1>;

ReactDOM.render(
  element1,
  document.getElementById('element1')
);

function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element2 = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element2,
  document.getElementById('element2')
);

// JSX 也是一个表达式
// 在编译之后，JSX 表达式会被转为普通 JavaScript 函数调用，并且对其取值后得到 JavaScript 对象。

// 也就是说，你可以在 if 语句和 for 循环的代码块中使用 JSX，将 JSX 赋值给变量，把 JSX 当作参数传入，以及从函数中返回 JSX：

function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}

// 警告：

// 因为 JSX 语法上更接近 JavaScript 而不是 HTML，所以 React DOM 使用 camelCase（小驼峰命名）来定义属性的名称，
// 而不使用 HTML 属性名称的命名约定。

// 例如，JSX 里的 class 变成了 className，而 tabindex 则变为 tabIndex。

// JSX 表示对象

// Babel 会把 JSX 转译成一个名为 React.createElement() 函数调用。
// 以下两种示例代码完全等效：

const element3 = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);

const element4 = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
)