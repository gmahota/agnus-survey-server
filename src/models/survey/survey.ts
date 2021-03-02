import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import SurveyDocument from "./surveyDocument";

@Entity("survey")
class Survey{
    @PrimaryGeneratedColumn('increment')
    id:number

    @Column()
    date: Date;

    @Column({length: 50, nullable:false })
    title:string

    @Column({length: 50, nullable:false })
    description:string

    @Column({length: 50, nullable:false })
    province?:string

    @Column({length: 50, nullable:false })
    branch?:string

    @ManyToOne(()=> SurveyDocument, document => document.surveys )
    @JoinColumn({name:'document_id'})
    document?:SurveyDocument;

    @JoinColumn([{ referencedColumnName: "id" }, { referencedColumnName: "survey_id" }])
    items?: SurveyItem[];    
    
    constructor() {
        this.date = new Date();
    }
}
@Entity("surveyItem")
class SurveyItem { 

    @PrimaryGeneratedColumn('increment')
    id:number

    @Column({length: 50, nullable:false })  
    description?:string

    @Column({length: 50, nullable:false })  
    type?:string

    @Column({length: 50, nullable:false })  
    value?:string

    @ManyToOne(()=> Survey, survey => survey.items )
    @JoinColumn({name:'survey_id'})
    survey:Survey;
}

class SurveyFilter{

    date?:Date

    dateBegin?:Date

    dateEnd?:Date

    province?:string

    branch?:string
}

export  { 
    Survey,
    SurveyItem ,
    SurveyFilter      
}