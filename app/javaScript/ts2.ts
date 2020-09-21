// 变量声明
// let和const是JavaScript里相对较新的变量声明方式。 
// 像我们之前提到过的， let在很多方面与var是相似的，但是可以帮助大家避免在JavaScript里常见一些问题。 
// const是对let的一个增强，它能阻止对一个变量再次赋值。

// 因为TypeScript是JavaScript的超集，所以它本身就支持let和const。 
// 下面我们会详细说明这些新的声明方式以及为什么推荐使用它们来代替 var。

// 如果你之前使用JavaScript时没有特别在意，那么这节内容会唤起你的回忆。
// 如果你已经对 var声明的怪异之处了如指掌，那么你可以轻松地略过这节。

// let 声明
// 块作用域
// 当用let声明一个变量，它使用的是词法作用域或块作用域。 
// 不同于使用 var声明的变量那样可以在包含它们的函数外访问，块作用域变量在包含它们的块或for循环之外是不能访问的。

function f(input: boolean) {
  let a = 100;

  if (input) {
      // Still okay to reference 'a'
      let b = a + 1;
      return b;
  }

  // Error: 'b' doesn't exist here
  // return b;
}

function foo() {
  // okay to capture 'a'
  return a;
}

// 不能在'a'被声明前调用'foo'
// 运行时应该抛出错误
foo();

let a;

// 块级作用域变量的获取
// 在我们最初谈及获取用var声明的变量时，我们简略地探究了一下在获取到了变量之后它的行为是怎样的。 
// 直观地讲，每次进入一个作用域时，它创建了一个变量的 环境。 
// 就算作用域内代码已经执行完毕，这个环境与其捕获的变量依然存在。

function theCityThatAlwaysSleeps() {
  let getCity;

  if (true) {
      let city = "Seattle";
      getCity = function() {
          return city;
      }
  }

  return getCity();
}

// 因为我们已经在city的环境里获取到了city，所以就算if语句执行结束后我们仍然可以访问它。

// 回想一下前面setTimeout的例子，我们最后需要使用立即执行的函数表达式来获取每次for循环迭代里的状态。 
// 实际上，我们做的是为获取到的变量创建了一个新的变量环境。 
// 这样做挺痛苦的，但是幸运的是，你不必在TypeScript里这样做了。

// const 声明
// const 声明是声明变量的另一种方式。

// 它们与let声明相似，但是就像它的名字所表达的，它们被赋值后不能再改变。 
// 换句话说，它们拥有与 let相同的作用域规则，但是不能对它们重新赋值。

const numLivesForCat = 9;
const kitty = {
    name: "Aurora",
    numLives: numLivesForCat,
}

// Error
// kitty = {
//     name: "Danielle",
//     numLives: numLivesForCat
// };

// all "okay"
kitty.name = "Rory";
kitty.name = "Kitty";
kitty.name = "Cat";
kitty.numLives--;

// 除非你使用特殊的方法去避免，实际上const变量的内部状态是可修改的。 
// 幸运的是，TypeScript允许你将对象的成员设置成只读的。 接口一章有详细说明。


// 解构

// 解构数组
// 最简单的解构莫过于数组的解构赋值了：

let input = [1, 2];
let [first, second] = input;
console.log(first); // outputs 1
console.log(second); // outputs 2

// 对象解构
// 你也可以解构对象：
let o = {
  a1: "foo",
  b: 12,
  c: "bar"
};
// let { a1, b } = o;

let { a1, ...passthrough } = o;
let total = passthrough.b + passthrough.c.length;