// JSX

// JSX是一种嵌入式的类似XML的语法。 它可以被转换成合法的JavaScript，尽管转换的语义是依据不同的实现而定的。 
// JSX因React框架而流行，但也存在其它的实现。 TypeScript支持内嵌，类型检查以及将JSX直接编译为JavaScript。

// 基本用法
// 想要使用JSX必须做两件事：

// 给文件一个.tsx扩展名
// 启用jsx选项
// TypeScript具有三种JSX模式：preserve，react和react-native。 
// 这些模式只在代码生成阶段起作用 - 类型检查并不受影响。 
// 在preserve模式下生成代码中会保留JSX以供后续的转换操作使用（比如：Babel）。 
// 另外，输出文件会带有.jsx扩展名。 
// react模式会生成React.createElement，在使用前不需要再进行转换操作了，输出文件的扩展名为.js。 
// react-native相当于preserve，它也保留了所有的JSX，但是输出文件的扩展名是.js。

// 你可以通过在命令行里使用--jsx标记或tsconfig.json里的选项来指定模式。

// 类型检查

// 为了理解JSX的类型检查，你必须首先理解固有元素与基于值的元素之间的区别。 
// 假设有这样一个JSX表达式<expr />，expr可能引用环境自带的某些东西（比如，在DOM环境里的div或span）或者是你自定义的组件。 
// 这是非常重要的，原因有如下两点：

// 对于React，固有元素会生成字符串（React.createElement("div")），
// 然而由你自定义的组件却不会生成（React.createElement(MyComponent)）。

// 传入JSX元素里的属性类型的查找方式不同。 
// 固有元素属性本身就支持，然而自定义的组件会自己去指定它们具有哪个属性。




// 装饰器

// 随着TypeScript和ES6里引入了类，在一些场景下我们需要额外的特性来支持标注或修改类及其成员。 
// 装饰器（Decorators）为我们在类的声明及成员上通过元编程语法添加标注提供了一种方式。 
// Javascript里的装饰器目前处在 建议征集的第二阶段，但在TypeScript里已做为一项实验性特性予以支持。

// 装饰器是一种特殊类型的声明，它能够被附加到类声明，方法， 访问符，属性或参数上。 
// 装饰器使用 @expression这种形式，expression求值后必须为一个函数，它会在运行时被调用，被装饰的声明信息做为参数传入。

function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

// 装饰器工厂
// 如果我们要定制一个修饰器如何应用到一个声明上，我们得写一个装饰器工厂函数。 
// 装饰器工厂就是一个简单的函数，它返回一个表达式，以供装饰器在运行时调用。

function color(value: string) { // 这是一个装饰器工厂
  return function (target) { //  这是装饰器
      // do something with "target" and "value"...
  }
}

function f() {
  console.log("f(): evaluated");
  return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
      console.log("f(): called");
  }
}

function g() {
  console.log("g(): evaluated");
  return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
      console.log("g(): called");
  }
}

class C {
  @f()
  @g()
  method() {}
}

// 装饰器求值
// 类中不同声明上的装饰器将按以下规定的顺序应用：

// 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个实例成员。
// 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个静态成员。
// 参数装饰器应用到构造函数。
// 类装饰器应用到类。

@sealed
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}