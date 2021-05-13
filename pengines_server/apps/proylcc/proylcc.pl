:- module(proylcc,
	[  
		put/8, satisface/2
		
	]).

:-use_module(library(lists)).
 

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%
% replace(?X, +XIndex, +Y, +Xs, -XsY)
%
% XsY es el resultado de reemplazar la ocurrencia de X en la posición XIndex de Xs por Y.

replace(X, 0, Y, [X|Xs], [Y|Xs]).

replace(X, XIndex, Y, [Xi|Xs], [Xi|XsY]):-
    XIndex > 0,
    XIndexS is XIndex - 1,
    replace(X, XIndexS, Y, Xs, XsY).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%
% put(+Contenido, +Pos, +PistasFilas, +PistasColumnas, +Grilla, -NewGrilla, -FilaSat, -ColSat).
% FilaSat indica si la fila satisface las Pistas y ColSat indica si la columna satisface las Pistas 


put(Contenido, [RowN, ColN], PistasFilas, PistasColumnas, Grilla, NewGrilla, FilaSat, ColSat):-
	% NewGrilla es el resultado de reemplazar la fila Row en la posición RowN de Grilla
	% (RowN-ésima fila de Grilla), por una fila nueva NewRow.
	
	replace(Row, RowN, NewRow, Grilla, NewGrilla),

	% NewRow es el resultado de reemplazar la celda Cell en la posición ColN de Row por _,
	% siempre y cuando Cell coincida con Contenido (Cell se instancia en la llamada al replace/5).
	% En caso contrario (;)
	% NewRow es el resultado de reemplazar lo que se que haya (_Cell) en la posición ColN de Row por Conenido.	 
	
	(replace(Cell, ColN, _ , Row, NewRow), Cell == Contenido ; replace(_Cell, ColN, Contenido, Row, NewRow) ),
	
	getElement(PistasFilas,RowN,PistasFila),
	(FilaSat is 1 ,satisface(PistasFila,NewRow);FilaSat is 0),

	% se obtiene la columna en forma de lista
	getColumn(NewGrilla,ColN,Col),
	
	getElement(PistasColumnas,ColN,PistasColumna),
	(ColSat is 1, satisface(PistasColumna,Col); ColSat is 0).
%

% hacerColumna(+Xs,+ColN,-Col) 

getColumn([],_ColN,[]).
getColumn([FilaActual|Filas],ColN,[Y|Ys]):-getElement(FilaActual,ColN,Y),getColumn(Filas,ColN,Ys).

getElement([X|_Xs],0,X).
getElement([_X|Xs],N,E):- N1 is N-1, getElement(Xs,N1,E).

%satisface(+Lista de Pistas, +Linea)
satisface([],[]).
satisface([N|Xs],[X|Ys]):-not(var(X)), X="#", N1 is N -1, satisfacePista(N1,Ys,Zs),satisface(Xs,Zs).
satisface(Xs,[X|Ys]):-(var(X);X="X"),satisface(Xs,Ys).

%satisfacePista(+ValorPista,+Linea,-RestoLinea) retorna la parte de la linea que quedo sin
%recorrer luego de verificar la pista
satisfacePista(0,[],[]).
satisfacePista(0,[X|Xs],Xs):-var(X) ; X="X".%si llego a 0 la pista, la siguiente celda tendra que ser una variable o una x

satisfacePista(N,[X|Xs],Res):- not(var(X)), X="#", N1 is N-1, satisfacePista(N1, Xs,Res).







