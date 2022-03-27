import {Skillset, SkillsetValue} from './skilldata.model';
export class AddSkillModel {
name: string;
associateId: string;
emailId: string;
mobileNo: string;
technicalSkill: Array<Skillset>;
}

export class SearchSkillModel {
    name: string;
    associateId: string;
    selectedSkill: string;
}
