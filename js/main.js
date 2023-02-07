localStorage.setItem('arrayPts', JSON.stringify([]));
localStorage.setItem('arrayDatos',JSON.stringify( 
                    [{
                        Name:'Lady',
                        Year:Rand(),
                    },
                    {
                        Name:'Luis',
                        Year:Rand(),
                    },
                    {
                        Name:'David',
                        Year:Rand(),
                    },
                    {
                        Name:'Oscar',
                        Year:Rand(),
                    },
                    {
                        Name:'Fernando',
                        Year:Rand(),
                    }]));
function Rand(){
    return Math.floor(Math.random() * 124)+1900;
};
function Init(){
    let array = JSON.parse(localStorage.getItem('arrayDatos'));
    let init = Math.floor(Math.random() * array.length);
    localStorage.setItem('user', JSON.stringify(array[init]));
};
Init();

console.log(JSON.parse(localStorage.getItem('user')));
var app = new Vue({
    el:'#app',
    data:{
        message:"",
        user:"asd",
        year:"asd",
        score:"",
        lives:7,
        lives_u:0,
    },
    methods:{
        Save_User(){
            let user = JSON.parse(localStorage.getItem('arrayDatos'));
            (this.year<2024)?
            user.push({
                Name: this.user,
                Year: this.year,
            }):
            this.message="";
            localStorage.setItem('arrayDatos', JSON.stringify(user))
        },
        Save_Player(){
            let user = JSON.parse(localStorage.getItem('arrayPts'));
            user.push({
                Name: this.user,
                Score: this.score,
                Lives: this.lives_u,
            });
            localStorage.setItem('arrayPts', JSON.stringify(user))
        },
        Play(){
            let user = localStorage.getItem
            //(this.year==)
        },
    },
})
