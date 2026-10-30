import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IJournal } from './types';

@Injectable()
export class JournalService {
  private _http = inject(HttpClient);

  public getJournals(): Observable<IJournal[]> {
    return this._http.get('assets/journals.json') as Observable<IJournal[]>;
  }
}
