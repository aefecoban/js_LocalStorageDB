class classDB{
    constructor(name = "database"){
        this.dbName = name;
        this.dbActivate = false;
        this.specialWords = {
            select: "SELECT",
            insert: "INSERT",
            into: "INTO",
            update: "UPDATE",
            remove: "DROP",
            from: "FROM",
            value: "(value)",
            values: "VALUES"
        }

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

    intertDataPrepare(data){
        var bufferData = data.toString();
        bufferData = bufferData.split("(");
        if(bufferData.length > 1){
            for(let i = 2; i < bufferData.length; i++){
                bufferData[1] = bufferData[1] + "(" + bufferData[i];
            }
        }
        bufferData = bufferData[1].toString();
        bufferData = bufferData.split(")");
        if(bufferData.length > 1){
            for(let i = 1; i < bufferData.length - 1; i++){
                bufferData[0] = bufferData[0] + ")" + bufferData[i];
            }
        }
        bufferData = bufferData[0].toString();
        return bufferData;
    }

    query(data){
        if(this.dbActivate){
            if(typeof(data) == "string"){
                var datas = data.split(" ");
                datas[0] = datas[0].toUpperCase();

                if(datas[0] == this.specialWords.select){
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
                }else if (datas[0] == this.specialWords.insert) {
                    if(datas.length > 5){
                        if(datas[1] == this.specialWords.into){
                            var buffer = new Array();
                            buffer[0] = datas[2];
                            if(datas[3] == this.specialWords.value){
                                if(datas[4] == this.specialWords.values){
                                    for(let i = 6; i < datas.length; i++){
                                        datas[5] = datas[5] + " " + datas[i];
                                    }
                                    buffer[1] = this.intertDataPrepare(datas[5]);

                                    return this.add(buffer[0], buffer[1]);

                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
