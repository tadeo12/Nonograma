:- module(proylcc,
	[  
		put/8
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
% put(+Contenido, +Pos, +PistasFilas, +PistasColumnas, +Grilla, -GrillaRes, -FilaSat, -ColSat).
% FilaSat indica si la fila satisface las Pistas y ColSat indica si la columna satisface las Pistas 


put(Contenido, [RowN, ColN], PistasFilas, PistasColumnas, Grilla, NewGrilla, FilaSat, ColSat):-
	% NewGrilla es el resultado de reemplazar la fila Row en la posición RowN de Grilla
	% (RowN-ésima fila de Grilla), por una fila nueva NewRow.
	
	replace(Row, RowN, NewRow, Grilla, NewGrilla),

	% NewRow es el resultado de reemplazar la celda Cell en la posición ColN de Row por _,
	% siempre yy cuando Cell coincida con Contenido (Cell se instancia en la llamada al replace/5).
	% En caso contrario (;)
	% NewRow es el resultado de reemplazar lo que se que haya (_Cell) en la posición ColN de Row por Conenido.	 
	
	(replace(Cell, ColN, _, Row, NewRow),
	Cell == Contenido 
		;
	replace(_Cell, ColN, Contenido, Row, NewRow)).
	/*
	satisface(PistasFilas,RowN,NewRow,FilaSat),

	% se obtiene la columna en forma de lista
	hacerColumna(NewGrilla,ColN,Col),
	
	satisface(PistasColumnas,ColN,Col,ColSat).*/
hacerColumna(Xs,ColN,Col):- longitud(Xs,NumFilas), hacerColumnaAux(Xs,NumFilas,ColN,Col).

hacerColumnaAux([Xs],1,ColN,[Element]):-getElement(Xs,ColN,Element).
hacerColumnaAux([X|Xs],N,ColN,[Y|Ys]):-getElement(X,ColN,Y),
	N1 is N-1,hacerColumnaAux(Xs,N1,ColN,Ys).

getElement([X],0,X).
getElement([_X|Xs],N,E):- N1 is N-1, getElement(Xs,N1,E).

longitud([],0).
longitud([_X|Xs],N):- longitud(Xs,LXs), N is LXs + 1.

