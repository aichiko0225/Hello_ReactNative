// 类
// 传统的JavaScript程序使用函数和基于原型的继承来创建可重用的组件，
// 但对于熟悉使用面向对象方式的程序员来讲就有些棘手，因为他们用的是基于类的继承并且对象是由类构建出来的。 
// 从ECMAScript 2015，也就是ECMAScript 6开始，JavaScript程序员将能够使用基于类的面向对象的方式。 
// 使用TypeScript，我们允许开发者现在就使用这些特性，并且编译后的JavaScript可以在所有主流浏览器和平台上运行，
// 而不需要等到下个JavaScript版本。

class Greeter {
  greeting: string;
  constructor(message: string) {
      this.greeting = message;
  }
  greet() {
      return "Hello, " + this.greeting;
  }
}

let greeter = new Greeter("world");


// 参数属性
// 在上面的例子中，我们必须在Octopus类里定义一个只读成员 name和一个参数为 theName的构造函数，
// 并且立刻将 theName的值赋给 name，这种情况经常会遇到。 
// 参数属性可以方便地让我们在一个地方定义并初始化一个成员。
// 下面的例子是对之前 Octopus类的修改版，使用了参数属性：

class Octopus {
  readonly numberOfLegs: number = 8;
  constructor(readonly name: string) {
  }
}

// 存取器

// 静态属性
// 到目前为止，我们只讨论了类的实例成员，那些仅当类被实例化的时候才会被初始化的属性。 
// 我们也可以创建类的静态成员，这些属性存在于类本身上面而不是类的实例上。 
// 在这个例子里，我们使用 static定义 origin，因为它是所有网格都会用到的属性。 
// 每个实例想要访问这个属性的时候，都要在 origin前面加上类名。 
// 如同在实例属性上使用 this.前缀来访问属性一样，这里我们使用 Grid.来访问静态属性。

// 抽象类
// 抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。 
// 不同于接口，抽象类可以包含成员的实现细节。 
// abstract关键字是用于定义抽象类和在抽象类内部定义抽象方法。


// 函数
// 介绍
// 函数是JavaScript应用程序的基础。 它帮助你实现抽象层，模拟类，信息隐藏和模块。 
// 在TypeScript里，虽然已经支持类，命名空间和模块，但函数仍然是主要的定义 行为的地方。 
// TypeScript为JavaScript函数添加了额外的功能，让我们可以更容易地使用。

// 和JavaScript一样，TypeScript函数可以创建有名字的函数和匿名函数。 
// 你可以随意选择适合应用程序的方式，不论是定义一系列API函数还是只使用一次的函数。


// Named function
function add(x: number, y: number = 1) {
  return x + y;
}

// Anonymous function
let myAdd = function(x: number, y: number): number { return x + y; };

// 在JavaScript里，函数可以使用函数体外部的变量。 
// 当函数这么做时，我们说它‘捕获’了这些变量。 
// 至于为什么可以这样做以及其中的利弊超出了本文的范围，但是深刻理解这个机制对学习JavaScript和TypeScript会很有帮助。

// 书写完整函数类型

let myAdd1: (baseValue: number, increment: number) => number =
    function(x: number, y: number): number { return x + y; };

// 可选参数和默认参数

// TypeScript里的每个函数参数都是必须的。 
// 这不是指不能传递 null或undefined作为参数，而是说编译器检查用户是否为每个参数都传入了值。 
// 编译器还会假设只有这些参数会被传递进函数。 简短地说，传递给一个函数的参数个数必须与函数期望的参数个数一致。

// let result1 = buildName("Bob");                  // error, too few parameters
// let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result3 = buildName("Bob", "Adams");         // ah, just right

function buildName(firstName: string, lastName?: string) {
  if (lastName)
      return firstName + " " + lastName;
  else
      return firstName;
}

// 与普通可选参数不同的是，带默认值的参数不需要放在必须参数的后面。 
// 如果带默认值的参数出现在必须参数前面，用户必须明确的传入 undefined值来获得默认值。 
// 例如，我们重写最后一个例子，让 firstName是带默认值的参数：

function buildName1(firstName = "Will", lastName: string) {
  return firstName + " " + lastName;
}

// 剩余参数
// 必要参数，默认参数和可选参数有个共同点：它们表示某一个参数。 
// 有时，你想同时操作多个参数，或者你并不知道会有多少参数传递进来。 
// 在JavaScript里，你可以使用 arguments来访问所有传入的参数。

function buildName2(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}
let employeeName = buildName2("Joseph", "Samuel", "Lucas", "MacKinzie");

let buildNameFun: (fname: string, ...rest: string[]) => string = buildName2;

// this
// 学习如何在JavaScript里正确使用this就好比一场成年礼。 
// 由于TypeScript是JavaScript的超集，TypeScript程序员也需要弄清 this工作机制并且当有bug的时候能够找出错误所在。 
// 幸运的是，TypeScript能通知你错误地使用了 this的地方。 
// 如果你想了解JavaScript里的 this是如何工作的，
// 那么首先阅读Yehuda Katz写的Understanding JavaScript Function Invocation and "this"。 
// Yehuda的文章详细的阐述了 this的内部工作原理，因此我们这里只做简单介绍。

