import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class SearchService {
  eventType = ''
  search$ = new BehaviorSubject('');

  setEventType(type: string){
    this.eventType = type;
  }

  getEventType(){
    return this.eventType;
  }
}
