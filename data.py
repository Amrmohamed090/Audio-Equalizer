uniform=[(22,44),
        (44,88),
        (177,355),
        (355,710),
        (710,1420),
        (1420,2840),
        (2840,5680),
        (5680,11360),
        (11360,22720)
        ]


pluc = [(0.0, 100.0),(211.0, 311.0),
        (472.0, 572.0),(737.0, 837.0),
        (996.0, 1096.0),(1258.0, 1358.0),
        (1517.0, 1617.0),(1780.0, 1880.0),
        (2305.0, 2405.0),(2562.0, 2662.0),
        (2828.0, 2928.0),(3091.0, 3191.0),
        (3351.0, 3451.0),(3612.0, 3712.0),
        (3874.0, 3974.0),(4139.0, 4239.0),
        (4398.0, 4498.0),(4658.0, 4758.0),
        (4921.0, 5021.0),(5179.0, 5279.0),
        (5445.0, 5545.0),(5706.0, 5806.0),
        (5967.0, 6067.0),(6023.0, 6123.0),
        (6224.0, 6324.0),(6492.0, 6592.0),
        (6751.0, 6851.0),(7010.0, 7110.0),
        (7275.0, 7375.0),(7544.0, 7644.0),
        (8067.0, 8167.0),(8839.0, 8939.0),
        (9361.0, 9461.0),(9623.0, 9723.0),
        (9894.0, 9994.0),(10152.0,10252.0)]
pluc_window=50

clap_window = 200
clap= [(202.98962093862815, 602.9896209386281),
        (685.5821299638989, 1085.5821299638988),
        (1198.0257220216606, 1598.0257220216606),
        (1506.4869133574007, 1906.4869133574007),
        (1735.345216606498, 2135.345216606498),
        (1994.0546028880867, 2394.0546028880867),
        (2387.093862815884, 2787.093862815884),
        (2775.157942238267, 3175.157942238267),
        (4247.811371841155, 4647.811371841155),
        (4959.262184115523, 5359.262184115523),
        (5790.117328519856, 6190.117328519856),
        (6685.649819494584, 7085.649819494584),
        (6959.284747292419, 7359.284747292419),
        (9227.967057761733, 9627.967057761733),
        (100, 700)]

drum_window= 100
drum = [(-2.0746637863277186, 197.92533621367227), 
        (261.82401643336243, 461.82401643336243), 
        (461.9276893477286, 661.9276893477286), 
        (719.7658438734129, 919.7658438734129), 
        (966.4398721206655, 1166.4398721206655), 
        (20, 180), 
        (150, 300)]

drip_window=100
drip = [(463.0715281212067, 663.0715281212067),
        (667.9449714516927, 867.9449714516927), 
        (1187.0678415681339, 1387.0678415681339), 
        (1389.9586386728408, 1589.9586386728408), 
        (1918.003416805287, 2118.003416805287), 
        (2146.99905588275, 2346.99905588275), 
        (2649.93031515533, 2849.93031515533), 
        (250, 750)]

musical_ranges = [pluc,clap,drum,drip]
#source https://linguistics.ucla.edu/people/hayes/103/Charts/VChart/
window = 20
ae = [(716-window,766+window),
        (1782-window,1782+window),
        (2398-window,2398+window)]
i = [(294-window,294+window),
       (2343-window,2343+window),
       (3251-window,3251+window)]
ab = [(652-window,652+window),
       (843-window,843+window),
       (2011-window-10,2011+window-10)]

o = [(519-window,519+window),
       (1593-window,1593+window),
       (2187-window-10,2187+window-10)]

vocal_ranges = [ae,i,ab,o]