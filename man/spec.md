# Dusty 8 Virtual Machine

## The Goal

A transparent virtual machine to demonstrate
how VMs works under the hood.

## Memory Model

The memory is delivered in a single capsule.

A capsule is divided on segments 64 values each.
It can be represented in 8x8 grid of values.

Segments and memory cells have type flags
to hint how to show the data inside
(e.g. number, char, segment, address, pixel).

## CPU

Dusty 8 RE - a register-based VM
Dusty 8 SE - a stack-based VM

## Registers

A & B - for ops
I - for indexing
C - command pointer
S - stack pointer
R - call stack pointer

CS - command segment
SS - stack segment
RS - return segment

## Addressing

[segment #][6-bit in-segment shift]

Segments can be addressed individually by #.

Each subroutine occupies it's own segment.



## Ops
Regular set of ops are supported.
* Math, bitwise and logic operations.
* Comparison ops
* Register manipulation
* Stack manipulation (POPA, PUSHA)
* Memory load and store ops.
* Branching

