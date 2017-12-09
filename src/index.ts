import "babel-polyfill";
import { ExpressPacker } from "docx";
import * as mongoose from "mongoose";

import { Achievement } from "./achievement-model";
import { DocumentCreator } from "./document-creator";
import { Education } from "./education-model";
import { Experience } from "./experience-model";
import { Skill } from "./skill-model";

module.exports = async (context, req, res) => {
    mongoose.connect(context.secrets.MONGODB_URI);
    console.log("Creating CV");
    const documentCreator = new DocumentCreator();

    console.log("Fetching from CV");
    const experiences = await Experience.find();
    const educations = await await Education.find();
    const skills = await Skill.find();
    const achivements = await Achievement.find();

    const doc = documentCreator.create([experiences, educations, skills, achivements]);
    console.log("Packing");
    const expressPacker = new ExpressPacker(doc, res);
    expressPacker.pack("Dolan Miu CV");
};
