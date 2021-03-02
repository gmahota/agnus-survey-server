import { Request, Response } from "express";
import SurveyService from "../../services/survey/survey";
import {Survey} from "../../models/survey/survey";
import path from "path";

import aws from "aws-sdk";

export const get_all_Surveys = async (
  request: Request,
  response: Response,
) => {
  const Survey = await SurveyService.getAll();
  return response.status(200).json(Survey);
};

export const get_Survey = async (request: Request, response: Response) => {
  const { id } = request.body;

  const Survey = await SurveyService.getById(id);

  if (Survey) {
    return response.status(200).json(Survey);
  }
  return response.status(404).json({ msg: "no Survey with that id" });
};

export const create_Survey = async (request: Request, response: Response) => {
  const {
    date,
    title,
    description,
    province,
    branch,
    document,
    items   
  } = await request.body;

  try {

    let data: Survey = {
        date,
        title,
        description,
        province,
        branch,
        document,
        items,
        id:0
    };

    const survey = await SurveyService.create(data);

    return response.status(200).json(survey);
  } catch (e) {
    return response.status(e.status || 404).json(
      {
        msg: e.statusText ||
          "Error to create a Survey",
        error: e,
      },
    );
  }
};

export const delete_order = async (request: Request, response: Response) => {
  return response.status(500).json(
    { msg: "not Implemented" },
  );
  const { id } = request.body;

  try {
    //await Surveyervice.remove(id);

    return response.send(200).json({ id: id });
  } catch (e) {
    return response.send(404).json(
      { msg: "error to create a order with that i" },
    );
  }
};
