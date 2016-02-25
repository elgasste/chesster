'use strict';

(function(angular) {

    var chessterConstants = {
        STARTING_POSITION_FEN: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',

        fenErrors: {
            FEN_SECTIONS_INCORRECT: 'The FEN string has missing or extra sections',
            FEN_RANKS_INCORRECT: 'The FEN string has an incorrect number of ranks',
            FEN_PIECES_INCORRECT: 'The FEN string has a bad pieces value',
            FEN_ACTIVE_INCORRECT: 'The FEN string has a bad value for active piece',
            FEN_CASTLING_INCORRECT: 'The FEN string has a bad value for castling availability',
            FEN_PASSANT_INCORRECT: 'The FEN string has a bad value for en passant square',
            FEN_HALFMOVE_INCORRECT: 'Then FEN string has a bad value for halfmove clock',
            FEN_FULLMOVE_INCORRECT: 'Then FEN string has a bad value for fullmove clock'
        },

        viewErrors: {
            PIECES_STRING_INCORRECT: 'The position contains an invalid pieces string'
        },

        rulesetErrors: {
            STANDARD_INVALID_MOVE: 'Invalid move attempt'
        },

        messageCodes: {
            SESSION_POSITION_CHANGED: 100,
            SESSION_SQUARE_ACTIVATED: 101,
            SESSION_SQUARES_DEACTIVATED: 102,
        }
    };

    angular.module('chesster.common').value('constants', chessterConstants);

})(angular);