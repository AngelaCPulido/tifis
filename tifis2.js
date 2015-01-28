var tablero;
var direccion;

var liz = {
    imagenOK: false,
    x: 400,
    y: 200
};

var fondo = 
{
	imagenURL: 'fondo.png',
	imagenOK:   false,
	limiteX: [-20, 480],
	limiteY: [-20, 460]
}

//Madera
var madera1 =
{					
	x: [0, 20, 40, 60, 80, 100, 120, -20],
	y: [160, 180, 200]
}

var madera2 =
{					
	x: [180, 200, 220],
	y: [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200]
}

var madera3 =
{					
	x: [12, 140, 160, 180, 200, 220, 230, 240, 260, 280, 300, 320, 340, 360, 380, 400, 420, 440, 460],
	y: [360, 320, 340]
}


var teclas = 
{
	UP:    38,
	DOWN:  40,
	LEFT:  37,
	RIGHT: 39
}

var tifis = 
{
	x: 			 100,
	y: 			 100,
	frenteURL:  'diana-frente.png',
	frenteOK:    false,
	atrasURL:   'diana-atras.png',
	atrasOK:     false,
	derURL:     'diana-der.png',
	derOK:       false,
	izqURL:     'diana-izq.png',
	izqOK:       false,
	velocidad:   20
}


function inicio ()
{
	var canvas = document.getElementById('campo');
	    tablero    = canvas.getContext('2d');

		//fondo
		fondo.imagen = new Image();
		fondo.imagen.src = fondo.imagenURL;
		fondo.imagen.onload = confirmarFondo;

		//tifis
		tifis.frente = new Image();
		tifis.frente.src = tifis.frenteURL;
		tifis.frente.onload = confirmarFrente;
		
		
		tifis.atras = new Image();
		tifis.atras.src = tifis.atrasURL;
		tifis.atras.onload = confirmarAtras;
		
		tifis.der = new Image();
		tifis.der.src = tifis.derURL;
		tifis.der.onload = confirmarDer;
		
		tifis.izq = new Image();
		tifis.izq.src = tifis.izqURL;
		tifis.izq.onload = confirmarIzq;

		//Liz
		liz.imagen = new Image();
        liz.imagen.src = "liz.png";
        liz.imagen.onload = confirmarLiz;

		document.addEventListener('keydown', teclado);
}

function confirmarFondo ()
{
	fondo.imagenOK = true;
	dibujar();
}

function confirmarAtras ()
{
	tifis.atrasOK = true;
	dibujar();
}

function confirmarDer ()
{
	tifis.derOK = true;
	dibujar();
}

function confirmarIzq()
{
	tifis.izqOK = true;
	dibujar();
}

function confirmarFrente ()
{
	tifis.frenteOK = true;
	dibujar();
}

function confirmarLiz()
{
    liz.imagenOK = true;
    dibujar();
}


function movimiento ()
{
	tifis.x += 10;
	dibujar();
} 	

function chocarPared (objeto)
{
		if(madera1.x.lastIndexOf(objeto.x) > -1 && madera1.y.lastIndexOf(objeto.y) > -1)
        {
             return true;
        }

        if(madera2.x.lastIndexOf(objeto.x) > -1 && madera2.y.lastIndexOf(objeto.y) > -1)
        {
             return true;
        }

        if(madera3.x.lastIndexOf(objeto.x) > -1 && madera3.y.lastIndexOf(objeto.y) > -1)
        {
             return true;
        }

        if(fondo.limiteX.lastIndexOf(objeto.x) > -1 || fondo.limiteY.lastIndexOf(objeto.y) > -1)
        {
             return true;
        }

        return false;
}

function teclado (teclaPulsada)
{
	var codigoTecla = teclaPulsada.keyCode;

	if (codigoTecla == teclas.UP)
	{
		tifis.y -= tifis.velocidad;	

		if(chocarPared(tifis))
        {
            tifis.y += tifis.velocidad;
        }
    }

	if (codigoTecla == teclas.DOWN)
	{
		tifis.y += tifis.velocidad;

		if(chocarPared(tifis))
        {
            tifis.y -= tifis.velocidad; 
        }
   	}

	if (codigoTecla == teclas.RIGHT)
	{
		tifis.x += tifis.velocidad;

		if(chocarPared(tifis))
        {
            tifis.x -= tifis.velocidad; 
        }
   	}

	if (codigoTecla == teclas.LEFT)
	{
		tifis.x -= tifis.velocidad;

		if(chocarPared(tifis))
        {
            tifis.x += tifis.velocidad; 
        }
   	}

	direccion = codigoTecla;
	dibujar();
	
}

function dibujar ()
{

	// Capa 1 : Fondo 
	if(fondo.imagenOK)
	{
		tablero.drawImage(fondo.imagen, 0, 0);
	}

	    if(liz.imagenOK)
    {
        tablero.drawImage(liz.imagen, liz.x, liz.y);
    }

    //Capa 2: Tifis
	var tifisDibujo = tifis.frente;
	if (tifis.frenteOK && tifis.atrasOK && tifis.derOK && tifis.izqOK)
	{
		 if (direccion == teclas.DOWN || direccion == undefined)
		{
			tifisDibujo = tifis.frente;
		}

		else if (direccion == teclas.UP)
		{
			tifisDibujo = tifis.atras;
		}

		else if (direccion == teclas.RIGHT)
		{
			tifisDibujo = tifis.der;
		}

		else if (direccion == teclas.LEFT)
		{
			tifisDibujo = tifis.izq;
		}

	//Capa 3 Liz
	if(liz.imagenOK)
      {
        tablero.drawImage(liz.imagen, liz.x, liz.y);
      }

		tablero.drawImage(tifisDibujo, tifis.x, tifis.y);
	}

}