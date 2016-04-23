export class ComponentHelper{
    static LoadComponentAsync(name:string, path:string){
        return System.import(path).then(c => c[name]);
    }
}