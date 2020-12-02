class db{
    constructor(name = "database"){
        this.dbName = name;
        this.dbActivate = false;

        if(window.localStorage === false){
            this.dbActivate = false;
        }else{
            this.dbActivate = true;
        }
    }

    add(dataName, dataValue){
        if(this.dbActivate){
            var name = this.prepareName(dataName);
            if(this.exists(name)){
                return false;
            }else{
                localStorage.setItem(name, dataValue);
                return true;
            }
        }else{
            return false;
        }
    }
    
    update(dataName, dataValue){
        if(this.dbActivate){
            var name = this.prepareName(dataName);
            if(this.exists(name)){
                var control = this.remove(dataName);
                if(control){
                    this.add(dataName, dataValue);
                }else{
                    return false;
                }
            }else{
                this.add(dataName, dataValue);
            }
        }else{

        }
    }

    prepareName(dataName, dbNameChange = ""){
        if(dbNameChange.length < 1){
            var name = this.dbName + dataName;
            return name;
        }else{
            var name = dbNameChange + dataName;
            return name;
        }
    }

    exists(name){
        if(localStorage.getItem(name) === null){
            return false;
        }else{
            return true;
        }
    }

    get(dataName, nameHasBeenPrepared = false){
        if(this.dbActivate){
            if(nameHasBeenPrepared){
                var name = dataName;
                if(this.exists(name)){
                    return localStorage.getItem(name);
                }else{
                    return "";
                }
            }else{
                var name = this.prepareName(dataName);
                if(this.exists(name)){
                    return localStorage.getItem(name);
                }else{
                    return "";
                }
            }
        }
    }

    remove(dataName){
        if(this.dbActivate){
            var name = this.prepareName(dataName);
            if(this.exists(name)){
                localStorage.removeItem(name);
                if(this.exists(name)){
                    return true;
                }else{
                    return false;
                }
            }else{
                return "";
            }
        }
    }
    
    query(data){
        if(this.dbActivate){
            if(typeof(data) == "string"){
                var datas = data.split(" ");
                datas[0] = datas[0].toUpperCase();
    
                if(datas[0] == "SELECT"){
                    var buffer = new Array();
                    if(datas.length == 4){
                        if(datas[2] == "FROM"){
                            buffer[0] = datas[1];
                            buffer[1] = datas[3];
                            if(buffer[1].length < 1){
                                buffer[1] == this.dbName;
                            }
                            var name = this.prepareName(buffer[0], buffer[1]);
    
                            return this.get(name, true);
                        }
                    }
                }
    
            }
        }
    }
}
