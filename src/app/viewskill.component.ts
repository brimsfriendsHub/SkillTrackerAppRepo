import { Component, NgModule, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import {TaskModel} from './SkillModel/addtask.model';
import {AddSkillModel, SearchSkillModel} from './SkillModel/addskill.model';
import { DatePipe } from '@angular/common';
import { SharedServiceService } from './skilltrackerservice.service';
import {Skillset, SkillsetValue} from './SkillModel/skilldata.model';
import { SkillDatasourceService } from './skilldatasource.service';



@Component({
    selector: 'app-viewskill-component',
    templateUrl: './viewskill.component.html'
  })

  export class ViewSkillComponent {
      viewskillForm: FormGroup;
      validationMessage = '';

      skillset: Skillset[] = [];
      SkillsetValue: SkillsetValue[] = [];
      searchResult: Array<AddSkillModel> = new Array<AddSkillModel>();
      searchParam: SearchSkillModel = new SearchSkillModel();


      @Output() editTask = new EventEmitter<AddSkillModel>();

      constructor(private _formBuilder: FormBuilder, private _datePipe: DatePipe, private _service: SharedServiceService,
        private _datasourceService: SkillDatasourceService) {
          this.skillset = _datasourceService.getdataSourceskill();
          this.SkillsetValue = _datasourceService.getdataSourceskillValue();
        this.addTaskForm();
        // this.loadTaskDetails();
    }

    addTaskForm() {
      this.viewskillForm = this._formBuilder.group({
          name: new FormControl(),
          associateId: new FormControl(),
          skills: new FormControl()
      });

      //this.addControls();
    }

    addControls(){
      this.skillset.forEach(element => {
         let controlName = 'select' + element.value;
         this.viewskillForm.addControl(controlName, new FormControl());
         this.viewskillForm.controls[controlName].setValue(0);
      });
    }

    onSubmit() {
      // stop here if form is invalid
      this.validationMessage = '';
      if (!this.viewskillForm.invalid) {
               const val = this.viewskillForm.value;
               this.searchParam.name = val.name;
               this.searchParam.associateId = val.associateId;
               this.searchParam.selectedSkill = this.viewskillForm.controls['skills'].value;
               this.validateFields(this.searchParam);

               if (this.validationMessage.trim().length < 1) {
                this.loadTaskDetails(this.searchParam);
               }
          }

  }
  validateFields(val: any) {
    if (val.name == null && val.associateId == null && val.selectedSkill == null) {
      this.validationMessage = 'Please give inputs to search';
      return;
    }
  }

  filterResult(val: any) {
    // tslint:disable-next-line:no-unused-expression
    this.searchResult;
  }
      // tslint:disable-next-line:use-life-cycle-interface
      ngOnInit() { }

      loadTaskDetails(val) {

        // for (let i = 1; i < 10; i++) {
        //   const tsk = new TaskModel();

        //   tsk.taskId = i;
        //   tsk.taskName = 'Task Name ' + i;
        //   if (i % 2 === 1) {
        //     tsk.parentTaskId = i;
        //     tsk.parentTaskName = 'Parent Task' + i;
        //   } else {
        //     tsk.parentTaskId = i;
        //     tsk.parentTaskName = 'this has no Parent Task' + i;
        //   }

        //   tsk.priority = i;
        //   tsk.startDate = new Date().toDateString();
        //   tsk.endDate = new Date().toDateString();

        //   this.taskDetails.push(tsk);
        // }
        this._service.getProfiles(val).subscribe(data => {
          debugger;
          //this.taskDetails = data;
          this.filterResult(val);
        }) ;


       }

       editSingleUser(e) {
        // tslint:disable-next-line:prefer-const
        let items = new AddSkillModel();
        items.emailId = e.emailId;
        items.associateId = e.associateId;
        items.name =   e.name;
        items.mobileNo = e.mobileNo;
        items.technicalSkill = e.technicalSkill;
          this.editTask.emit(items);
    }

   endSingleTask(e) {
      // tslint:disable-next-line:no-debugger
    //   this._service.deleteTask(e).subscribe(data => {
    //     this.loadTaskDetails(this.taskSearch);
    // }) ;
    }

    trackTask(index, task) {
      return task ? task.id : undefined;  }
  }
