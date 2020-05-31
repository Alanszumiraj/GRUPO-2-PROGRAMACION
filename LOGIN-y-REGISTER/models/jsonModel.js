const path = require('path');
const fs = require('fs');




function jsonModel(name){

    return {
        archivo:path.join(__dirname,'..' ,'data' , name + '.json'),
        getAll:function(){
            
            let data = fs.readFileSync(this.archivo,'utf-8');

            if(data.length>0){
                return JSON.parse(data);
            }
            return [];

        },
        save:function(newData){

            let data = this.getAll();
            let dataAescribir =  [...data,newData];
            fs.writeFileSync(this.archivo,JSON.stringify(dataAescribir, null ,' '));

        },

        nextId:function(){

            let data = this.getAll();

            if(data.length==0){
                return 1;
            }

            let ultimo = data[data.length-1];

            let ultimoId= ultimo.id +1;

            return ultimoId;
        
        }
    
    }

    
}


module.exports=jsonModel;