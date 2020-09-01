/* eslint-disable react/react-in-jsx-scope */
// 状态提升

// 通常，多个组件需要反映相同的变化数据，这时我们建议将共享状态提升到最近的共同父组件中去。让我们看看它是如何运作的。

// 在本节中，我们将创建一个用于计算水在给定温度下是否会沸腾的温度计算器。

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

// 接下来, 我们创建一个名为 Calculator 的组件。它渲染一个用于输入温度的 <input>，并将其值保存在 this.state.temperature 中。

// 添加第二个输入框
// 我们的新需求是，在已有摄氏温度输入框的基础上，我们提供华氏度的输入框，并保持两个输入框的数据同步。

// 我们先从 Calculator 组件中抽离出 TemperatureInput 组件，然后为其添加一个新的 scale prop，它可以是 "c" 或是 "f"：

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Calculator extends React.Component {

  constructor(props) {
    super(props)
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);

    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}

// 编写转换函数

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

// ========================================
// 'use strict';

const e = React.createElement;

ReactDOM.render(
  <Calculator/>,
  document.getElementById('calculator_container')
);

const domContainer = document.querySelector('#calculator_container');
ReactDOM.render(e('Calculator', Calculator), domContainer);


// 现在无论你编辑哪个输入框中的内容，Calculator 组件中的 this.state.temperature 和 this.state.scale 均会被更新。
// 其中一个输入框保留用户的输入并取值，另一个输入框始终基于这个值显示转换后的结果。

// 让我们来重新梳理一下当你对输入框内容进行编辑时会发生些什么：

// React 会调用 DOM 中 <input> 的 onChange 方法。在本实例中，它是 TemperatureInput 组件的 handleChange 方法。
// TemperatureInput 组件中的 handleChange 方法会调用 this.props.onTemperatureChange()，并传入新输入的值作为参数。
// 其 props 诸如 onTemperatureChange 之类，均由父组件 Calculator 提供。
// 起初渲染时，用于摄氏度输入的子组件 TemperatureInput 中的 onTemperatureChange 方法与 Calculator 组件中的 handleCelsiusChange 方法相同，
// 而，用于华氏度输入的子组件 TemperatureInput 中的 onTemperatureChange 方法与 Calculator 组件中的 handleFahrenheitChange 方法相同。
// 因此，无论哪个输入框被编辑都会调用 Calculator 组件中对应的方法。
// 在这些方法内部，Calculator 组件通过使用新的输入值与当前输入框对应的温度计量单位来调用 this.setState() 进而请求 React 重新渲染自己本身。
// React 调用 Calculator 组件的 render 方法得到组件的 UI 呈现。温度转换在这时进行，两个输入框中的数值通过当前输入温度和其计量单位来重新计算获得。
// React 使用 Calculator 组件提供的新 props 分别调用两个 TemperatureInput 子组件的 render 方法来获取子组件的 UI 呈现。
// React 调用 BoilingVerdict 组件的 render 方法，并将摄氏温度值以组件 props 方式传入。
// React DOM 根据输入值匹配水是否沸腾，并将结果更新至 DOM。我们刚刚编辑的输入框接收其当前值，另一个输入框内容更新为转换后的温度值。
// 得益于每次的更新都经历相同的步骤，两个输入框的内容才能始终保持同步。

// 学习小结
// 在 React 应用中，任何可变数据应当只有一个相对应的唯一“数据源”。通常，state 都是首先添加到需要渲染数据的组件中去。
// 然后，如果其他组件也需要这个 state，那么你可以将它提升至这些组件的最近共同父组件中。
// 你应当依靠自上而下的数据流，而不是尝试在不同组件间同步 state。

// 虽然提升 state 方式比双向绑定方式需要编写更多的“样板”代码，但带来的好处是，排查和隔离 bug 所需的工作量将会变少。
// 由于“存在”于组件中的任何 state，仅有组件自己能够修改它，因此 bug 的排查范围被大大缩减了。
// 此外，你也可以使用自定义逻辑来拒绝或转换用户的输入。

// 如果某些数据可以由 props 或 state 推导得出，那么它就不应该存在于 state 中。
// 举个例子，本例中我们没有将 celsiusValue 和 fahrenheitValue 一起保存，而是仅保存了最后修改的 temperature 和它的 scale。
// 这是因为另一个输入框的温度值始终可以通过这两个值以及组件的 render() 方法获得。
// 这使得我们能够清除输入框内容，亦或是，在不损失用户操作的输入框内数值精度的前提下对另一个输入框内的转换数值做四舍五入的操作。

