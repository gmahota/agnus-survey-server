import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm"

@Entity("survey")
export default class Survey { 
    id:number
    title:string
    description:string
    
}