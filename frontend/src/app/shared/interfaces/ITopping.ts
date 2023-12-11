export interface IAddTopping{
    
    IdStore:string,
    tentopping:string,
    gia:number,
    hinh:string
}

export interface IUpdateTopping{
    
    IdStore:string,
    idtopping:string,
    tentopping:string,
    gia:number,
    hinh:string
    
}


export interface IDeleteTopping{
    
    IdStore:string,
    idtopping:string

}