'use strict';

(function(angular) {

    var errorStrings = {
        FEN_SECTIONS_INCORRECT: 'The FEN string has missing or extra sections',
        FEN_RANKS_INCORRECT: 'The FEN string has an incorrect number of ranks',
        FEN_PIECES_INCORRECT: 'The FEN string has a bad pieces value',
        FEN_ACTIVE_INCORRECT: 'The FEN string has a bad value for active piece',
        FEN_CASTLING_INCORRECT: 'The FEN string has a bad value for castling availability',
        FEN_PASSANT_INCORRECT: 'The FEN string has a bad value for en passant square',
        FEN_HALFMOVE_INCORRECT: 'Then FEN string has a bad value for halfmove clock',
        FEN_FULLMOVE_INCORRECT: 'Then FEN string has a bad value for fullmove clock'
    };

    angular.module('chesster.engine').value('errorStrings', errorStrings);

})(angular);