import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { TaskModel } from './SkillModel/addtask.model';
import {RequestOptions,  URLSearchParams, RequestMethod,  ResponseContentType, Headers} from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import {Skillset, SkillsetValue} from './SkillModel/skilldata.model';
import {SearchSkillModel, AddSkillModel} from './SkillModel/addskill.model';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
    public skillTrackerEmployeeUrl = 'http://localhost:57471/api/employee/';
    public skillTrackerAdminUrl = 'http://localhost:57471/api/admin/';

     requestOption = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'PUT, POST, OPTIONS, GET',
        'Access-Control-Allow-Headers': 'Special-Request-Header'
      })
    };

//      httpHeaders = new HttpHeaders({
//       'Content-Type' : 'application/json',
//       'Cache-Control': 'no-cache',
//       'Accept': 'application/json',
//       'Access-Control-Allow-Origin' : 'true'
//  });

//  httpOptions = {
//   headers: this.httpHeaders
// };
//   requestOption: any;

  constructor(private httpClient: HttpClient) {

    // const options = new RequestOptions();
    // options.search = new URLSearchParams();
    // options.headers = new Headers();
    // options.headers.append('Content-Type', 'application/json');
    // options.headers.append('Access-Control-Allow-Origin', '*');
    // this.requestOption = options;

   }

  addProfile(addProfile: AddSkillModel): Observable<any> {
    const url = this.skillTrackerEmployeeUrl + 'addprofile';
      return  this.httpClient.post<any>(url, addProfile, this.requestOption);
  }

  updateProfile(updateProfile: AddSkillModel): Observable<any> {
    // tslint:disable-next-line:prefer-const
    let url = this.skillTrackerEmployeeUrl + 'updateprofile';
    return this.httpClient.post<AddSkillModel>(url, updateProfile, this.requestOption);
  }

  getProfile(associateId: string) {
    // tslint:disable-next-line:prefer-const
    let url = this.skillTrackerEmployeeUrl + 'getProfile?id=' + associateId;
    return this.httpClient.get<any>(url);
  }
  getProfiles(skillSearch: SearchSkillModel): Observable<any> {
    // tslint:disable-next-line:no-debugger
    debugger;
    let parameters = {'associateId': skillSearch.associateId,'name': skillSearch.name,'selectedSkill': skillSearch.selectedSkill};
    let queryParams = new HttpParams({ fromObject: parameters });
    const url = this.skillTrackerAdminUrl + 'GetBySearch';
    return this.httpClient.get<any>(url, {headers: this.requestOption.headers, params: queryParams}) .pipe(map((res: Response) => res.json())
  );

  }

//   getWeatherDetails(searchCity: string)
//   {
// tslint:disable-next-line:max-line-length
//     let url='https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22%27'+searchCity+'%27%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
//     return this.http.get<any>(url);
//   }
//   getMovieDetails(MovieName:string)
//   {
//     let url=this.MovieUrl+MovieName+"%27&apikey=8b8b3f2";
//     return this.http.get<any>(url);
//   }
//   getCurrencyDetails(Currency:string)
//   {
//     let url=this.CurrencyUrl+Currency;
//     return this.http.get<any>(url);
//   }

}
