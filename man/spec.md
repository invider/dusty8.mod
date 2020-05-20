# Dusty 8 Virtual Machine

## The Goal

We need a totally transparent virtual machine
to demonstrate how stuff works.

## Memory Model
The memory is delivered in a single capsule.
A capsule is divided on segments 64 values each.
It can be shown as a 8x8 grid with values.
Segments and memory cells have type flags
to hint how to show the data inside
(e.g. number, char, segment, address, pixel).

## Addressing

[segment #][6-bit in-segment shift]

Segments can be addressed individually by #.

Each subroutine occupies it's own segment.

## Registers

## Ops
Regular set of ops are supported.
* Math, bitwise and logic operations.
* Comparison ops
* Memory load and store ops.
* Branching


