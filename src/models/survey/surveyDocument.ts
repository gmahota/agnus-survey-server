import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import {Survey} from "./survey";

@Entity("survey_document")
export default class Document { 

    @PrimaryGeneratedColumn('increment')
    id:number

    @Column({length: 50, nullable:false })
    title:string

    @Column({length: 50, nullable:false })
    description?:string

    @JoinColumn([{ referencedColumnName: "id" }, { referencedColumnName: "document_id" }])
    surveys?: Survey[];
}