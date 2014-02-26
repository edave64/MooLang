#MooLang
[![Build Status](https://travis-ci.org/edave64/MooLang.png?branch=master)](https://travis-ci.org/edave64/MooLang)
MooLang(Minimal Object-Oriented Language) is a dynamic programming language. It is
build to be an extremly light and flexible, with an extensive, Ruby-like, API.

##Hello World
Every language has to go througt this, so, here it is.

    cio.out "Hello World"

Neat.

##Language Basics
MooLangs object system is build on the concept of prototypial inheritance.
It was chosen because it is much lighter than the classical, class-based approach,
but provides has everything needed.

Another concept of MooLang are closures, as it is also a very light, logical and
powerful one.

Another concept, that was inspired by Haskell is currying. Every method in Moo is
automatically curryable.

##Original concepts
The most unusual concept in MooLang is the scope-object. It helps reduce the logical
complexity of Moo by explaning scoping as a consequence of prototypial inheritance.
Every time you create a scope, (with the beginning of every function) you create a
scope-object that carries around your variables. When a scope-object is created, it
inherits from the parent-scope. One consequence of that is that you can introduce
variables not only in the local or global scope, but also in every scope in between.

This scope-object also reduces closures to objects and anonymous methods, as
a method, on creation, gets a scope-attribute, which contains its parents
scope-object. This also has the effect that you can change the scope of closures
after their creation.

##Language Philosophy
Moo is build with a few main goals. The first is that the language should be as
light as possible, without looking ugly or hindering the programmer. The secound
is that it to be unambiguous. Unlike many other languages, no syntax operator in
moo has more than one meaning.

##History
Originally, moo was build to be a more visually pleasing javascript. Later,
the syntax was changed to make it more lisp-like, while keeping the parenthesis low.
At last, Haskell provided the currying concept. Thus, MooLang was born.

#Syntax
##Method calls
Method calls are the first kind of expression in MooLang. They are written like this:

    methodName argument1 argument2 argument3

The newlines automatically end the expression. Eg.:

    cio.out "Hello World"

calls the method `out` from the `cio`-Object (cio stands for console In/Out) with
one string parameter.

##Assignment
The other kind of expression is the assignment. They are written like this:

    variableName: variableContent

This syntax assigns `variableContent` to `variableName`. To access your variables,
you just write their name. Eg:

    a: "Hello World"
    cio.out a

##Methods
You can define your own methods by using the `do` and `end` keyword. They're are
witten like this:

    do argument1 argument2
      expression1
      expression2
    end

To access you method later, you can assign it to a variable:

    methodName: do
      ...
    end

When called, your method returns the value of its last expression.

### Currying and partial application
All methods in MooLang can only take one or none parameter. If you write multiple
parameters, like:

    do argument1 argument2
      expression1
      expression2
    end

MooLang automatically translates this to:

    do argument1
      val do argument2
          expression1
          expression2
      end
    end

This provides you with the power of paritial application. This means that you
can pass a method the first arguments, store the returned method, and call it later
to pass in the rest. Eg.:

    more: 3 +

    more 4 # returns 7

##Objects
> this syntax is not yet implemented in js-transpiler in this project

Objects in moo are defined using braces. (`{` and `}`) You can write normal mooLang
code in between. The defined variables are than exported as the object.

    {
        attributeName: attributeValue
    }

Just like with methods, objects can be assigned to variables

##Object access
There are multiple ways to access the attributes of an object.

###Dot-access
The dot-access is the most simple one. It is written like this:

    object.attributeName

This returns the value of `attributeName` inside `object`. It can also be used
at the left hand side of an assignment.

    object.attributeName : 'asd

###Dollar-access
The dollar access is a shorthand syntax for getting a method and calling it on
the object. This is needed so the method knows which object it was called upon.

    object$method

is therefore synonymous with:

    object.method object

##Bracket-access
> this syntax is not yet implemented in js-transpiler in this project

Bracket access is used to access an attribute which name is not known at
compiletime.

    object['Attributename]

The value between the brackets must be a string.

##Dollar-Bracket-access
> this syntax is not yet implemented in js-transpiler in this project

This is just a combination of dollar and bracket access:

    object$['method]

is synonymous with:

    object['method] object

##Operators
In MooLang, every combination of non-character, non-numeric and non-syntax
characters is an operator. Like the dollar access, they automatically pass
the object as the first parameter.

    3 + 4

is therefore equivalent to

    3.+ 3 4

One thing that is important is that MooLang, due to the generic nature of its
operators and currying, does not have operator precedence. You have to manually group them with
parenthesis.

#Strings
There are two ways to define a string in MooLang:

###Double-Quote
To define a normal string you must enclose it in double quotes.

    "Hallo Welt!"

You can write everything you want between these quotes. Moo uses the `\`-Character
for escaping.

###Single-Quote
If your String does not contain any spaces, operator characters or syntax
characters, you can use the single-quote syntax to define your string:

    'asd

Every non-alphabetic character automatically closes the string.

##Numbers
Integers in MooLang are written as plain numbers, eg.:

    123

### Floats
MooLang does not yet have a way to define floating point numbers. The problem is
that the `.` symbol is already taken. To create a floating point number,
you have to do something like this:

    123 / 100

