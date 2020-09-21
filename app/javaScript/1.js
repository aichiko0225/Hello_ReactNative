// JavaScript 对象介绍

// 使用Javascript中的原型
// 在javascript中，函数可以有属性。
// 每个函数都有一个特殊的属性叫作原型（prototype） ，正如下面所展示的。
// 请注意，下面的代码是独立的一段(在网页中没有其他代码的情况下，这段代码是安全的)。
// 为了最好的学习体验，你最好打开一个控制台 (在Chrome和Firefox中，可以按Ctrl+Shift+I来打开)切换到"控制台" 选项卡, 
// 复制粘贴下面的JavaScript代码，然后按回车来运行.

// 理解原型对象
// 让我们回到 Person() 构造器的例子。请把这个例子载入浏览器。
// 如果你还没有看完上一篇文章并写好这个例子，也可以使用 oojs-class-further-exercises.html 中的例子（亦可参考源代码）。

function Person(first, last, age, gender, interests) {
  this.name = {
    first,
    last,
  }
  this.age = age
  this.gender = gender
  this.interests = interests
}

var person1 = new Person('Bob', 'Smith', 32, 'male', ['music', 'skiing'])

Person.prototype.farewell = function () {
  // eslint-disable-next-line no-alert
  alert(this.name.first + ' has left the building. Bye for now!')
}

Person.prototype.greeting = function () {
  alert("Hi! I'm " + this.name.first + '.')
}

// 定义 Teacher() 构造器函数
// 我们要做的第一件事是创建一个Teacher()构造器——将下面的代码加入到现有代码之下：

function Teacher(first, last, age, gender, interests, subject) {
  Person.call(this, first, last, age, gender, interests)

  this.subject = subject
}

// 这在很多方面看起来都和Person的构造器很像，但是这里有一些我们从没见过的奇怪玩意——call()函数。
// 基本上，这个函数允许您调用一个在这个文件里别处定义的函数。
// 第一个参数指明了在您运行这个函数时想对“this”指定的值，
// 也就是说，您可以重新指定您调用的函数里所有“this”指向的对象。
// 其他的变量指明了所有目标函数运行时接受的参数。

// 所以在这个例子里，我们很有效的在Teacher()构造函数里运行了Person()构造函数（见上文），
// 得到了和在Teacher()里定义的一样的属性，但是用的是传送给Teacher()，
// 而不是Person()的值（我们简单使用这里的this作为传给call()的this，意味着this指向Teacher()函数）。

function Brick() {
  this.width = 10
  this.height = 20
}

function BlueGlassBrick() {
  Brick.call(this)

  this.opacity = 0.5
  this.color = 'blue'
}

// 设置 Teacher() 的原型和构造器引用
// 到目前为止一切看起来都还行，但是我们遇到问题了。
// 我们已经定义了一个新的构造器，这个构造器默认有一个空的原型属性。
// 我们需要让Teacher()从Person()的原型对象里继承方法。我们要怎么做呢？

Teacher.prototype = Object.create(Person.prototype)

// 这里我们的老朋友create()又来帮忙了
// ——在这个例子里我们用这个函数来创建一个和Person.prototype一样的新的原型属性值（这个属性指向一个包括属性和方法的对象），
// 然后将其作为Teacher.prototype的属性值。这意味着Teacher.prototype现在会继承Person.prototype的所有属性和方法。

// 接下来，在我们动工之前，还需要完成一件事 — 现在Teacher()的prototype的constructor属性指向的是Person(),
// 这是由我们生成Teacher()的方式决定的。
// (这篇 Stack Overflow post 文章会告诉您详细的原理)
//  — 将您写的页面在浏览器中打开，进入JavaScript控制台，输入以下代码来确认：

Teacher.prototype.constructor

// 这或许会成为很大的问题，所以我们需要将其正确设置——您可以回到源代码，在底下加上这一行代码来解决：
Teacher.prototype.constructor = Teacher

// 当您保存并刷新页面以后，输入Teacher.prototype.constructor就会得到Teacher()。

// 每一个函数对象（Function）都有一个prototype属性，并且只有函数对象有prototype属性，
// 因为prototype本身就是定义在Function对象下的属性。
// 当我们输入类似var person1=new Person(...)来构造对象时，JavaScript实际上参考的是Person.prototype指向的对象来生成person1。
// 另一方面，Person()函数是Person.prototype的构造函数，也就是说Person===Person.prototype.constructor（不信的话可以试试）。

// 在定义新的构造函数Teacher时，我们通过function.call来调用父类的构造函数，但是这样无法自动指定Teacher.prototype的值，
// 这样Teacher.prototype就只能包含在构造函数里构造的属性，而没有方法。
// 因此我们利用Object.create()方法将Person.prototype作为Teacher.prototype的原型对象，并改变其构造器指向，使之与Teacher关联。

Teacher.prototype.greeting = function () {
  var prefix

  if (
    this.gender === 'male' ||
    this.gender === 'Male' ||
    this.gender === 'm' ||
    this.gender === 'M'
  ) {
    prefix = 'Mr.'
  } else if (
    this.gender === 'female' ||
    this.gender === 'Female' ||
    this.gender === 'f' ||
    this.gender === 'F'
  ) {
    prefix = 'Mrs.'
  } else {
    prefix = 'Mx.'
  }

  // eslint-disable-next-line no-alert
  alert(
    'Hello. My name is ' +
      prefix +
      ' ' +
      this.name.last +
      ', and I teach ' +
      this.subject +
      '.',
  )
}
