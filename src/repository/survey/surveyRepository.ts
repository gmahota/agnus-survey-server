import { getRepository,getConnection } from "typeorm";
import {Survey, SurveyFilter} from './../../models/survey/survey';

interface Key {
  id?: any;
}

const findById = async function findById(id: number): Promise<Survey> {
  const surveyRepository = getRepository(Survey);

  const survey: Survey = await surveyRepository.findOneOrFail({ id: id });

  return survey;
};

const findAll = async function findAll(filter?:SurveyFilter): Promise<Survey[]> {
  const surveyRepository = getRepository(Survey);

  var surveyfilter:any = {}
  
  let str_filter = ""

  if(filter?.branch){
    str_filter = str_filter.length > 0? " OR survey.branch = :branch":"survey.branch = :branch"
    surveyfilter.branch = filter.branch
  } 

  if(filter?.province){
    str_filter = str_filter.length > 0? " OR survey.province = :province":"survey.province = :province"
    surveyfilter.province = filter.province
  } 

  if(filter?.date){
    str_filter = str_filter.length > 0 ? 
    ` OR survey.date < :date `:
    `survey.date < :date `
    surveyfilter.date = filter.date
  } 

  if(filter?.dateBegin && filter?.dateEnd) {
    str_filter = str_filter.length > 0? 
    ` OR survey.date BETWEEN '${filter.dateBegin.toISOString()}' AND '${filter.dateEnd.toISOString()}'`:
    `survey.date BETWEEN  '${filter.dateBegin.toISOString()}' AND '${filter.dateEnd.toISOString()}'`
    //   surveyfilter.dateBegin = filter.dateBegin
    //   surveyfilter.dateEnd = filter.dateEnd
  }

  const surveys:Survey[] = await getConnection()
    .createQueryBuilder()
    .select("survey")
    .from(Survey,"survey")
    .innerJoinAndSelect("survey.items","order")
    .where(str_filter, { ...surveyfilter })
    .orderBy("survey.date","DESC")    
    .getMany();
//   const surveys: Survey[] = await surveyRepository.find({
//     order: {
//       date: "ASC",
//       id: "DESC",
//     }, 
//     where: {

//     }
//   });

  return surveys;
};

const create = async function create(
  surver: Survey,
): Promise<Survey> {
  const surveyRepository = getRepository(Survey);

  await surveyRepository.save(surver);

  return surver;
};

export default {
  create,
  findById,
  findAll
};
