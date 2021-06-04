
:- module(init, [ init/3 ]).


% init(
%     [[1,1,1],[5],[3],[1,1],[3]],	% PistasFilas
    
%     [[2],[4],[3,1],[4],[2]] ,	% PistasColumnas
    
%     [
%         ["#", _ , "#" , _ , "#" ],
%         [_, _ ,"#" , _ , _ ],
%         [_, _ , "#", _ , _ ],
%         [_, _ , _ , _ , _ ],
%         [_, _ , "#", _ , _ ]
%     ]
%     ).
init(
    [[1],[1],[1],[1],[1]],    % PistasFilas

    [[1],[1],[1],[1],[1]] ,    % PistasColumnas

    [
        [_, _ , _ , _ ,_  ],
        [_, _ , _ , _ ,_ ],
        [_, _ , _ , _ ,_ ],
        [_, _ , _ , _ ,_ ],
        [_, _ , _ , _ ,_  ]
    ]
    ).

init(
    [[2,2],[6],[9],[2,1,3,1],[1,2],[5],[4,1],[1,7],[8],[4]],	% PistasFilas
    
    [[1,2,3],[1,2,2],[2,4],[3,5],[2,4],[8],[5,2],[3,1,2],[1,1,2],[1,2]], 	% PistasColumnas
    
    [
     ["#" , "#", _ , _ , _ , _, _ , _ , "#" , "#"  ], 		
     [_, _ , _ , _ , _ , _, _ , _ , _ , _  ],
     [_, _ , _ , _ , _ , _, _ , _ , _ , _  ],
     [_, _ , _ , _ , _ , _, _ , _ , _ , _  ],
     [_, _ , _ , _ , _ , _, _ , _ , _ , _  ],
     [_, _ , _ , "#" , "#" ,"#","#", "#", _ , _  ],
     [_, _ , _ , _ , _ , _, _ , _ , _ , _  ],
     [_, _ , _ , _ , _ , _, _ , _ , _ , _  ],
     [_, _ , _ , _ , _ , _, _ , _ , _ , _  ],
     [_, _ , _ , _ , _ , _, _ , _ , _ , _  ]
    ]
    ).





