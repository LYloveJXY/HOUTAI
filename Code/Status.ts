

class Status {
    code:string;
    message:string;
    result:any;
    constructor(code:string,message:string,result:any){
        this.code = code;
        this.message = message;
        this.result = result;
    }
}

module.exports = Status;