class inductor
{
    // Author: Ravi Saripalli (1st Aug. 2021)
    // Estimate inductance from physical construct
    // of inductor. Then use experimental data of
    // damped oscillator frequency of LC tank circuit
    // with different known capacitors.

   constructor () {
      const Mu_air  = 1.25e-6 ;     // Permiability Air  H/m
      const Mu_Fer  = 15 * Mu_air ;    // Range 15 - 600
      const Mu_Iron = 5000 * Mu_air ; // Pure Iron
      this.Dia = 25e-3  ; // m
      this.Len = 25e-3  ; // m
      this.mu  = Mu_Fer ; // Henry
      this.N   = 200    ; // Number of Turns 
    
  } // end Constructor

   get_phyL() { // Estimate Inductance (Henry)  from physical construct 
          let Area = this.Dia * this.Dia * 0.25 * Math.PI ;
          let L = this.mu * Area * this.N * this.N / this.Len ;
          return(L) ;
    }

   get_expL() {
    // Calculate inductor value (Henry) from
    // Oscillator experiments with several known Capacitances
    // By observing damped oscillations frequecies

    // C in nF  f in kHz
    let data = [ [53.5, 12.75], [75.4, 10.4],
             [104.3, 9.43], [111, 8.7],
	     [235, 5.8],    [346, 4.8] ];

// Data obtained with circuit simulator
//https://www.falstad.com/circuit/
    let dataSim = [ [53.5, 14.16], [75.4, 11.92],
             [104.3, 10.12], [111, 9.81],
	     [235, 6.75], [346, 5.54] ];

    let logC = data.map(d => Math.log(d[0])) ; //nF
    let logF = data.map(d => Math.log(d[1])) ; //kHz

    let fit  = this.lsqFit(logC, logF) ; 
    let L =  1e3 * Math.pow( 1.0 / (2 * Math.PI * Math.exp(fit.c))  , 2)  ; 
    return ({data: data, expL: L, fit: fit});
   } //end get_expL

  show() {
    console.log(this.get_expL());  
    console.log({phyL: this.get_phyL()});
  }

 lsqFit (x, y) { // Linear Leastsquare fit
    let n = x.length;
    let sx = 0; let sy = 0;
    let sxy = 0; let sxx = 0; let syy = 0;

    for (let i = 0; i < y.length; i++) {
             sx += x[i]; sy += y[i];
             sxy += (x[i] * y[i]);
             sxx += (x[i] * x[i]); syy += (y[i] * y[i]) ;
    }

   let m = (n * sxy - sx * sy) / (n * sxx - sx * sx) ;
   let c = (sy - m * sx) / n ;
   let dum =   Math.sqrt((n * sxx - sx * sx) * (n * syy - sy * sy)) ;
   let r2  = Math.pow((n * sxy - sx * sy) / dum, 2);
   return({m: m, c: c, r2: r2});
} // end lsqFit

} // end of inductor class

var ind = new inductor() ;
ind.show() ;
