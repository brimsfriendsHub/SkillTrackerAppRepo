import { Component, NgModule, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {AddSkillModel} from './SkillModel/addskill.model';
import {Skillset, SkillsetValue} from './SkillModel/skilldata.model';
import { DatePipe } from '@angular/common';
import { SharedServiceService } from './skilltrackerservice.service';
import { SkillDatasourceService } from './skilldatasource.service';
import { s } from '@angular/core/src/render3';

@Component({
    selector: 'app-addskill-component',
    templateUrl: './addskill.component.html'
  })

  export class AddSkillComponent {
    addskillForm: FormGroup;
    submitted = false;
    addskillModel = new AddSkillModel();
    associateId = '';
    validationError = '';
    skillset: Skillset[] = [];
    SkillsetValue: SkillsetValue[] = [];

    constructor(private _formBuilder: FormBuilder, private _datePipe: DatePipe, private _service: SharedServiceService,
        private _datasourceService: SkillDatasourceService
        ) {
           this.skillset = _datasourceService.getdataSourceskill();
           this.SkillsetValue = _datasourceService.getdataSourceskillValue();
            this.addTaskForm();
        }

        // tslint:disable-next-line:use-life-cycle-interface
    ngOnInit() {this.onReset(); }

    addTaskForm() {
        this.addskillForm = this._formBuilder.group({
            name: ['', Validators.required],
            associateId: ['', Validators.required],
            emailId: ['', Validators.required],
            mobileNo: ['', [Validators.required]]
        });

       this.addControls();
    }
    onSubmit() {
        this.submitted = true;
        this.validationError = '';
        // tslint:disable-next-line:no-debugger
        if (this.addskillForm.invalid) {
            return;
        }

        // stop here if form is invalid
        if (!this.addskillForm.invalid) {
                 const val = this.addskillForm.value;
                  if (this.validationDt(val).length < 1) {
                    if (this.associateId === null || this.associateId === '') {
                         this._service.addProfile(this.assignTaskValues(val)).subscribe(data => {
                        //     // tslint:disable-n debugger;
                             this.onReset();
                         }) ;
                     } else {
                        this._service.updateProfile(this.assignTaskValues(val)).subscribe(data => {
                             this.onReset();
                         }) ;
                     }
                  }
        }

    }
    get f() { return this.addskillForm.controls; }

    assignTaskValues(val: any) {
       debugger;
        this.addskillModel.associateId = val.associateId;
        this.addskillModel.name = val.name;
        this.addskillModel.emailId = val.emailId;
        this.addskillModel.mobileNo = val.mobileNo;

        const selctedSkills: Array<Skillset> = new Array<Skillset>();

        this.skillset.forEach(element => {
         
            const items: Skillset = new Skillset();
            items.id = element.id;
            items.value = element.value;
            items.skillType = element.skillType;
            const controlName = 'select' + element.value;
            items.selectedValue = this.addskillForm.controls[controlName].value;
            selctedSkills.push(items);
         });

         this.addskillModel.technicalSkill = selctedSkills;


         return this.addskillModel;
    }

    validationDt(valIn) {

        return this.validationError;
    }

    assignTaskValue(val: AddSkillModel) {
        // tslint:disable-next-line:no-debugger

        if (val != null && val !== undefined) {
            this.addskillForm.setValue({
                Name: val.name,
                associateId: val.associateId,
                emailId: val.emailId,
                mobileNo: val.mobileNo,
              });
              this.setControlvalue(val.technicalSkill);

            this.associateId = val.associateId;
        }
    }

    onReset() {
        this.addskillForm.setValue({
                name: null,
                associateId: null,
                emailId: null,
                mobileNo: 0
          });
          this.resetControlvalue();
          this.validationError = '';
    }
     addControls(){
        this.skillset.forEach(element => {
           let controlName = 'select' + element.value;
           this.addskillForm.addControl(controlName, new FormControl());
           this.addskillForm.controls[controlName].setValue(0);
        });

     }

     resetControlvalue(){
        this.skillset.forEach(element => {
           let controlName = 'select' + element.value;
           this.addskillForm.controls[controlName].setValue(0);
        });
    }

    setControlvalue(val){
        val.forEach(element => {
           let controlName = 'select' + element.value;
           this.addskillForm.controls[controlName].setValue(val.selectedValue);
        });
    }

  }
