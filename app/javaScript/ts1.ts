// function greeter(person: String) {
//   return "Hello, " + person;
// }

// let user = "Jane User";

// document.body.innerHTML = greeter(user);

interface Person {
  firstName: string;
  lastName: string;
}

// 类
// 最后，让我们使用类来改写这个例子。 TypeScript支持JavaScript的新特性，比如支持基于类的面向对象编程。

// 让我们创建一个Student类，它带有一个构造函数和一些公共字段。 注意类和接口可以一起共作，程序员可以自行决定抽象的级别。
// 还要注意的是，在构造函数的参数上使用public等同于创建了同名的成员变量。

class Student {
  fullName: string;
  constructor(public firstName: string, public middleInitial: string, public lastName: string) {
      this.fullName = firstName + " " + middleInitial + " " + lastName;
  }
}

function greeter(person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");
let tname: string = `Gene`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ tname }.

I'll be ${ age + 1 } years old next month.`;

// 数组

// TypeScript像JavaScript一样可以操作数组元素。 有两种方式可以定义数组。 
// 第一种，可以在元素类型后面接上 []，表示由此类型元素组成的一个数组：

let list1: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];

// 元组 Tuple
// 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。 
// 比如，你可以定义一对值分别为 string和number类型的元组。

// Declare a tuple type
let x1: [string, number];
// Initialize it
x1 = ['hello', 10]; // OK
// Initialize it incorrectly
// x1 = [10, 'hello']; // Error

// 枚举
// enum类型是对JavaScript标准数据类型的一个补充。 像C#等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字。

enum Color {Red, Green, Blue}
let c: Color = Color.Green;

// Never
// never类型表示的是那些永不存在的值的类型。
//  例如， never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 
// 变量也可能是 never类型，当它们被永不为真的类型保护所约束时。

// never类型是任何类型的子类型，也可以赋值给任何类型；
// 然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。
// 即使 any也不可以赋值给never。

// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
  return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
  while (true) {
  }
}

// Object
// object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。

// 使用object类型，就可以更好的表示像Object.create这样的API。例如：

declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK

// create(42); // Error
// create("string"); // Error
// create(false); // Error
create(undefined); // Error

// 类型断言
// 有时候你会遇到这样的情况，你会比TypeScript更了解某个值的详细信息。 通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。

// 通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。
// 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 
// 它没有运行时的影响，只是在编译阶段起作用。 TypeScript会假设你，程序员，已经进行了必须的检查。

let someValue: any = "this is a string";

let strLength1: number = (<string>someValue).length;
// 另一个为as语法：
let strLength2: number = (someValue as string).length;

// 关于let
// 你可能已经注意到了，我们使用let关键字来代替大家所熟悉的JavaScript关键字var。 
// let关键字是JavaScript的一个新概念，TypeScript实现了它。 
// 我们会在以后详细介绍它，很多常见的问题都可以通过使用 let来解决，所以尽可能地使用let来代替var吧。

