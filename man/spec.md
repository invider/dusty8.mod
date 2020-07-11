# Dusty 8 Virtual Machine

## The Goal

A transparent virtual machine demonstrator
how VMs works under the hood.

## Core Design Principle
* fully transparent - observe memory, cpu and devices state
* typed data to show not just a HEX wall
* swappable cpu and devices for various use cases

## Core Design Questions
* what is the proper addressing model?


## Memory Model

The memory is delivered in a single capsule.

A capsule is divided on segments 64 values each.
It can be represented as 8x8 grid with values
in each cell.

Segments and memory cells have type flags
to hint how to show the data inside
(e.g. number, char, segment/address, pixel,
palette element).

Memory monitor should be able to show
several segments.
A monitor window can be pinned
to a particular segment - current code,
data, target, stack or particular #.


## CPU

Dusty 8 RE - a register-based VM
Dusty 8 SE - a stack-based VM

## Registers

#### general-purpose registers
A - accumulator
B - opperand
X - indexing register

#### pointer registers - shift within a segment
C - command pointer
T - data stack pointer
R - call stack pointer

#### segment registers
CS - command segment
DS - data segment
TS - data stack segment
RS - call stack segment

#### special control registers
Q - frequency setter
Y - cycles counter


## Addressing

[segment #][6-bit in-segment shift]?
[segment #][0-100 in-segment shift]?

Segments can be addressed individually by #.

Each subroutine occupies it's own segment.


## Ops
Regular set of ops are supported.
* Math
* Bitwise logic operations.
* Comparison ops
* Register manipulation
* Stack manipulation
* Memory load and store ops.
* Branching

## Mnemonics

#### special
NOP - do nothing
HALT - stop execution
WAIT - wait for external interrupt

#### memory
POP  - pop value to A
PEEK - peek a value at TS:T + X -> A
PUSH - push A on stack
POPR - pop A value from call stack
PUSHR - push A value to call stack
LDA - load A from data segment @X
LDB - load B from data segment @X
STA - store A to data segment @X
STB - store B to data segment @X
AT  - load value at A:X
SET - set value at A:X to B
MOV A -> B, X, T, R, DS, TS, RS, Q, Y
MOV A <- B, X, T, R, DS, TS, RS, Q, Y
MOV B -> X
MOV X -> B

#### branching
JMP  - unconditional jump at X
JZ   - jump X if zero
JNZ  - jump X if not zero
CALL - call a segment
RET  - return

#### math
ADD
SUB
MUL
DIV
MOD
NEG
ABS
INC
DEC

#### bitwise
OR
AND
NOT
XOR
SHL - logical left shift
SHR - logical right shift
SAR - arithmetical right shift, fill 1s or 0s on left

#### comparison
ZERO
EQ
NEQ
LT
LTQ
GT
GTQ
LTZ
GTZ

