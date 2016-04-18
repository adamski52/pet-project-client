export class ComponentHelper{
    static LoadComponentAsync(name, path){
        return System.import(path).then(c => c[name]);
    }
}