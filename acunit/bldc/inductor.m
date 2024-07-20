  function core = inductor()
    % Author: Ravi Saripalli (1st Aug. 2021)
    % Estimate inductance from physical construct
    % of inductor. Then use experimental data of
    % damped oscillator frequency of LC tank circuit
    % with different known capacitors.

  function L = L_measure()
    % Calculate inductor value from
    % Oscillator experiments with several known Capacitances
    % By observing damped oscillations frequecies

    % C in nF
    % H on mH
    % f in kHz

    data = [ [53.5, 12.75],
             [75.4, 10.4],
             [104.3, 9.43],
	     [111, 8.7],
	     [235, 5.8],
	     [346, 4.8]
	   ];

% Data obtained with circuit simulator
%https://www.falstad.com/circuit/
    dataSim = [ [53.5, 14.16],
             [75.4, 11.92],
             [104.3, 10.12],
	     [111, 9.81],
	     [235, 6.75],
	     [346, 5.54]
	   ];


	     data = dataSim ;
    C = data(:,1) ; %Nano Farads 
    f = data(:,2) ; %kHz

    p=polyfit(log(C),log(f),1) ; 
    slope = p(1)   % expect this to be close to -0.5
    intcept = p(2); 
    A = exp(intcept) ;
    L = ( 1e3 / (2 * pi * A) ) ^ 2 ; 
  endfunction
    Mu_air = 1.25e-6 ;% Permiability Air  H/m
    Mu_Fer = 15 * Mu_air ;  % Range 15 - 600
    Mu_Iron = 5000 * Mu_air ; % Pure Iron

    %Core Dimensions
    core.Dia = 25e-3 ;  %m
    core.Len = 25e-3 ; %m
    core.mu  = Mu_Fer ; %H
    core.N   = 200 ; % Number of Turns
    core.Area = core.Dia * core.Dia * 0.25 * pi ;
    core.L = 1e3 * core.mu * core.Area * core.N * core.N / core.Len ;
    core.Lexp = L_measure() ;
  endfunction
