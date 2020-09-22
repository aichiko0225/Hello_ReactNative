// 模块
// 关于术语的一点说明: 请务必注意一点，TypeScript 1.5里术语名已经发生了变化。 
// “内部模块”现在称做“命名空间”。 “外部模块”现在则简称为“模块”，
// 这是为了与 ECMAScript 2015里的术语保持一致，(也就是说 module X { 相当于现在推荐的写法 namespace X {)。

// 从ECMAScript 2015开始，JavaScript引入了模块的概念。TypeScript也沿用这个概念。

// 模块在其自身的作用域里执行，而不是在全局作用域里；
// 这意味着定义在一个模块里的变量，函数，类等等在模块外部是不可见的，除非你明确地使用export形式之一导出它们。 
// 相反，如果想使用其它模块导出的变量，函数，类，接口等的时候，你必须要导入它们，可以使用 import形式之一。

// 模块是自声明的；两个模块之间的关系是通过在文件级别上使用imports和exports建立的。

// 模块使用模块加载器去导入其它的模块。 在运行时，模块加载器的作用是在执行此模块代码前去查找并执行这个模块的所有依赖。 
// 大家最熟知的JavaScript模块加载器是服务于Node.js的 CommonJS和服务于Web应用的Require.js。

// TypeScript与ECMAScript 2015一样，任何包含顶级import或者export的文件都被当成一个模块。
// 相反地，如果一个文件不带有顶级的import或者export声明，那么它的内容被视为全局可见的（因此对模块也是可见的）。

// 导出声明
// 任何声明（比如变量，函数，类，类型别名或接口）都能够通过添加export关键字来导出。

export interface StringValidator {
  isAcceptable(s: string): boolean;
}

export const numberRegexp = /^[0-9]+$/;

export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
        return s.length === 5 && numberRegexp.test(s);
    }
}

// 或者一个模块可以包裹多个模块，并把他们导出的内容联合在一起通过语法：export * from "module"。

// 导入
// 模块的导入操作与导出一样简单。 可以使用以下 import形式之一来导入其它模块中的导出内容。

// 导入一个模块中的某个导出内容

// import { ZipCodeValidator } from "./ZipCodeValidator";
// let myValidator = new ZipCodeValidator();

// import { ZipCodeValidator as ZCV } from "./ZipCodeValidator";
// let myValidator = new ZCV();

// 将整个模块导入到一个变量，并通过它来访问模块的导出部分

// import * as validator from "./ZipCodeValidator";
// let myValidator = new validator.ZipCodeValidator();

// 默认导出

// 每个模块都可以有一个default导出。 默认导出使用 default关键字标记；并且一个模块只能够有一个default导出。
// 需要使用一种特殊的导入形式来导入 default导出。

// default导出十分便利。 比如，像JQuery这样的类库可能有一个默认导出 jQuery或$，
// 并且我们基本上也会使用同样的名字jQuery或$导出JQuery。

// =========================================


// export = 和 import = require()
// CommonJS和AMD的环境里都有一个exports变量，这个变量包含了一个模块的所有导出内容。

// CommonJS和AMD的exports都可以被赋值为一个对象, 这种情况下其作用就类似于 es6 语法里的默认导出，即 export default语法了。
// 虽然作用相似，但是 export default 语法并不能兼容CommonJS和AMD的exports。

// 为了支持CommonJS和AMD的exports, TypeScript提供了export =语法。
// export =语法定义一个模块的导出对象。 这里的对象一词指的是类，接口，命名空间，函数或枚举。

// 若使用export =导出一个模块，则必须使用TypeScript的特定语法import module = require("module")来导入此模块。


let numberRegexp_1 = /^[0-9]+$/;
class ZipCodeValidator_1 {
    isAcceptable(s: string) {
        return s.length === 5 && numberRegexp.test(s);
    }
}
// export = ZipCodeValidator_1;

// 使用其它的JavaScript库
// 在Node.js里大部分工作是通过加载一个或多个模块实现的。 
// 我们可以使用顶级的 export声明来为每个模块都定义一个.d.ts文件，但最好还是写在一个大的.d.ts文件里。 
// 我们使用与构造一个外部命名空间相似的方法，但是这里使用 module关键字并且把名字用引号括起来，方便之后import。

