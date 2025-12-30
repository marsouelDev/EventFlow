import { Utilisateur} from "../models/Utilisateur.js";

export class UtilisateurService{

    private tabUser : Utilisateur[] = [];
    constructor(){
        this.tabUser = [] ;
    }

    getTabUser () : Utilisateur[] {
        return this.tabUser;
    }

 emailValide(value: string): boolean {
    return value.includes("@") && value.includes(".");
}
ajouterUtilisateur(U :Utilisateur) : void {
    this.tabUser.push(U);
}
verifierUtilisateur(email : string) : boolean {
  const trouve = this.tabUser.some(i =>i.getEmail() === email);
return trouve;
}
}