---
title: Test
date: "2023-06-22"
author: Gertjan Assies
summary: This is a test
tags: test
category: QA
image: ""

---

### Table

| A | B | C |
| -- | -- | -- |
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

### Code

```elixir
defmodule Fib do 
  def fib(0) do 0 end
  def fib(1) do 1 end
  def fib(n) do fib(n-1) + fib(n-2) end
end

IO.puts Fib.fib(10)
```
