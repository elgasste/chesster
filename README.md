# Chesster!

## Specs

### Overview

#### Piece Representation

The pieces in any position are represented by a 64-character string with the following codes:

*   K: King
*   Q: Queen
*   R: Rook
*   B: Bishop
*   N: Knight
*   P: Pawn
*   -: Empty Square

*Note that upper-case characters are white pieces, and lower-case characters are black pieces*

Each character in the string represents one square on the board, starting on the upper-left (a8) and ending on the bottom-right (h1).
For example, the starting position in a standard game will result in the following string:

rnbqkbnrpppppppp--------------------------------PPPPPPPPRNBQKBNR

### Objects

#### Position

*For keeping track of any given board position, including any information that can be retrieved from a FEN string.*

*   pieces (string): 64-character string representing each piece on the board, with '-' for empty squares.
*   active (string): whose turn it is, either 'w' or 'b'.
*   castling (string): castling ability, any combination of 'KQkq', or '-' for none.
*   passant (string): algebraic notation for en passant square, or '-' for none.
*   halfmove (int): half move counter
*   fullmove (int): full move counter
