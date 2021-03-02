
import {Survey}  from '../../models/survey/survey'
import SurveyRepository  from '../../repository/survey/surveyRepository'


const getById = (id:number) =>
    SurveyRepository.findById(id)

const getAll = () =>
    SurveyRepository.findAll()


const create = async function create (data:Survey):Promise<Survey> {
  var Survey = await SurveyRepository.create(data)

  return Survey 
}
  

export default {
  getAll,
  getById,
  create
}