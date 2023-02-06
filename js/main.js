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
}
console.log(JSON.parse(localStorage.getItem('arrayDatos')));
var app = new Vue({
    el:'#app',
    data:{
        message:"",
        user:"",
        year:"",
    },
    methods:{
        Guardar_User(){
            (this.year<2024)?
            JSON.parse(localStorage.getItem('arrayDatos')).push({
                Name: this.user,
                Year: this.year,
            }):
            this.message="";
        },
    },
})
