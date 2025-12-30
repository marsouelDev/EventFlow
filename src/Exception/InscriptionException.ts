
 export class InscriptionException extends Error{
    constructor(message :string){
        super(message);
        this.name = "InscriptionException "
    }

}