// 创建模块结构指导

// 尽可能地在顶层导出
// 用户应该更容易地使用你模块导出的内容。 嵌套层次过多会变得难以处理，因此仔细考虑一下如何组织你的代码。

// 从你的模块中导出一个命名空间就是一个增加嵌套的例子。 
// 虽然命名空间有时候有它们的用处，在使用模块的时候它们额外地增加了一层。 这对用户来说是很不便的并且通常是多余的。

// 导出类的静态方法也有同样的问题 - 这个类本身就增加了一层嵌套。 除非它能方便表述或便于清晰使用，否则请考虑直接导出一个辅助方法。

// 模块里不要使用命名空间
// 当初次进入基于模块的开发模式时，可能总会控制不住要将导出包裹在一个命名空间里。 
// 模块具有其自己的作用域，并且只有导出的声明才会在模块外部可见。 记住这点，命名空间在使用模块时几乎没什么价值。

// 在组织方面，命名空间对于在全局作用域内对逻辑上相关的对象和类型进行分组是很便利的。 
// 例如，在C#里，你会从 System.Collections里找到所有集合的类型。 
// 通过将类型有层次地组织在命名空间里，可以方便用户找到与使用那些类型。 
// 然而，模块本身已经存在于文件系统之中，这是必须的。 
// 我们必须通过路径和文件名找到它们，这已经提供了一种逻辑上的组织形式。 
// 我们可以创建 /collections/generic/文件夹，把相应模块放在这里面。

// 命名空间对解决全局作用域里命名冲突来说是很重要的。 
// 比如，你可以有一个 My.Application.Customer.AddForm和My.Application.Order.AddForm 
// -- 两个类型的名字相同，但命名空间不同。 然而，这对于模块来说却不是一个问题。 
// 在一个模块里，没有理由两个对象拥有同一个名字。 
// 从模块的使用角度来说，使用者会挑出他们用来引用模块的名字，所以也没有理由发生重名的情况。


// ---------------------------

// 命名空间
// 这篇文章描述了如何在TypeScript里使用命名空间（之前叫做“内部模块”）来组织你的代码。 
// 就像我们在术语说明里提到的那样，“内部模块”现在叫做“命名空间”。 
// 另外，任何使用 module关键字来声明一个内部模块的地方都应该使用namespace关键字来替换。 
// 这就避免了让新的使用者被相似的名称所迷惑。

// 随着更多验证器的加入，我们需要一种手段来组织代码，以便于在记录它们类型的同时还不用担心与其它对象产生命名冲突。 
// 因此，我们把验证器包裹到一个命名空间内，而不是把它们放在全局命名空间下。

// 下面的例子里，把所有与验证器相关的类型都放到一个叫做Validation的命名空间里。 
// 因为我们想让这些接口和类在命名空间之外也是可访问的，所以需要使用 export。 
// 相反的，变量 lettersRegexp和numberRegexp是实现的细节，不需要导出，因此它们在命名空间外是不能访问的。 
// 在文件末尾的测试代码里，由于是在命名空间之外访问，因此需要限定类型的名称，比如 Validation.LettersOnlyValidator。

namespace Validation {
  export interface StringValidator {
      isAcceptable(s: string): boolean;
  }

  const lettersRegexp = /^[A-Za-z]+$/;
  const numberRegexp = /^[0-9]+$/;

  export class LettersOnlyValidator implements StringValidator {
      isAcceptable(s: string) {
          return lettersRegexp.test(s);
      }
  }

  export class ZipCodeValidator implements StringValidator {
      isAcceptable(s: string) {
          return s.length === 5 && numberRegexp.test(s);
      }
  }
}

// Some samples to try
let strings = ["Hello", "98052", "101"];

// Validators to use
let validators: { [s: string]: Validation.StringValidator; } = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();

// Show whether each string passed each validator
for (let s of strings) {
    for (let name in validators) {
        console.log(`"${ s }" - ${ validators[name].isAcceptable(s) ? "matches" : "does not match" } ${ name }`);
    }
}

