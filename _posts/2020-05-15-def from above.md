---
layout: post
title: "def from above"
excerpt: How do you do relative imports in python??
---

How do you do relative imports in python?? This is a problem beginners are always troubled by, and one I puzzled over for far too long. The answers on sites like stackoverflow are rubbish, so I thought I'd lay out a quick, beginner-friendly explanation of how to import a function from a file above the current directory in python.

## The problem

I have a set of files in a structure like this:

```
my_project
├── a.py
├── main.py
└── src
    ├── __init__.py
    └── b.py
```

which I run with the command `python main.py`.

## The common mistake

Let's illustrate the example more completely.

`a.py` looks like this:

```python
def function_a():
    return "hello world"
```

`b.py` looks like this:

```python
from ..a import function_a

def function_b():
    return function_a()
```

and `main.py` looks like this:

```python
from src.b import function_b

output = function_b()
print(output)
```

When we run `python main.py` from the command line, we hope that `"hello world"` gets printed to the console, but instead we get the error message:

```
ValueError: attempted relative import beyond top-level package
```

Aaaaargh! Why is python so dumb?? Why can't I just use the code I've written? Am I going to have to restructure my entire project to satisfy the relative import gods?

## The solution

The fix is simple, and easy to remember once you know it.

Python beginners are taught to stick that weird, blank `__init__.py` file in every directory they create, but never taught what it's for. Spoiler alert: it's for exactly this.

`__init__.py` acts as an interface between the code in its directory and the directory's neighbouring files. If the directory's called `src`, `__init__.py` effectively acts like `src.py`.

A lot of people use `__init__.py` to import all the useful functionality in `src`, making it possible to write stuff like `from src import something_useful`, without specifying that `something_useful()` comes from `src.b` instead of a file called `src`.

`__init__.py` also allows you to import from a directory's neighbouring files within that directory, making that functionality available to all the files within the directory.

## OK, how do we fix the example?

`a.py` doesn't change:

```python
def function_a():
    return "hello world"
```

We add a single line to `__init__.py`, importing `function_a()` from `a.py`

```python
from a import function_a
```

`b.py` now looks like this, because it's importing `function_a()` from `__init__.py`:

```python
from . import function_a

def function_b():
    return function_a()
```

and `main.py` still looks like this:

```python
from src.b import function_b

output = function_b()
print(output)
```

That's it! Two lines changed and we've got relative imports working in python.

Now, when we run `python main.py`, we get

```
hello world
```

Hooray!
