/* eslint-disable react/display-name */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/react-in-jsx-scope */
// 高阶组件

// 高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。
// HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。

// 具体而言，高阶组件是参数为组件，返回值为新组件的函数。

const EnhancedComponent = higherOrderComponent(WrappedComponent);

// 组件是将 props 转换为 UI，而高阶组件是将组件转换为另一个组件。

// 使用 HOC 解决横切关注点问题
// 注意

// 我们之前建议使用 mixins 用于解决横切关注点相关的问题。但
// 我们已经意识到 mixins 会产生更多麻烦。阅读更多 以了解我们为什么要抛弃 mixins 以及如何转换现有组件。

// 例如，假设有一个 CommentList 组件，它订阅外部数据源，用以渲染评论列表：

class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      // 假设 "DataSource" 是个全局范围内的数据源变量
      comments: DataSource.getComments()
    };
  }

  componentDidMount() {
    // 订阅更改
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    // 清除订阅
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    // 当数据源更新时，更新组件状态
    this.setState({
      comments: DataSource.getComments()
    });
  }

  render() {
    return (
      <div>
        {this.state.comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
    );
  }
}

class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      blogPost: DataSource.getBlogPost(props.id)
    };
  }

  componentDidMount() {
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    this.setState({
      blogPost: DataSource.getBlogPost(this.props.id)
    });
  }

  render() {
    return <TextBlock text={this.state.blogPost} />;
  }
}

// CommentList 和 BlogPost 不同 - 它们在 DataSource 上调用不同的方法，且渲染不同的结果。但它们的大部分实现都是一样的：

// 在挂载时，向 DataSource 添加一个更改侦听器。
// 在侦听器内部，当数据源发生变化时，调用 setState。
// 在卸载时，删除侦听器。

// 你可以想象，在一个大型应用程序中，这种订阅 DataSource 和调用 setState 的模式将一次又一次地发生。
// 我们需要一个抽象，允许我们在一个地方定义这个逻辑，并在许多组件之间共享它。这正是高阶组件擅长的地方。

// 对于订阅了 DataSource 的组件，比如 CommentList 和 BlogPost，我们可以编写一个创建组件函数。
// 该函数将接受一个子组件作为它的其中一个参数，该子组件将订阅数据作为 prop。让我们调用函数 withSubscription

const CommentListWithSubscription = withSubscription(
  CommentList,
  (DataSource) => DataSource.getComments()
);

const BlogPostWithSubscription = withSubscription(
  BlogPost,
  (DataSource, props) => DataSource.getBlogPost(props.id)
);


// 此函数接收一个组件...
function withSubscription(WrappedComponent, selectData) {
  // ...并返回另一个组件...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData(DataSource, props)
      };
    }

    componentDidMount() {
      // ...负责订阅相关的操作...
      DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props)
      });
    }

    render() {
      // ... 并使用新数据渲染被包装的组件!
      // 请注意，我们可能还会传递其他属性
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}