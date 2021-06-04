:- module(proylcc,
	[  
		put/8, controlInicial/5
		
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
	(FilaSat is 1 ,satisface(PistasFila,NewRow); FilaSat is 0),

	% se obtiene la columna en forma de lista
	getColumn(NewGrilla,ColN,Col),
	
	getElement(PistasColumnas,ColN,PistasColumna),
	(ColSat is 1, satisface(PistasColumna,Col); ColSat is 0).


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



%controlInicial(+Grilla,+PistasFilas,+PistasColumnas,-LsatFila,-LsatCol)
controlInicial(Grilla,PistasFilas,PistasColumnas,LsatFila,LsatCol):-satisfaceFila(Grilla,PistasFilas,LsatFila),satisfaceCol(Grilla,PistasColumnas,0,LsatCol).

satisfaceFila([],[],[]).
satisfaceFila([Fila|Filas], [PistasFila|Pistas],[1|Ys]):-satisface(PistasFila,Fila),satisfaceFila(Filas,Pistas,Ys).
satisfaceFila([Fila|Filas], [PistasFila|Pistas],[0|Ys]):-not(satisface(PistasFila,Fila)),satisfaceFila(Filas,Pistas,Ys).

satisfaceCol(_Grilla,[],_NumCol,[]).
satisfaceCol(Grilla,[PistasCol|Pistas],NumCol,[1|Ys]):-NumColSig is NumCol+1 ,satisfaceCol(Grilla,Pistas,NumColSig,Ys),getColumn(Grilla,NumCol,Col),satisface(PistasCol,Col).
satisfaceCol(Grilla,[PistasCol|Pistas],NumCol,[0|Ys]):-NumColSig is NumCol+1 ,satisfaceCol(Grilla,Pistas,NumColSig,Ys),getColumn(Grilla,NumCol,Col),not(satisface(PistasCol,Col)).

% solve(+PistasFilas,+PistasColumnas,+Grilla,-Solucion)

% En una primer pasada, se recorre la grilla y se completan las lineas (fila o columna)
% en las se puede determinar parte solamente viendo las pistas y la longitud de la linea
% 		Ejemplo: si el tablero es de 5x5, y tengo un 4 como pista entonces se sabe que
%		van a estar pintadas las 3 celdas del centro.
% Asi como tambien aquellas lineas cuyas pistas se pueden satisfacer de una unica manera
% 		Ejemplo: (Tambien en un tablero de 5x5) las pistas: [5], [2,2],  [3,1],  [1,3], [1,1,1], []
% 		Las lineas se completarian con # y X en los casos anteriores (ya que la linea queda completamente
% resuelta)
% Si la linea ya tiene una celda pintada/con cruz
% ¿Se podria asumir que si el tablero trae una celda con cruz o pintada esta bien?
