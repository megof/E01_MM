localStorage.setItem('arrayPts', JSON.stringify([]));
function Reset() { //función que inicializa las variables para los puntos y adivinanzas disponibles
    localStorage.setItem('arrayDatos', JSON.stringify(
        [{
            Name: 'Lady',
            Year: Rand(),
        },
        {
            Name: 'Luis',
            Year: Rand(),
        },
        {
            Name: 'David',
            Year: Rand(),
        },
        {
            Name: 'Oscar',
            Year: Rand(),
        },
        {
            Name: 'Fernando',
            Year: Rand(),
        }]));
    Init();
}
function Rand() {
    return Math.floor(Math.random() * 124) + 1900;///genera un número aleatorio entre el 1900 y el 2023
}
function Init() {//escoge una adivinanza al azar para iniciar el juego
    let array = JSON.parse(localStorage.getItem('arrayDatos'));
    let aux = []
    if (array.length > 0) {
        let init = Math.floor(Math.random() * array.length);
        localStorage.setItem('user', JSON.stringify(array[init]));
        array.map(e=>{
            if(e != array[init]){
                aux.push(e)
            }
        })
        //array = array.splice(init, 1);
        localStorage.setItem('arrayDatos', JSON.stringify(aux))
    }
    console.log(JSON.parse(localStorage.getItem('user')));
}
Reset();
var app = new Vue({
    el: '#app',
    data: {
        message: "",//mensajes del sistema
        user: "",//nombre de usuario que se registrará o estará jugando
        year: 0,//año del usuario que se registrará
        score: 0,//puntaje del usuario que está jugando
        lives: 7,//vidas restantes del usuario
        lives_u: 0,//vidas usadas actualmente
        percent: 0,//"porcentaje" de cercanía al número
        won: true,
        history: [],
    },
    methods: {
        Save_User() {//función para registrar un usuario
            let user = JSON.parse(localStorage.getItem('arrayDatos'));
            (this.year < 2024) ?
                user.push({
                    Name: this.user,
                    Year: this.year,
                }) :
                this.message = "";
            localStorage.setItem('arrayDatos', JSON.stringify(user));
        },
        Save_Player() {//función para registrar un jugador
            let user = JSON.parse(localStorage.getItem('arrayPts'));
            console.log(this.user+"-"+this.year)
            user.push({
                Name: this.user,
                Score: this.score,
                Lives: this.lives_u,
            });
         
            localStorage.setItem('arrayPts', JSON.stringify(user));
            this.won=true;
            swal("","Persona registrada","success");
            Init();
            this.history.push({
                Name: this.user,
                Score: this.score,
                Lives: this.lives_u,
            })
        },
        Play() {//esta función se usa para comprobar si la persona adivinó
            let user = JSON.parse(localStorage.getItem('user'));
            (user.Year == this.year) ?
                this.Win() :
                this.Calc(user);
        },
        Win() {//en caso de adivinar se resetea las vidas y el score y se aumenta la puntucación
            this.Lives = 7;
            this.score +=10;
            this.percent=0;
            swal("Felicidades","Has ganado","success");
            Init();
        },
        Calc(user) {
            let aux = Math.abs(this.year - user.Year);//se calcula la "distancia entre el año ingresado y el actual"
            console.log(this.year+"-"+user.Year+"="+aux)
            console.log(this.year+"-"+user.Year+"="+aux)
            if (aux < 25) {
                swal("Sigue intentanto","Estás muy cerca","error");
                  this.message = "Estás muy cerca";
                this.percent = 75;
            } else if (aux < 50) {
                swal("Sigue intentanto","Estás cerca","error");
                this.message = "Estás cerca";
                this.percet = 50;
            } else if (aux < 75) {
                swal("Sigue intentanto","Estás lejos","error");
                this.message = "Estás lejos";
                this.percet = 25;
            } else {
                swal("Sigue intentanto","Estás muy lejos","error");
                this.message = "Estás muy lejos";
                this.percet = 0;
            }
            this.lives -= 1;
            if (this.lives == 0) {
                swal("Lo siento","Perdiste","error");
                this.message="Perdiste";
                this.lives_u=0;
                this.score=0;
                this.lives=7;
                this.percent=0;
                this.won=false
                Reset();
            }
        },
    },
})
