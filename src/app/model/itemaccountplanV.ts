import {EAccPlanNature,Eanalytical,ETypeAccPlan} from './ListEnums';
import {AccountPlan}                             from './accountplan';
export class ItemAccountPlanV {
    analytical:Eanalytical;
    level:number;
    name:string;
    nature:EAccPlanNature;
    stucture:string;
    type:ETypeAccPlan;
    accountPlan:AccountPlan;
}