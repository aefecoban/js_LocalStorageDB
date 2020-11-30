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

    prepareName(dataName){
        var name = this.dbName + dataName;
        return name;
    }

    exists(name){
        if(localStorage.getItem(name) === null){
            return false;
        }else{
            return true;
        }
    }

    get(dataName){
        if(this.dbActivate){
            var name = this.prepareName(dataName);
            if(this.exists(name)){
                return localStorage.getItem(name);
            }else{
                return "";
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
}