// this和箭头函数
// JavaScript里，this的值在函数被调用的时候才会指定。 
// 这是个既强大又灵活的特点，但是你需要花点时间弄清楚函数调用的上下文是什么。 
// 但众所周知，这不是一件很简单的事，尤其是在返回一个函数或将函数当做参数传递的时候。

let deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  createCardPicker: function() {
      return function() {
          let pickedCard = Math.floor(Math.random() * 52);
          let pickedSuit = Math.floor(pickedCard / 13);

          return {suit: this.suits[pickedSuit], card: pickedCard % 13};
      }
  }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);

// 可以看到createCardPicker是个函数，并且它又返回了一个函数。 
// 如果我们尝试运行这个程序，会发现它并没有弹出对话框而是报错了。 
// 因为 createCardPicker返回的函数里的this被设置成了window而不是deck对象。 
// 因为我们只是独立的调用了 cardPicker()。 顶级的非方法式调用会将 this视为window。 
// （注意：在严格模式下， this为undefined而不是window）。

// 为了解决这个问题，我们可以在函数被返回时就绑好正确的this。 这样的话，无论之后怎么使用它，都会引用绑定的‘deck’对象。

let deck_1 = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  createCardPicker: function() {
      // NOTE: the line below is now an arrow function, allowing us to capture 'this' right here
      return () => {
          let pickedCard = Math.floor(Math.random() * 52);
          let pickedSuit = Math.floor(pickedCard / 13);

          return {suit: this.suits[pickedSuit], card: pickedCard % 13};
      }
  }
}

let cardPicker_1 = deck_1.createCardPicker();
let pickedCard_1 = cardPicker_1();

alert("card: " + pickedCard_1.card + " of " + pickedCard_1.suit);

// 更好事情是，TypeScript会警告你犯了一个错误，如果你给编译器设置了--noImplicitThis标记。 
// 它会指出 this.suits[pickedSuit]里的this的类型为any。

// this参数

// 不幸的是，this.suits[pickedSuit]的类型依旧为any。 
// 这是因为 this来自对象字面量里的函数表达式。 修改的方法是，提供一个显式的 this参数。 
// this参数是个假的参数，它出现在参数列表的最前面：

interface Card {
  suit: string;
  card: number;
}

interface Deck {
  suits: string[];
  cards: number[];
  createCardPicker(this: Deck): () => Card;
}

let deck_2: Deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  // NOTE: The function now explicitly specifies that its callee must be of type Deck
  createCardPicker: function(this: Deck) {
      return () => {
          let pickedCard = Math.floor(Math.random() * 52);
          let pickedSuit = Math.floor(pickedCard / 13);

          return {suit: this.suits[pickedSuit], card: pickedCard % 13};
      }
  }
}

// 重载
// JavaScript本身是个动态语言。 JavaScript里函数根据传入不同的参数而返回不同类型的数据是很常见的。

let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x): any {
  // Check to see if we're working with an object/array
  // if so, they gave us the deck and we'll pick the card
  if (typeof x == "object") {
      let pickedCard = Math.floor(Math.random() * x.length);
      return pickedCard;
  }
  // Otherwise just let them pick the card
  else if (typeof x == "number") {
      let pickedSuit = Math.floor(x / 13);
      return { suit: suits[pickedSuit], card: x % 13 };
  }
}

// 枚举成员使用 常量枚举表达式初始化。 
// 常数枚举表达式是TypeScript表达式的子集，它可以在编译阶段求值。 
// 当一个表达式满足下面条件之一时，它就是一个常量枚举表达式：

// 一个枚举表达式字面量（主要是字符串字面量或数字字面量）
// 一个对之前定义的常量枚举成员的引用（可以是在不同的枚举类型中定义的）
// 带括号的常量枚举表达式
// 一元运算符 +, -, ~其中之一应用在了常量枚举表达式
// 常量枚举表达式做为二元运算符 +, -, *, /, %, <<, >>, >>>, &, |, ^的操作对象。 
// 若常数枚举表达式求值后为 NaN或 Infinity，则会在编译阶段报错。

enum FileAccess {
  // constant members
  None,
  Read    = 1 << 1,
  Write   = 1 << 2,
  ReadWrite  = Read | Write,
  // computed member
  G = "123".length
}

let f = FileAccess.ReadWrite

// 运行时的枚举
// 枚举是在运行时真正存在的对象。 例如下面的枚举：

enum E {
  X, Y, Z
}

function fff(obj: { X: number }) {
  return obj.X;
}

// Works, since 'E' has a property named 'X' which is a number.
fff(E);

// 反向映射
// 除了创建一个以属性名做为对象成员的对象之外，数字枚举成员还具有了 反向映射，从枚举值到枚举名字。 例如，在下面的例子中：

enum Enum {
  A
}
let a = Enum.A;
let nameOfA = Enum[a]; // "A"


